import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import { Job, JobStatus } from '@gestell/types/job'
import loadFetch from '@gestell/util/fetch'

/**
 * Request parameters for listing jobs in a collection with optional filtering and pagination.
 */
export interface GetJobsRequest {
  /** ID of the collection to list jobs from */
  collectionId: string
  /** Filter jobs by enframing status */
  status?: JobStatus
  /** Filter jobs by node processing status */
  nodes?: JobStatus
  /** Filter jobs by edge processing status */
  edges?: JobStatus
  /** Filter jobs by vector processing status */
  vectors?: JobStatus
  /** Filter jobs by category processing status */
  category?: JobStatus
  /** Search term to filter jobs */
  search?: string
  /** Maximum number of jobs to return (default: 10) */
  take?: number
  /** Number of jobs to skip for pagination (default: 0) */
  skip?: number
}

/**
 * Response data from a jobs listing operation.
 * Extends the base response with an array of jobs.
 */
export interface GetJobsResponse extends BaseResponse {
  /** Array of job objects matching the query */
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
