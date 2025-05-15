import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import loadFetch from '@gestell/util/fetch'

export interface TablesQueryRequest {
  collectionId: string
  categoryId: string
  skip?: number
  take?: number
  prompt?: string
}

export interface TablesQueryResponse extends BaseResponse {
  result: Record<string, string>[]
}

export async function tablesQuery({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  categoryId,
  skip = 0,
  take = 10,
  prompt = ''
}: TablesQueryRequest & BaseRequest): Promise<TablesQueryResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/collection/${collectionId}/table`, apiUrl)

  const payload = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `BEARER ${apiKey}`
    },
    body: JSON.stringify({
      collectionId,
      categoryId,
      skip,
      take,
      prompt
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
