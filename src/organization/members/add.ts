import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import { OrganizationMemberRequest } from '@gestell/types/organization'
import loadFetch from '@gestell/util/fetch'

/**
 * Request parameters for adding members to an organization.
 */
export interface AddMembersRequest {
  /** ID of the organization to add members to */
  organizationId: string
  /** Array of member objects to add to the organization */
  members: OrganizationMemberRequest[]
}

/**
 * Response data from a member addition operation.
 * Extends the base response with standard status fields.
 */
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
