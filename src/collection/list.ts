import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import { Collection } from '@gestell/types/collection'
import loadFetch from '@gestell/util/fetch'

/**
 * Request parameters for listing collections with optional filtering and pagination.
 */
export interface GetCollectionsRequest {
  /** Search term to filter collections by name. */
  search?: string

  /** Maximum number of collections to return. */
  take?: number

  /** Number of collections to skip for pagination. */
  skip?: number

  /** If true, returns extended collection details. */
  extended?: boolean
}

/**
 * Response containing an array of collections.
 */
export interface GetCollectionsResponse extends BaseResponse {
  /** Array of collection objects. */
  result: Collection[]
}

export async function getCollections({
  apiKey,
  apiUrl,
  debug,
  search = '',
  take = 10,
  skip = 0,
  extended = false
}: GetCollectionsRequest & BaseRequest): Promise<GetCollectionsResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/collection`, apiUrl)

  url.searchParams.set('search', search)
  url.searchParams.set('take', take.toString())
  url.searchParams.set('skip', skip.toString())
  url.searchParams.set('extended', extended.toString())

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
        errorResponse?.message || 'There was an error retrieving collections',
      result: []
    }
  }

  const response = (await payload.json()) as GetCollectionsResponse

  return response
}
