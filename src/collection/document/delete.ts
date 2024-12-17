import type { BaseRequest, BaseResponse } from 'types/base'
import loadFetch from 'util/fetch'

export interface DeleteDocumentRequest {
  collectionId: string
  documentId: string
}

export async function deleteDocument({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  documentId
}: DeleteDocumentRequest & BaseRequest): Promise<BaseResponse> {
  const fetch = await loadFetch()
  const url = new URL(
    `/api/collection/${collectionId}/document/${documentId}`,
    apiUrl
  )

  const payload = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `BEARER ${apiKey}`
    }
  })

  if (!payload.ok) {
    const errorResponse = await payload.json().catch(() => null)
    if (debug) {
      console.log(errorResponse)
    }
    return {
      status: 'ERROR',
      message:
        errorResponse?.message || 'There was an error deleting the document'
    }
  }

  const response = (await payload.json()) as BaseResponse

  return response
}
