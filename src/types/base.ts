export type StatusType = 'OK' | 'ERROR'

export interface BaseRequest {
  apiKey: string
  apiUrl: string
  debug: boolean
}

export interface BaseResponse {
  status: StatusType
  message?: string
}
