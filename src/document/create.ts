import type { BaseRequest, BaseResponse } from 'types/base'
import loadFetch from 'util/fetch'

export interface CreateDocumentRequest {
  collectionId: string
  name: string
  path: string
  type: string
  instructions?: string
  job?: boolean
}

export interface CreateDocumentResponse extends BaseResponse {
  id: string
}

export async function createDocument({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  name,
  path,
  type,
  instructions = '',
  job = true
}: CreateDocumentRequest & BaseRequest): Promise<CreateDocumentResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/collection/${collectionId}/document`, apiUrl)

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
