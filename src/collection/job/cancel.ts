import type { BaseRequest, BaseResponse } from 'types/base'
import loadFetch from 'util/fetch'

export interface CancelJobsRequest {
  ids: string[]
}

export interface CancelJobsRequestToApi extends CancelJobsRequest {
  collectionId: string
}

export type CancelJobsResponse = BaseResponse

export async function cancelJobs({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  ids
}: CancelJobsRequestToApi & BaseRequest): Promise<CancelJobsResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/collection/${collectionId}/job`, apiUrl)

  ids.forEach((id) => {
    url.searchParams.append('id', id)
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
