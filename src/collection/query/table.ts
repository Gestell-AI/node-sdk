import type { BaseRequest, BaseResponse } from 'types/base'
import loadFetch from 'util/fetch'

export interface TablesQueryRequest {
  categoryId: string
  skip?: number
  take?: number
}

export interface TablesQueryRequestToApi extends TablesQueryRequest {
  id: string
}

export interface TablesQueryResponse extends BaseResponse {
  result: object[]
}

export async function tablesQuery({
  apiKey,
  apiUrl,
  debug,
  id,
  categoryId,
  skip = 0,
  take = 10
}: TablesQueryRequestToApi & BaseRequest): Promise<TablesQueryResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/collection/${id}/table`, apiUrl)

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
        errorResponse?.message || 'There was an error running the table query',
      result: []
    }
  }

  const response = (await payload.json()) as TablesQueryResponse

  return response
}
