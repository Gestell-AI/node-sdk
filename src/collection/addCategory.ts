import type { BaseRequest, BaseResponse } from 'types/base'
import { CategoryType } from 'types/category'
import loadFetch from 'util/fetch'

export interface AddCategoryRequest {
  collectionId: string
  name: string
  type: CategoryType
  instructions: string
}

export interface AddCategoryResponse extends BaseResponse {
  id: string
}

export async function addCategory({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  name,
  type,
  instructions
}: AddCategoryRequest & BaseRequest): Promise<AddCategoryResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/collection/${collectionId}/category`, apiUrl)

  const payload = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `BEARER ${apiKey}`
    },
    body: JSON.stringify({
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
        errorResponse?.message || 'There was an error creating a category',
      id: ''
    }
  }

  const response = (await payload.json()) as AddCategoryResponse

  return response
}
