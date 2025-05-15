import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import {
  SearchModes,
  SearchRequestBody,
  SearchResult
} from '@gestell/types/query'
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
  type = SearchModes[method as keyof typeof SearchModes].type,
  vectorDepth = SearchModes[method as keyof typeof SearchModes].vectorDepth,
  nodeDepth = SearchModes[method as keyof typeof SearchModes].nodeDepth,
  maxQueries = SearchModes[method as keyof typeof SearchModes].maxQueries,
  maxResults = SearchModes[method as keyof typeof SearchModes].maxResults,
  includeContent = true,
  includeEdges = false
}: SearchRequestBody & BaseRequest): Promise<SearchQueryResponse> {
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
