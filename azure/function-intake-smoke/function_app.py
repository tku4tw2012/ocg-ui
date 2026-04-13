"""
OCGarden smoke-test Azure Function — POST /api/v1/smoke

Lightweight auth-only endpoint for verifying device credentials without
writing to any queue or blob. Returns 200 on success, 401 on auth failure.

Uses the same auth contract and device→token mapping as the intake function.

Deployed to: func-ocg2026-smoke-04vmt (or same function app as intake)
"""

import json
import logging
import os

import azure.functions as func

app = func.FunctionApp()

# ── Device → token env-var mapping ──────────────────────────────────────
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


@app.function_name("smoke")
@app.route(route="v1/smoke", methods=["POST", "GET"], auth_level=func.AuthLevel.ANONYMOUS)
def smoke_test(req: func.HttpRequest) -> func.HttpResponse:
    """Auth-only smoke test — no side effects."""
    ok, err_msg, status = _authenticate(req)
    if not ok:
        logging.warning("Smoke auth failed: %s (device: %s)", err_msg, req.headers.get("x-ocg-device-id", "?"))
        return func.HttpResponse(
            json.dumps({"error": err_msg}),
            status_code=status,
            mimetype="application/json",
        )

    device_id = req.headers.get("x-ocg-device-id", "")
    logging.info("Smoke OK: %s", device_id)

    return func.HttpResponse(
        json.dumps({"status": "ok", "device": device_id}),
        status_code=200,
        mimetype="application/json",
    )
