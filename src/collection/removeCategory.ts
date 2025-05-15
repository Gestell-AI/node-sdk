import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import loadFetch from '@gestell/util/fetch'

/**
 * Request payload for removing a category from a collection.
 */
export interface RemoveCategoryRequest {
  /** The ID of the collection containing the category. */
  collectionId: string
  /** The ID of the category to be removed. */
  categoryId: string
}

/**
 * Response returned after removing a category.
 * Inherits standard response fields from BaseResponse.
 */
export type RemoveCategoryResponse = BaseResponse

export async function removeCategory({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  categoryId
}: RemoveCategoryRequest & BaseRequest): Promise<RemoveCategoryResponse> {
  const fetch = await loadFetch()
  const url = new URL(
    `/api/collection/${collectionId}/category/${categoryId}`,
    apiUrl
  )

  const payload = await fetch(url, {
    method: 'DELETE',
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
        errorResponse?.message || 'There was an error removing the category'
    }
  }

  const response = (await payload.json()) as RemoveCategoryResponse

  return response
}
