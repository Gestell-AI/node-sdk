import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import loadFetch from '@gestell/util/fetch'

/**
 * Request parameters for creating a new document in a collection.
 */
export interface CreateDocumentRequest {
  /** ID of the collection to create the document in */
  collectionId: string
  /** Name of the new document */
  name: string
  /** Path for the document */
  path: string
  /** Document mime type (e.g., application/pdf) */
  type: string
  /** Optional instructions for document creation */
  instructions?: string
  /** Whether to run creation as a background job */
  job?: boolean
  /** Whether to do additional table processing in the document */
  tables?: boolean
}

/**
 * Response data from a document creation operation.
 */
export interface CreateDocumentResponse extends BaseResponse {
  /** ID of the newly created document */
  id: string
}

export async function createDocument({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  name,
  path,
  type,
  instructions = '',
  job = true,
  tables = false
}: CreateDocumentRequest & BaseRequest): Promise<CreateDocumentResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/collection/${collectionId}/document`, apiUrl)

  const payload = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `BEARER ${apiKey}`
    },
    body: JSON.stringify({
      name,
      path,
      type,
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
        errorResponse?.message || 'There was an error creating the document',
      id: ''
    }
  }

  const response = (await payload.json()) as CreateDocumentResponse

  return response
}
