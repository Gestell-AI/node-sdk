import mime from 'mime-types'
import { createDocument } from '@gestell/document/create'
import { presignDocument } from '@gestell/document/presign'
import type { BaseRequest, BaseResponse } from '@gestell/types/base'

/**
 * Request parameters for uploading a document to a collection.
 */
export interface UploadDocumentRequest {
  /** ID of the collection to upload the document to */
  collectionId: string
  /** Name of the document */
  name: string
  /** Optional MIME type; auto-detected if not provided */
  type?: string
  /** File content as path, Buffer, or File */
  file: string | Buffer | File
  /** Optional instructions for the upload */
  instructions?: string
  /** Whether to process upload as a background job */
  job?: boolean
  /** Whether to include tables in the document */
  tables?: boolean
}

/**
 * Response data from a document upload operation.
 */
export interface UploadDocumentResponse extends BaseResponse {
  /** ID of the newly uploaded document */
  id: string
}

export async function uploadDocument({
  apiKey,
  apiUrl,
  debug,
  collectionId,
  name,
  file,
  type,
  instructions = '',
  job = true,
  tables = false
}: UploadDocumentRequest & BaseRequest): Promise<UploadDocumentResponse> {
  const fileType =
    type ||
    (file instanceof File ? file.type : mime.lookup(file as string)) ||
    'text/plain'

  const { status, message, path, url } = await presignDocument({
    apiKey,
    apiUrl,
    debug,
    collectionId,
    type: fileType,
    filename: name
  })

  if (status !== 'OK') {
    return {
      status,
      message,
      id: ''
    }
  }

  if (typeof file === 'string' || file instanceof Buffer) {
    const { default: fetch } = await import('node-fetch')
    const { readFileSync } = await import('node:fs')
    if (typeof file === 'string') {
      try {
        const upload = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': fileType || 'application/octet-stream'
          },
          body: readFileSync(file)
        })
        if (!upload.ok) {
          console.log(await upload.text())
          return {
            status: 'ERROR',
            message:
              'Error uploading document, failed to upload to the presigned url',
            id: ''
          }
        }
      } catch {
        return {
          status: 'ERROR',
          message: 'Error uploading document',
          id: ''
        }
      }
    } else {
      try {
        const upload = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': fileType || 'application/octet-stream'
          },
          body: file
        })
        if (!upload.ok) {
          return {
            status: 'ERROR',
            message:
              'Error uploading document, failed to upload to the presigned url',
            id: ''
          }
        }
      } catch {
        return {
          status: 'ERROR',
          message: 'Error uploading document',
          id: ''
        }
      }
    }
  } else if (typeof window !== 'undefined' && file instanceof File) {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const upload = await fetch(url, {
        method: 'PUT',
        body: formData as unknown as undefined //This is a workaround. FormData is the correct type, but typescript doesn't know this
      })
      if (!upload.ok) {
        return {
          status: 'ERROR',
          message:
            'Error uploading document, failed to upload to the presigned url',
          id: ''
        }
      }
    } catch {
      return {
        status: 'ERROR',
        message: 'Error uploading document',
        id: ''
      }
    }
  } else {
    return {
      status: 'ERROR',
      message:
        'Invalid file type provided, must be a string (path), Buffer (Node) or a File (Client).',
      id: ''
    }
  }

  return (await createDocument({
    apiKey,
    apiUrl,
    debug,
    collectionId,
    name,
    path,
    type: fileType,
    instructions,
    job,
    tables
  })) as UploadDocumentResponse
}
