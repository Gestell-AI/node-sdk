import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import { CreateCategoryPayload } from '@gestell/types/category'
import { CollectionType } from '@gestell/types/collection'
import loadFetch from '@gestell/util/fetch'

export interface CreateCollectionRequest {
  organizationId: string
  name: string
  type: CollectionType
  tags?: string[]
  description?: string
  instructions?: string
  graphInstructions?: string
  promptInstructions?: string
  searchInstructions?: string
  categories?: CreateCategoryPayload[]
}

export interface CreateCollectionResponse extends BaseResponse {
  id: string
}

export async function createCollection({
  apiKey,
  apiUrl,
  debug,
  organizationId,
  name,
  description,
  type,
  instructions,
  graphInstructions,
  promptInstructions,
  searchInstructions,
  categories
}: CreateCollectionRequest & BaseRequest): Promise<CreateCollectionResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/collection`, apiUrl)

  const payload = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `BEARER ${apiKey}`
    },
    body: JSON.stringify({
      organizationId,
      name,
      description,
      type,
      instructions,
      graphInstructions,
      promptInstructions,
      searchInstructions,
      categories
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
        errorResponse?.message || 'There was an error creating a collection',
      id: ''
    }
  }

  const response = (await payload.json()) as CreateCollectionResponse

  return response
}
