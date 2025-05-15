import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import loadFetch from '@gestell/util/fetch'

/**
 * Request parameters for removing members from an organization.
 */
export interface RemoveMembersRequest {
  /** ID of the organization to remove members from */
  organizationId: string
  /** Array of member IDs to remove from the organization */
  members: string[]
}

/**
 * Response data from a member removal operation.
 * Extends the base response with standard status fields.
 */
export type RemoveMembersResponse = BaseResponse

export async function removeMembers({
  apiKey,
  apiUrl,
  debug,
  organizationId,
  members
}: RemoveMembersRequest & BaseRequest): Promise<RemoveMembersResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/organization/${organizationId}/member`, apiUrl)

  for (const member of members) {
    url.searchParams.append('id', member)
  }

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
      message: errorResponse?.message || 'There was an error removing members'
    }
  }

  const response = (await payload.json()) as BaseResponse

  return response
}
