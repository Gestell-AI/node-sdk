import type { BaseRequest, BaseResponse } from 'types/base'
import loadFetch from 'util/fetch'

export interface UpdateDocumentRequest {
  name?: string
  instructions?: string
  job?: boolean
}

export interface UpdateDocumentRequestToApi extends UpdateDocumentRequest {
  id: string
  documentId: string
}

export async function updateDocument({
  apiKey,
  apiUrl,
  debug,
  id,
  documentId,
  name,
  instructions,
  job
}: UpdateDocumentRequestToApi & BaseRequest): Promise<BaseResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/collection/${id}/document/${documentId}`, apiUrl)

  const payload = await fetch(url, {
    method: 'PATCH',
    headers: {
      Authorization: `BEARER ${apiKey}`
    },
    body: JSON.stringify({
      name,
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
        errorResponse?.message || 'There was an error updating the document'
    }
  }

  const response = (await payload.json()) as BaseResponse

  return response
}
