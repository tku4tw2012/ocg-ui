"""
OCGarden text-intake Azure Function — POST /api/v1/captures

Accepts JSON capture payloads from authenticated devices, validates auth
headers, writes the raw request envelope to blob storage, and enqueues a
lightweight pointer message for downstream processing.

Auth contract:
  - Authorization: Bearer <device-token>
  - x-ocg-device-id: <device-id>
  - OCG_ALLOWED_DEVICE_IDS env var gates which device IDs are accepted
  - Per-device token env vars: OCG_DEVICE_TOKEN_<DEVICE_ID_UPPER_DASHED>

Storage contract (configured via app settings):
  - Queue:  %OCG_CAPTURE_QUEUE%        (default: intake-pending)
  - Blob:   %OCG_CAPTURE_RAW_CONTAINER%/<yyyy>/<mm>/<dd>/<capture_id>/request.json

Deployed to: func-ocg2026-intake-04vmt
"""

import json
import logging
import os
import uuid
from datetime import datetime, timezone

import azure.functions as func
from azure.storage.blob import BlobServiceClient

app = func.FunctionApp()

# ── Device → token env-var mapping ──────────────────────────────────────
# Add new devices here. The env var name must match the Azure Function App
# app setting exactly.
TOKEN_ENV_BY_DEVICE = {
    "iphone-se-3": "OCG_DEVICE_TOKEN_IPHONE_SE_3",  # temporary backward compat
    "iphone-13-mini": "OCG_DEVICE_TOKEN_IPHONE_13_MINI",
    "iphone-15-cn": "OCG_DEVICE_TOKEN_IPHONE_15_CN",
}


def _allowed_device_ids() -> set[str]:
    """Parse the comma-separated allowed device ID list from env."""
    raw = os.getenv("OCG_ALLOWED_DEVICE_IDS", "")
    return {d.strip() for d in raw.split(",") if d.strip()}


def _authenticate(req: func.HttpRequest) -> tuple[bool, str, int]:
    """
    Validate device auth headers.

    Returns (ok, error_message, status_code).
    """
    auth_header = req.headers.get("Authorization", "")
    device_id = req.headers.get("x-ocg-device-id", "")

    if not auth_header.startswith("Bearer ") or not device_id:
        return False, "missing_credentials", 401

    token = auth_header[len("Bearer "):]

    # Check allowed device list
    allowed = _allowed_device_ids()
    if allowed and device_id not in allowed:
        return False, "invalid_device", 401

    # Look up expected token for this device
    env_key = TOKEN_ENV_BY_DEVICE.get(device_id, "")
    expected = os.getenv(env_key, "") if env_key else ""

    if not expected or token != expected:
        return False, "invalid_token", 401

    return True, "", 0


VALID_CAPTURE_TYPES = {"dictated_note", "quick_log", "photo", "manual"}


@app.function_name("captures")
@app.route(route="v1/captures", methods=["POST"], auth_level=func.AuthLevel.ANONYMOUS)
@app.queue_output(
    arg_name="queue_msg",
    queue_name="%OCG_CAPTURE_QUEUE%",
    connection="AzureWebJobsStorage",
)
def capture_post(req: func.HttpRequest, queue_msg: func.Out[str]) -> func.HttpResponse:
    """Accept a capture POST, validate, write raw blob, and enqueue pointer."""
    # ── Auth ──
    ok, err_msg, status = _authenticate(req)
    if not ok:
        logging.warning("Auth failed: %s (device: %s)", err_msg, req.headers.get("x-ocg-device-id", "?"))
        return func.HttpResponse(
            json.dumps({"error": err_msg}),
            status_code=status,
            mimetype="application/json",
        )

    # ── Parse body ──
    try:
        body = req.get_json()
    except ValueError:
        return func.HttpResponse(
            json.dumps({"error": "invalid_json"}),
            status_code=400,
            mimetype="application/json",
        )

    capture_type = body.get("capture_type", "")
    raw_text = body.get("raw_text", "")
    client_capture_id = body.get("client_capture_id", "")

    if capture_type not in VALID_CAPTURE_TYPES:
        return func.HttpResponse(
            json.dumps({"error": "invalid_capture_type", "valid": sorted(VALID_CAPTURE_TYPES)}),
            status_code=400,
            mimetype="application/json",
        )

    if not raw_text.strip():
        return func.HttpResponse(
            json.dumps({"error": "empty_raw_text"}),
            status_code=400,
            mimetype="application/json",
        )

    # ── Build envelope ──
    capture_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)
    device_id = req.headers.get("x-ocg-device-id", "")

    raw_envelope = {
        "id": capture_id,
        "client_capture_id": client_capture_id or None,
        "capture_type": capture_type,
        "raw_text": raw_text,
        "device_id": device_id,
        "received_at": now.isoformat(),
    }

    # ── Write raw blob ──
    container = os.getenv("OCG_CAPTURE_RAW_CONTAINER", "intake-raw")
    blob_name = f"{now.strftime('%Y/%m/%d')}/{capture_id}/request.json"

    conn_str = os.environ["AzureWebJobsStorage"]
    blob_client = BlobServiceClient.from_connection_string(conn_str)
    blob_client.get_blob_client(container, blob_name).upload_blob(
        json.dumps(raw_envelope, indent=2),
        content_type="application/json",
        overwrite=False,
    )
    logging.info("Raw blob written: %s/%s", container, blob_name)

    # ── Enqueue pointer (no raw_text — lives in blob only) ──
    queue_message = {
        "id": capture_id,
        "client_capture_id": client_capture_id or None,
        "capture_type": capture_type,
        "device_id": device_id,
        "received_at": now.isoformat(),
        "blob_container": container,
        "blob_name": blob_name,
    }

    queue_msg.set(json.dumps(queue_message))
    logging.info("Capture enqueued: %s (%s)", capture_id, capture_type)

    return func.HttpResponse(
        json.dumps({"id": capture_id, "status": "queued"}),
        status_code=201,
        mimetype="application/json",
    )
