import type { BaseRequest, BaseResponse } from 'types/base'
import loadFetch from 'util/fetch'

export interface UpdateOrganizationRequest {
  id: string
  name: string
  description: string
}

export async function updateOrganization({
  apiKey,
  apiUrl,
  debug,
  id,
  name,
  description
}: UpdateOrganizationRequest & BaseRequest): Promise<BaseResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/organization/${id}`, apiUrl)

  const payload = await fetch(url, {
    method: 'PATCH',
    headers: {
      Authorization: `BEARER ${apiKey}`
    },
    body: JSON.stringify({
      name,
      description
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
        errorResponse?.message || 'There was an error updating the organization'
    }
  }

  const response = (await payload.json()) as BaseResponse

  return response
}
