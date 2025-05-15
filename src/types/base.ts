/**
 * Valid status values for API responses.
 */
export type StatusType = 'OK' | 'ERROR'

/**
 * Common fields included with every API request.
 */
export interface BaseRequest {
  /** API key used for request authentication. */
  apiKey: string
  /** Base URL of the Gestell API endpoint. */
  apiUrl: string
  /** Flag to enable verbose logging for debugging. */
  debug: boolean
}

/**
 * Common fields returned with every API response.
 */
export interface BaseResponse {
  /** Indicates whether the request succeeded or failed. */
  status: StatusType
  /** Optional human-readable message with additional information or error details. */
  message?: string
}
