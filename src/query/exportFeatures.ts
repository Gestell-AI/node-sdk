import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import loadFetch from '@gestell/util/fetch'

export interface ExportFeaturesRequest {
  collectionId: string
  categoryId: string
  type?: 'json' | 'csv'
}

export interface ExportFeaturesResponse extends BaseResponse {
  result: object[]
}

export async function exportFeatures({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  categoryId,
  type = 'json'
}: ExportFeaturesRequest & BaseRequest): Promise<
  ExportFeaturesResponse | string
> {
  const fetch = await loadFetch()
  const url = new URL(
    `/api/collection/${collectionId}/features/export?categoryId=${categoryId}&type=${type}`,
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
    const response = (await payload.json()) as ExportFeaturesResponse
    return response
  } else {
    return await payload.text()
  }
}
