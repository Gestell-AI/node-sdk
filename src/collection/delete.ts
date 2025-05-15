import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import loadFetch from '@gestell/util/fetch'

/**
 * Request payload for deleting a collection.
 */
export interface DeleteCollectionRequest {
  /** The ID of the collection to be deleted. */
  collectionId: string
}

/**
 * Response returned after a collection deletion operation.
 * Inherits standard response fields from BaseResponse.
 */
export type DeleteCollectionResponse = BaseResponse

export async function deleteCollection({
  apiKey,
  apiUrl,
  debug,
  collectionId
}: DeleteCollectionRequest & BaseRequest): Promise<DeleteCollectionResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/collection/${collectionId}`, apiUrl)

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
        errorResponse?.message || 'There was an error deleting collection'
    }
  }

  const response = (await payload.json()) as BaseResponse

  return response
}
