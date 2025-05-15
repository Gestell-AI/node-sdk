import type { BaseRequest, BaseResponse } from '@gestell/types/base'
import { Document } from '@gestell/types/document'
import { JobStatus } from '@gestell/types/job'
import loadFetch from '@gestell/util/fetch'

/**
 * Payload for requesting multiple documents from a specific collection,
 * with support for pagination, filtering, and optional extended data.
 *
 * @interface GetDocumentsRequest
 */
export interface GetDocumentsRequest {
  /**
   * The unique identifier of the collection to query.
   */
  collectionId: string

  /**
   * Optional text to search within document content or metadata.
   */
  search?: string

  /**
   * Maximum number of documents to return.
   * Useful for paging through large result sets.
   */
  take?: number

  /**
   * Number of documents to skip before starting to collect the result set.
   * Useful for paging (e.g., skip = pageIndex * take).
   */
  skip?: number

  /**
   * Whether to include extended document data (metadata and layout).
   */
  extended?: boolean

  /**
   * Filter documents by overall enframing states.
   */
  status?: JobStatus

  /**
   * Filter by the status of the nodes indexing stage.
   */
  nodes?: JobStatus

  /**
   * Filter by the status of the edges graph-building stage.
   */
  edges?: JobStatus

  /**
   * Filter by the status of the vector generation stage.
   */
  vectors?: JobStatus

  /**
   * Filter by the status of the category generation stage.
   */
  category?: JobStatus
}

/**
 * Response data from a document listing operation.
 * Extends the base response with an array of documents.
 */
export interface GetDocumentsResponse extends BaseResponse {
  /** Array of document objects matching the query */
  result: Document[]
}

export async function getDocuments({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  search = '',
  take = 10,
  skip = 0,
  extended = false,
  status = 'all',
  nodes = 'all',
  edges = 'all',
  vectors = 'all',
  category = 'all'
}: GetDocumentsRequest & BaseRequest): Promise<GetDocumentsResponse> {
  const fetch = await loadFetch()
  const url = new URL(`/api/collection/${collectionId}/document`, apiUrl)

  url.searchParams.set('search', search)
  url.searchParams.set('take', take.toString())
  url.searchParams.set('skip', skip.toString())
  url.searchParams.set('extended', extended.toString())
  url.searchParams.set('status', status)
  url.searchParams.set('nodes', nodes)
  url.searchParams.set('edges', edges)
  url.searchParams.set('vectors', vectors)
  url.searchParams.set('category', category)

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
        errorResponse?.message || 'There was an error retrieving documents',
      result: []
    }
  }

  const response = (await payload.json()) as GetDocumentsResponse

  return response
}
