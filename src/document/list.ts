import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import { Document } from '@gestell/types/document'
import { JobStatusType } from '@gestell/types/job'
import loadFetch from '@gestell/util/fetch'

export interface GetDocumentsRequest {
  collectionId: string
  search?: string
  take?: number
  skip?: number
  extended?: boolean
  status?: JobStatusType
  nodes?: JobStatusType
  edges?: JobStatusType
  vectors?: JobStatusType
  category?: JobStatusType
}

export interface GetDocumentsResponse extends BaseResponse {
  result: Document[]
}

export async function getDocuments({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  search = '',
  take = 10,
  skip = 0,
  extended = false,
  status = 'all',
  nodes = 'all',
  edges = 'all',
  vectors = 'all',
  category = 'all'
}: GetDocumentsRequest & BaseRequest): Promise<GetDocumentsResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/collection/${collectionId}/document`, apiUrl)

  url.searchParams.set('search', search)
  url.searchParams.set('take', take.toString())
  url.searchParams.set('skip', skip.toString())
  url.searchParams.set('extended', extended.toString())
  url.searchParams.set('status', status)
  url.searchParams.set('nodes', nodes)
  url.searchParams.set('edges', edges)
  url.searchParams.set('vectors', vectors)
  url.searchParams.set('category', category)

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
        errorResponse?.message || 'There was an error retrieving documents',
      result: []
    }
  }

  const response = (await payload.json()) as GetDocumentsResponse

  return response
}
