import type { BaseRequest } from '@gestell/types/base'
import {
  AudioLayout,
  DocumentLayout,
  PhotoLayout,
  VideoLayout
} from '@gestell/types/layout'
import loadFetch from '@gestell/util/fetch'

/**
 * Request parameters for exporting a document from a collection.
 */
export interface ExportDocumentRequest {
  /** ID of the collection containing the document */
  collectionId: string
  /** ID of the document to export */
  documentId: string
  /** Format of the exported document (defaults to JSON if not specified) */
  type?: 'json' | 'text'
}

/**
 * Response data from a document export operation.
 * Returns layout arrays for various media types or a string representation.
 */
export type ExportDocumentResponse =
  | DocumentLayout[]
  | AudioLayout[]
  | PhotoLayout[]
  | VideoLayout[]
  | string

export async function exportDocument({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  documentId,
  type = 'json'
}: ExportDocumentRequest & BaseRequest): Promise<ExportDocumentResponse> {
  const fetch = await loadFetch()
  const url = new URL(
    `/api/collection/${collectionId}/document/${documentId}/export?type=${type}`,
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
    return 'ERROR EXPORTING DOCUMENT'
  }

  const response =
    type === 'json'
      ? await payload.json()
      : ((await payload.text()) as ExportDocumentResponse)

  return response
}
