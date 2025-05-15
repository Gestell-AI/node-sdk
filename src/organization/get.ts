import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import { OrganizationResult } from '@gestell/types/organization'
import loadFetch from '@gestell/util/fetch'

/**
 * Request parameters for retrieving organization details.
 */
export interface GetOrganizationRequest {
  /** Unique identifier of the organization to retrieve */
  id: string
}

/**
 * Response data from an organization details request.
 * Extends the base response with organization information.
 */
export interface GetOrganizationResponse extends BaseResponse {
  /** The organization details or null if not found */
  result: OrganizationResult | null
}

export async function getOrganization({
  apiKey,
  apiUrl,
  debug,
  id
}: GetOrganizationRequest & BaseRequest): Promise<GetOrganizationResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/organization/${id}`, apiUrl)

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
        errorResponse?.message ||
        'There was an error retrieving the organization',
      result: null
    }
  }

  const response = (await payload.json()) as GetOrganizationResponse

  return response
}
