import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import {
  CollectionType,
  CreateCategoryPayload,
  PiiIdentifierOption
} from '@gestell/types/collection'
import loadFetch from '@gestell/util/fetch'

/**
 * Request payload for creating a new collection.
 */
export interface CreateCollectionRequest {
  /** The ID of the organization that will own this collection. */
  organizationId: string

  /** The display name for the collection. */
  name: string

  /** The type of collection being created. */
  type: CollectionType

  /** Optional tags to categorize the collection. */
  tags?: string[]

  /** A description of the collection's purpose or contents. */
  description?: string

  /** Indicates if the collection contains Personally Identifiable Information. */
  pii?: boolean

  /** Configuration for PII identification and handling. */
  piiControls?: PiiIdentifierOption[]

  /** General instructions for processing this collection. */
  instructions?: string

  /** Specific instructions for graph operations involving this collection. */
  graphInstructions?: string

  /** Instructions for prompt generation using this collection. */
  promptInstructions?: string

  /** Instructions for search operations within this collection. */
  searchInstructions?: string

  /** Initial set of categories to create within this collection. */
  categories?: CreateCategoryPayload[]
}

/**
 * Response returned after creating a collection.
 */
export interface CreateCollectionResponse extends BaseResponse {
  /** The ID of the newly created collection. */
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
  tags,
  pii,
  piiControls,
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
      tags,
      pii,
      piiControls,
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
