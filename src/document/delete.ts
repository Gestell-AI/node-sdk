import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import loadFetch from '@gestell/util/fetch'

/**
 * Request parameters for deleting a specific document from a collection.
 */
export interface DeleteDocumentRequest {
  /** ID of the collection containing the document */
  collectionId: string
  /** ID of the document to delete */
  documentId: string
}

/**
 * Response data from a document deletion operation.
 */
export type DeleteDocumentResponse = BaseResponse

export async function deleteDocument({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  documentId
}: DeleteDocumentRequest & BaseRequest): Promise<DeleteDocumentResponse> {
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
