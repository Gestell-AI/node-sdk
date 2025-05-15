import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import loadFetch from '@gestell/util/fetch'

export interface ExportTableRequest {
  collectionId: string
  categoryId: string
  format?: 'json' | 'csv'
  take?: number
  skip?: number
}

export interface ExportTableResponse extends BaseResponse {
  result: Record<string, string>[] | string
}

export async function exportTable({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  categoryId,
  format = 'json',
  skip = 0,
  take = 10
}: ExportTableRequest & BaseRequest): Promise<ExportTableResponse | string> {
  const fetch = await loadFetch()
  const url = new URL(
    `/api/collection/${collectionId}/table/export?categoryId=${categoryId}&format=${format}&skip=${skip}&take=${take}`,
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

  if (format === 'json') {
    const response = (await payload.json()) as ExportTableResponse
    return response
  } else {
    return await payload.text()
  }
}
