import type { BaseRequest, BaseResponse } from 'types/base'
import { Job, JobStatusType } from 'types/job'
import loadFetch from 'util/fetch'

export interface GetJobsRequest {
  collectionId: string
  take?: number
  skip?: number
  status?: JobStatusType
  nodes?: JobStatusType
  edges?: JobStatusType
  vectors?: JobStatusType
  category?: JobStatusType
}

export interface GetJobsResponse extends BaseResponse {
  result: Job[]
}

export async function getJobs({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  take = 10,
  skip = 0,
  status = 'all',
  nodes = 'all',
  edges = 'all',
  vectors = 'all',
  category = 'all'
}: GetJobsRequest & BaseRequest): Promise<GetJobsResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/collection/${collectionId}/job`, apiUrl)

  url.searchParams.set('take', take.toString())
  url.searchParams.set('skip', skip.toString())
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
      message: errorResponse?.message || 'There was an error retrieving jobs',
      result: []
    }
  }

  const response = (await payload.json()) as GetJobsResponse

  return response
}
