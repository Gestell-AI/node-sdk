import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import { CategoryType } from '@gestell/types/category'
import loadFetch from '@gestell/util/fetch'

export interface UpdateCategoryRequest {
  collectionId: string
  categoryId: string
  name?: string
  type?: CategoryType
  instructions?: string
}

export type UpdateCategoryResponse = BaseResponse

export async function updateCategory({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  categoryId,
  name,
  type,
  instructions
}: UpdateCategoryRequest & BaseRequest): Promise<UpdateCategoryResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/collection/${collectionId}/category`, apiUrl)

  const payload = await fetch(url, {
    method: 'PATCH',
    headers: {
      Authorization: `BEARER ${apiKey}`
    },
    body: JSON.stringify({
      categoryId,
      name,
      type,
      instructions
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
        errorResponse?.message || 'There was an error updating the category'
    }
  }

  const response = (await payload.json()) as UpdateCategoryResponse

  return response
}
