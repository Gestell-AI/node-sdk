import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import loadFetch from '@gestell/util/fetch'

/**
 * Request parameters for updating an existing document in a collection.
 */
export interface UpdateDocumentRequest {
  /** ID of the collection containing the document */
  collectionId: string
  /** ID of the document to update */
  documentId: string
  /** New name for the document */
  name?: string
  /** Updated instructions or description for the document */
  instructions?: string
  /** Whether to perform additional OCR processing for tables */
  tables?: boolean
  /** Whether to dispatch a background job for processing */
  job?: boolean
}

/**
 * Response data from a document update operation.
 * Extends the base response with standard status fields.
 */
export type UpdateDocumentResponse = BaseResponse

export async function updateDocument({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  documentId,
  name,
  instructions,
  job,
  tables
}: UpdateDocumentRequest & BaseRequest): Promise<UpdateDocumentResponse> {
  const fetch = await loadFetch()
  const url = new URL(
    `/api/collection/${collectionId}/document/${documentId}`,
    apiUrl
  )

  const payload = await fetch(url, {
    method: 'PATCH',
    headers: {
      Authorization: `BEARER ${apiKey}`
    },
    body: JSON.stringify({
      name,
      instructions,
      job,
      tables
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
        errorResponse?.message || 'There was an error updating the document'
    }
  }

  const response = (await payload.json()) as BaseResponse

  return response
}
