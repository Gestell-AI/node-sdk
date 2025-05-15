import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import { JobType } from '@gestell/types/job'
import loadFetch from '@gestell/util/fetch'

/**
 * Request parameters for reprocessing one or more documents.
 */
export interface ReprocessDocumentsRequest {
  /** ID of the collection containing the documents */
  collectionId: string
  /** Array of document IDs to reprocess */
  ids: string[]
  /** Type of reprocessing to perform */
  type: JobType
}

/**
 * Response data from a document reprocessing operation.
 * Extends the base response with standard status fields.
 */
export type ReprocessDocumentsResponse = BaseResponse

export async function reprocessDocuments({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  ids,
  type
}: ReprocessDocumentsRequest &
  BaseRequest): Promise<ReprocessDocumentsResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/collection/${collectionId}/job`, apiUrl)

  const payload = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `BEARER ${apiKey}`
    },
    body: JSON.stringify({
      ids,
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
      message: errorResponse?.message || 'There was an error reprocessing jobs'
    }
  }

  const response = (await payload.json()) as ReprocessDocumentsResponse

  return response
}
