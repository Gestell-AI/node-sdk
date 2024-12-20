import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import { FeatureLayout } from '@gestell/types/layout'
import loadFetch from '@gestell/util/fetch'

export interface FeaturesQueryRequest {
  collectionId: string
  categoryId: string
  skip?: number
  take?: number
}

export interface FeaturesQueryResponse extends BaseResponse {
  result: FeatureLayout[]
}

export async function featuresQuery({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  categoryId,
  skip = 0,
  take = 10
}: FeaturesQueryRequest & BaseRequest): Promise<FeaturesQueryResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/collection/${collectionId}/features`, apiUrl)

  const payload = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `BEARER ${apiKey}`
    },
    body: JSON.stringify({
      collectionId,
      categoryId,
      skip,
      take
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
        errorResponse?.message ||
        'There was an error running the features query',
      result: []
    }
  }

  const response = (await payload.json()) as FeaturesQueryResponse

  return response
}
