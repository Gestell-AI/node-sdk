import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import { Document } from '@gestell/types/document'
import loadFetch from '@gestell/util/fetch'

/**
 * Request parameters for retrieving a specific document from a collection.
 */
export interface GetDocumentRequest {
  /** ID of the collection containing the document */
  collectionId: string

  /** ID of the document to retrieve */
  documentId: string
}

/**
 * Response data from a document retrieval operation.
 */
export interface GetDocumentResponse extends BaseResponse {
  /** The retrieved document or null if not found */
  result: Document | null
}

export async function getDocument({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  documentId
}: GetDocumentRequest & BaseRequest): Promise<GetDocumentResponse> {
  const fetch = await loadFetch()
  const url = new URL(
    `/api/collection/${collectionId}/document/${documentId}`,
    apiUrl
  )

  const payload = await fetch(url, {
    method: 'GET',
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
        errorResponse?.message || 'There was an error retrieving the document',
      result: null
    }
  }

  const response = (await payload.json()) as GetDocumentResponse

  return response
}
