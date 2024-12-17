import type { BaseRequest, BaseResponse } from 'types/base'
import { Collection, CollectionStats } from 'types/collection'
import loadFetch from 'util/fetch'

export interface GetCollectionRequest {
  id: string
}

export interface GetCollectionResponse extends BaseResponse {
  result: Collection | null
  stats: CollectionStats | null
}

export async function getCollection({
  apiKey,
  apiUrl,
  debug,
  id
}: GetCollectionRequest & BaseRequest): Promise<GetCollectionResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/collection/${id}`, apiUrl)

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
