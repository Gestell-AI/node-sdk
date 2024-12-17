import type { BaseRequest, BaseResponse } from 'types/base'
import { OrganizationMemberPayload } from 'types/organization'
import loadFetch from 'util/fetch'

export interface CreateOrganizationRequest {
  name: string
  description: string
  members?: OrganizationMemberPayload[]
}

export interface CreateOrganizationResponse extends BaseResponse {
  id: string
}

export async function createOrganization({
  apiKey,
  apiUrl,
  debug,
  name,
  description,
  members = []
}: CreateOrganizationRequest &
  BaseRequest): Promise<CreateOrganizationResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/organization`, apiUrl)

  const payload = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `BEARER ${apiKey}`
    },
    body: JSON.stringify({
      name,
      description,
      members
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
        errorResponse?.message || 'There was an error creating an organization',
      id: ''
    }
  }

  const response = (await payload.json()) as CreateOrganizationResponse

  return response
}
