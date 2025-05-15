import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import loadFetch from '@gestell/util/fetch'

/**
 * Request parameters for generating a presigned upload URL for a document.
 */
export interface PresignDocumentRequest {
  /** ID of the collection to upload the document to */
  collectionId: string
  /** Filename for the document to be uploaded */
  filename: string
  /** MIME type of the document */
  type: string
}

/**
 * Response data containing the presigned URL and storage path.
 */
export interface PresignDocumentResponse extends BaseResponse {
  /** Storage path where the document will be saved */
  path: string
  /** Presigned URL to upload the document */
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
