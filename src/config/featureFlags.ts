/**
 * Feature flags.
 *
 * Low-risk boolean knobs that control optional UI behavior.
 * Flip a flag here to enable or disable a feature across the app.
 *
 * Security note: these flags are build-time constants — they are not a
 * security boundary. Do not use them to gate auth or sensitive operations.
 */

export const featureFlags = {
  /**
   * When false, the photo capture flow renders but submitPhoto is mock-only.
   * Set to true only after the backend photo-intake contract is defined and
   * the upload endpoint is live.
   */
  photoUploadEnabled: false,
} as const
