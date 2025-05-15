import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import { CategoryType } from '@gestell/types/collection'
import loadFetch from '@gestell/util/fetch'

/**
 * Request payload for adding a new category to a collection.
 */
export interface AddCategoryRequest {
  /** The ID of the collection to which the category will be added. */
  collectionId: string

  /** The display name of the category. */
  name: string

  /** The type of category. */
  type: CategoryType

  /** The instructions or description for this category. */
  instructions: string

  /** If true, only a single entry is allowed in this category. */
  singleEntry?: boolean
}

/**
 * Response returned after adding a category.
 */
export interface AddCategoryResponse extends BaseResponse {
  /** The ID of the newly created category. */
  id: string
}

export async function addCategory({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  name,
  type,
  instructions,
  singleEntry = false
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
      instructions,
      singleEntry
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
