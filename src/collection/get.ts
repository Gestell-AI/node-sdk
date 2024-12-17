import type { BaseRequest, BaseResponse } from 'types/base'
import { Collection } from 'types/collection'
import loadFetch from 'util/fetch'

export interface GetCollectionsRequest {
  search?: string
  take?: number
  skip?: number
  extended?: boolean
}

export interface GetCollectionsResponse extends BaseResponse {
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
