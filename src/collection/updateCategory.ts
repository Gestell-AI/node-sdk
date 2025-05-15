import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import { CategoryType } from '@gestell/types/collection'
import loadFetch from '@gestell/util/fetch'

/**
 * Request payload for updating a category within a collection.
 */
export interface UpdateCategoryRequest {
  /** The ID of the collection containing the category. */
  collectionId: string
  /** The ID of the category to update. */
  categoryId: string
  /** The new display name for the category. */
  name?: string
  /** The type of category. */
  type?: CategoryType
  /** The instructions or description for this category. */
  instructions?: string
  /** If true, only a single entry is allowed in this category. */
  singleEntry?: boolean
}

/**
 * Response returned after updating a category.
 * Inherits standard response fields from BaseResponse.
 */
export type UpdateCategoryResponse = BaseResponse

export async function updateCategory({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  categoryId,
  name,
  type,
  instructions,
  singleEntry
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
        errorResponse?.message || 'There was an error updating the category'
    }
  }

  const response = (await payload.json()) as UpdateCategoryResponse

  return response
}
