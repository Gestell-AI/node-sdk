import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import { Collection, CollectionStats } from '@gestell/types/collection'
import loadFetch from '@gestell/util/fetch'

export interface GetCollectionRequest {
  collectionId: string
}

export interface GetCollectionResponse extends BaseResponse {
  result: Collection | null
  stats: CollectionStats | null
}

export async function getCollection({
  apiKey,
  apiUrl,
  debug,
  collectionId
}: GetCollectionRequest & BaseRequest): Promise<GetCollectionResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/collection/${collectionId}`, apiUrl)

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
        errorResponse?.message || 'There was an retrieving the collection',
      result: null,
      stats: null
    }
  }
  const response = (await payload.json()) as GetCollectionResponse

  return response
}
