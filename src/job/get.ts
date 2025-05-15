import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import { Job } from '@gestell/types/job'
import loadFetch from '@gestell/util/fetch'

/**
 * Request parameters for retrieving job information for a specific document.
 */
export interface GetJobRequest {
  /** ID of the collection containing the document */
  collectionId: string
  /** ID of the document to get job information for */
  documentId: string
}

/**
 * Response data from a job information request.
 * Extends the base response with job details.
 */
export interface GetJobResponse extends BaseResponse {
  /** The job details or null if no job is found */
  result: Job | null
}

export async function getJob({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  documentId
}: GetJobRequest & BaseRequest): Promise<GetJobResponse> {
  const fetch = await loadFetch()
  const url = new URL(
    `/api/collection/${collectionId}/job/${documentId}`,
    apiUrl
  )

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
        errorResponse?.message || 'There was an error retrieving the job',
      result: null
    }
  }

  const response = (await payload.json()) as GetJobResponse

  return response
}
