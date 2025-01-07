import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import loadFetch from '@gestell/util/fetch'

export interface ExportTableRequest {
  collectionId: string
  categoryId: string
  type?: 'json' | 'csv'
}

export interface ExportTableResponse extends BaseResponse {
  result: object[]
}

export async function exportTable({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  categoryId,
  type = 'json'
}: ExportTableRequest & BaseRequest): Promise<ExportTableResponse | string> {
  const fetch = await loadFetch()
  const url = new URL(
    `/api/collection/${collectionId}/table/export?categoryId=${categoryId}&type=${type}`,
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
        errorResponse?.message || 'There was an error exporting the table',
      result: []
    }
  }

  if (type === 'json') {
    const response = (await payload.json()) as ExportTableResponse
    return response
  } else {
    return await payload.text()
  }
}
