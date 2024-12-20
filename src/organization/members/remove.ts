import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import loadFetch from '@gestell/util/fetch'

export interface RemoveMembersRequest {
  organizationId: string
  members: string[]
}

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
