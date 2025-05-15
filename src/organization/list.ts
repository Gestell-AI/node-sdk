import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import { OrganizationListResult } from '@gestell/types/organization'
import loadFetch from '@gestell/util/fetch'

/**
 * Request parameters for listing organizations with optional filtering and pagination.
 */
export interface GetOrganizationsRequest {
  /** Optional search term to filter organizations by name */
  search?: string
  /** Maximum number of organizations to return (default: 10) */
  take?: number
  /** Number of organizations to skip for pagination (default: 0) */
  skip?: number
  /** Whether to include extended organization details (default: false) */
  extended?: boolean
}

/**
 * Response data from an organizations listing operation.
 * Extends the base response with an array of organization summaries.
 */
export interface GetOrganizationsResponse extends BaseResponse {
  /** Array of organization summary objects */
  result: OrganizationListResult[]
}

export async function getOrganizations({
  apiKey,
  apiUrl,
  debug,
  search = '',
  take = 10,
  skip = 0,
  extended = false
}: GetOrganizationsRequest & BaseRequest): Promise<GetOrganizationsResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/organization`, apiUrl)

  url.searchParams.set('search', search)
  url.searchParams.set('take', take.toString())
  url.searchParams.set('skip', skip.toString())
  url.searchParams.set('extended', extended.toString())

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
        errorResponse?.message || 'There was an error retrieving organizations',
      result: []
    }
  }

  const response = (await payload.json()) as GetOrganizationsResponse

  return response
}
