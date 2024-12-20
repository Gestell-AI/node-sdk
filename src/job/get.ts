import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import { Job } from '@gestell/types/job'
import loadFetch from '@gestell/util/fetch'

export interface GetJobRequest {
  collectionId: string
  jobId: string
}

export interface GetJobResponse extends BaseResponse {
  result: Job | null
}

export async function getJob({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  jobId
}: GetJobRequest & BaseRequest): Promise<GetJobResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/collection/${collectionId}/job/${jobId}`, apiUrl)

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
