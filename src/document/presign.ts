import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import loadFetch from '@gestell/util/fetch'

export interface PresignDocumentRequest {
  collectionId: string
  filename: string
  type: string
}

export interface PresignDocumentResponse extends BaseResponse {
  path: string
  url: string
}

export async function presignDocument({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  filename,
  type
}: PresignDocumentRequest & BaseRequest): Promise<PresignDocumentResponse> {
  const fetch = await loadFetch()
  const url = new URL(
    `/api/collection/${collectionId}/document/presign`,
    apiUrl
  )

  const payload = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `BEARER ${apiKey}`
    },
    body: JSON.stringify({
      filename,
      type
    })
  })

  if (!payload.ok) {
    const errorResponse = await payload.json().catch(() => null)
    if (debug) {
      console.log(errorResponse)
    }
    return {
      status: 'ERROR',
      message:
        errorResponse?.message || 'There was an error presigning the document',
      path: '',
      url: ''
    }
  }

  const response = (await payload.json()) as PresignDocumentResponse

  return response
}
