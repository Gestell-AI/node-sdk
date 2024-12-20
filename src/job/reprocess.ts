import type { BaseRequest, BaseResponse } from 'types/base'
import { JobType } from 'types/job'
import loadFetch from 'util/fetch'

export interface ReprocessDocumentsRequest {
  collectionId: string
  ids: string[]
  type: JobType
}

export type ReprocessDocumentsResponse = BaseResponse

export async function reprocessDocument({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  ids,
  type
}: ReprocessDocumentsRequest &
  BaseRequest): Promise<ReprocessDocumentsResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/collection/${collectionId}/job`, apiUrl)

  const payload = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `BEARER ${apiKey}`
    },
    body: JSON.stringify({
      ids,
      type
    })
  })

  if (!payload.ok) {
    const errorResponse = await payload.json().catch(() => null)
    if (debug) {
      console.log(errorResponse)
    }
    return {
      status: 'ERROR',
      message: errorResponse?.message || 'There was an error reprocessing jobs'
    }
  }

  const response = (await payload.json()) as ReprocessDocumentsResponse

  return response
}
