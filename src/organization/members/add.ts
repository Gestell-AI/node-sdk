import type { BaseRequest, BaseResponse } from 'types/base'
import { OrganizationMemberPayload } from 'types/organization'
import loadFetch from 'util/fetch'

export interface AddMembersRequest {
  organizationId: string
  members: OrganizationMemberPayload[]
}

export type AddMembersResponse = BaseResponse

export async function addMembers({
  apiKey,
  apiUrl,
  debug,
  organizationId,
  members
}: AddMembersRequest & BaseRequest): Promise<AddMembersResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/organization/${organizationId}/member`, apiUrl)

  const payload = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `BEARER ${apiKey}`
    },
    body: JSON.stringify({
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
      message: errorResponse?.message || 'There was an error adding members'
    }
  }

  const response = (await payload.json()) as BaseResponse

  return response
}
