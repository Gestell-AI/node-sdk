import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import { CollectionType } from '@gestell/types/collection'
import loadFetch from '@gestell/util/fetch'

export interface UpdateCollectionRequest {
  collectionId: string
  organizationId?: string
  name?: string
  type?: CollectionType
  description?: string
  instructions?: string
  graphInstructions?: string
  promptInstructions?: string
  searchInstructions?: string
  tags?: string[]
}

export interface UpdateCollectionResponse extends BaseResponse {
  id: string
}

export async function updateCollection({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  organizationId,
  name,
  type,
  description,
  instructions,
  graphInstructions,
  promptInstructions,
  searchInstructions,
  tags
}: UpdateCollectionRequest & BaseRequest): Promise<UpdateCollectionResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/collection/${collectionId}`, apiUrl)

  const payload = await fetch(url, {
    method: 'PATCH',
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
      tags
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
        errorResponse?.message || 'There was an error creating the collection',
      id: ''
    }
  }

  const response = (await payload.json()) as UpdateCollectionResponse

  return response
}
