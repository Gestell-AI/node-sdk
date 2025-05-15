import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import loadFetch from '@gestell/util/fetch'

export interface ExportFeaturesRequest {
  collectionId: string
  categoryId: string
  format?: 'json' | 'csv'
  skip?: number
  take?: number
}

export interface ExportFeaturesResponse extends BaseResponse {
  result: object[] | string
}

export async function exportFeatures({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  categoryId,
  format = 'json',
  skip = 0,
  take = 10
}: ExportFeaturesRequest & BaseRequest): Promise<
  ExportFeaturesResponse | string
> {
  const fetch = await loadFetch()
  const url = new URL(
    `/api/collection/${collectionId}/features/export?categoryId=${categoryId}&format=${format}&skip=${skip}&take=${take}`,
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
    const response = (await payload.json()) as ExportFeaturesResponse
    return response
  } else {
    return await payload.text()
  }
}
