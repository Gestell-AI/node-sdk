import type { BaseRequest, BaseResponse } from 'types/base'
import { FeatureLayout } from 'types/layout'
import loadFetch from 'util/fetch'

export interface FeaturesQueryRequest {
  categoryId: string
  skip?: number
  take?: number
}

export interface FeaturesQueryRequestToApi extends FeaturesQueryRequest {
  id: string
}

export interface FeaturesQueryResponse extends BaseResponse {
  result: FeatureLayout[]
}

export async function featuresQuery({
  apiKey,
  apiUrl,
  debug,
  id,
  categoryId,
  skip = 0,
  take = 10
}: FeaturesQueryRequestToApi & BaseRequest): Promise<FeaturesQueryResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/collection/${id}/features`, apiUrl)

  const payload = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `BEARER ${apiKey}`
    },
    body: JSON.stringify({
      collectionId: id,
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
