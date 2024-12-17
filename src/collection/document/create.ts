import type { BaseRequest, BaseResponse } from 'types/base'
import loadFetch from 'util/fetch'

export interface CreateDocumentRequest {
  name: string
  path: string
  type: string
  instructions?: string
  job?: boolean
}

export interface CreateDocumentRequestToApi extends CreateDocumentRequest {
  id: string
}

export interface CreateDocumentResponse extends BaseResponse {
  id: string
}

export async function createDocument({
  apiKey,
  apiUrl,
  debug,
  id,
  name,
  path,
  type,
  instructions,
  job
}: CreateDocumentRequestToApi & BaseRequest): Promise<CreateDocumentResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/collection/${id}/document`, apiUrl)

  const payload = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `BEARER ${apiKey}`
    },
    body: JSON.stringify({
      name,
      path,
      type,
      instructions,
      job
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
        errorResponse?.message || 'There was an error creating the document',
      id: ''
    }
  }

  const response = (await payload.json()) as CreateDocumentResponse

  return response
}
