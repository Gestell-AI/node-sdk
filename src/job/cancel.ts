import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import loadFetch from '@gestell/util/fetch'

/**
 * Request parameters for cancelling one or more background jobs.
 */
export interface CancelJobsRequest {
  /** ID of the collection containing the jobs */
  collectionId: string
  /** Array of Document IDs to cancel jobs for */
  ids: string[]
}

/**
 * Response data from a job cancellation operation.
 * Extends the base response with standard status fields.
 */
export type CancelJobsResponse = BaseResponse

export async function cancelJobs({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  ids
}: CancelJobsRequest & BaseRequest): Promise<CancelJobsResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/collection/${collectionId}/job`, apiUrl)

  ids.forEach((id) => {
    url.searchParams.append('ids', id)
  })

  const payload = await fetch(url, {
    method: 'DELETE',
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
      message: errorResponse?.message || 'There was an error cancelling jobs'
    }
  }

  const response = (await payload.json()) as CancelJobsResponse

  return response
}
