import type { BaseRequest, BaseResponse } from 'types/base'
import { Document } from 'types/document'
import loadFetch from 'util/fetch'

export interface GetDocumentRequest {
  collectionId: string
  documentId: string
}

export interface GetDocumentResponse extends BaseResponse {
  result: Document | null
}

export async function getDocument({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  documentId
}: GetDocumentRequest & BaseRequest): Promise<GetDocumentResponse> {
  const fetch = await loadFetch()
  const url = new URL(
    `/api/collection/${collectionId}/document/${documentId}`,
    apiUrl
  )

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
        errorResponse?.message || 'There was an error retrieving the document',
      result: null
    }
  }

  const response = (await payload.json()) as GetDocumentResponse

  return response
}
