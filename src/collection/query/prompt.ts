import type { BaseRequest } from 'types/base'
import { PromptPayload, QueryKV } from 'types/query'
import loadFetch from 'util/fetch'

export interface PromptQueryRequestToApi extends PromptPayload {
  id: string
}

export async function promptQuery({
  apiKey,
  apiUrl,
  debug,
  id,
  categoryId = '',
  prompt,
  method = 'normal',
  type = QueryKV[method].type,
  vectorDepth = QueryKV[method].vectorDepth,
  nodeDepth = QueryKV[method].nodeDepth,
  maxQueries = QueryKV[method].maxQueries,
  maxResults = QueryKV[method].maxResults,
  template = '',
  cot = true,
  threadId = '',
  chat = false
}: PromptQueryRequestToApi & BaseRequest): Promise<ReadableStream<string>> {
  const fetch = await loadFetch()
  const url = new URL(`/api/collection/${id}/prompt`, apiUrl)

  const payload = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `BEARER ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      categoryId,
      prompt,
      method,
      type,
      vectorDepth,
      nodeDepth,
      maxQueries,
      maxResults,
      template,
      cot,
      threadId,
      chat
    })
  })

  if (!payload.body) {
    return new ReadableStream<string>({
      async start(controller) {
        controller.enqueue('Error prompting the collection')
        controller.close()
      }
    })
  }

  const decoder = new TextDecoder()

  return new ReadableStream<string>({
    async start(controller) {
      if (typeof window !== 'undefined') {
        try {
          const reader = payload.body?.getReader()
          if (!reader) {
            throw new Error('The response body is not streamable')
          }

          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            controller.enqueue(decoder.decode(value))
          }
          controller.close()
        } catch (error) {
          controller.error(error)
          if (debug) {
            console.error('Stream processing error:', error)
          }
        }
      } else {
        const nodeReadableStream =
          payload.body as unknown as NodeJS.ReadableStream

        nodeReadableStream.on('data', (chunk) => {
          controller.enqueue(decoder.decode(chunk))
        })
        nodeReadableStream.on('end', () => {
          controller.close()
        })
        nodeReadableStream.on('error', (error) => {
          controller.error(error)
          if (debug) {
            console.error('Stream processing error:', error)
          }
        })
      }
    }
  })
}
