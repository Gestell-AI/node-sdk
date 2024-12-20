import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import { QueryKV, QueryPayload, SearchResult } from '@gestell/types/query'
import loadFetch from '@gestell/util/fetch'

export interface SearchQueryResponse extends BaseResponse {
  result: SearchResult[]
}

export async function searchQuery({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  categoryId = '',
  prompt,
  method = 'normal',
  type = QueryKV[method].type,
  vectorDepth = QueryKV[method].vectorDepth,
  nodeDepth = QueryKV[method].nodeDepth,
  maxQueries = QueryKV[method].maxQueries,
  maxResults = QueryKV[method].maxResults,
  includeContent = true,
  includeEdges = false
}: QueryPayload & BaseRequest): Promise<SearchQueryResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/collection/${collectionId}/search`, apiUrl)

  const payload = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `BEARER ${apiKey}`
    },
    body: JSON.stringify({
      categoryId,
      prompt,
      method,
      type,
      vectorDepth,
      nodeDepth,
      maxQueries,
      maxResults,
      includeContent,
      includeEdges
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
        errorResponse?.message || 'There was an error running the search query',
      result: []
    }
  }

  const response = (await payload.json()) as SearchQueryResponse

  return response
}
