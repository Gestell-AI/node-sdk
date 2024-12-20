import type { BaseRequest, BaseResponse } from 'types/base'
import { Organization } from 'types/organization'
import loadFetch from 'util/fetch'

export interface GetOrganizationsRequest {
  search?: string
  take?: number
  skip?: number
  extended?: boolean
}

export interface GetOrganizationsResponse extends BaseResponse {
  result: Organization[]
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
