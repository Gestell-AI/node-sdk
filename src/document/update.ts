import type { BaseRequest, BaseResponse } from 'types/base'
import loadFetch from 'util/fetch'

export interface UpdateDocumentRequest {
  collectionId: string
  documentId: string
  name?: string
  instructions?: string
  job?: boolean
}

export type UpdateDocumentResponse = BaseResponse

export async function updateDocument({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  documentId,
  name,
  instructions,
  job
}: UpdateDocumentRequest & BaseRequest): Promise<UpdateDocumentResponse> {
  const fetch = await loadFetch()
  const url = new URL(
    `/api/collection/${collectionId}/document/${documentId}`,
    apiUrl
  )

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