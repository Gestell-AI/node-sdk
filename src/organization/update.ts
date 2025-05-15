import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import loadFetch from '@gestell/util/fetch'

/**
 * Request parameters for updating an organization's details.
 */
export interface UpdateOrganizationRequest {
  /** Unique identifier of the organization to update */
  organizationId: string
  /** New name for the organization */
  name: string
  /** New description for the organization */
  description: string
}

/**
 * Response data from an organization update operation.
 * Extends the base response with standard status fields.
 */
export type UpdateOrganizationResponse = BaseResponse

export async function updateOrganization({
  apiKey,
  apiUrl,
  debug,
  organizationId,
  name,
  description
}: UpdateOrganizationRequest &
  BaseRequest): Promise<UpdateOrganizationResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/organization/${organizationId}`, apiUrl)

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
