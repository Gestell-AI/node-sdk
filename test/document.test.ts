import { describe, expect, test } from 'bun:test'
import { createReadStream } from 'fs'
import Gestell from 'index'
import { join } from 'path'

const gestell = new Gestell()

describe('Document', () => {
  let organizationId = ''
  let collectionId = ''
  let documentId = ''
  let jobId = ''

  test('Create Test Organization', async () => {
    const response = await gestell.organization.create({
      name: 'Automated Test Organization',
      description: 'This is an automated test organization'
    })
    expect(response.status).toEqual('OK')
    expect(response.id.length).toBeGreaterThan(1)
    organizationId = response.id
  })

  test('Create Test Collection', async () => {
    const response = await gestell.collection.create({
      organizationId,
      name: 'Automated Test Collection',
      description: 'An automated test collection',
      type: 'frame'
    })

    expect(response.status).toEqual('OK')
    expect(response.id.length).toBeGreaterThan(1)
    collectionId = response.id
  })

  test('Presign, Upload and Create Document', async () => {
    const { default: fetch } = await import('node-fetch')

    const { status, path, url } = await gestell.collection.document.presign(
      collectionId,
      {
        type: 'image/jpeg',
        filename: 'sample.jpg'
      }
    )
    expect(status).toEqual('OK')

    await fetch(url, {
      method: 'PUT',
      headers: {
        ContentType: 'image/jpeg'
      },
      body: createReadStream(join(process.cwd(), 'test', 'sample.jpg'))
    })

    const response = await gestell.collection.document.create(collectionId, {
      name: 'sample.jpg',
      path,
      type: 'image/jpeg'
    })

    expect(response.status).toEqual('OK')
    documentId = response.id
  })

  test('Update', async () => {
    const response = await gestell.collection.document.update(
      collectionId,
      documentId,
      {
        name: 'sample-updated.jpg'
      }
    )
    expect(response.status).toEqual('OK')
  })

  test('Get', async () => {
    const response = await gestell.collection.document.get(
      collectionId,
      documentId
    )
    expect(response.status).toEqual('OK')
    jobId = response.result?.job?.id || ''
  })

  test('Get Document Job', async () => {
    const response = await gestell.collection.job.get(collectionId, jobId)
    expect(response.status).toEqual('OK')
  })

  test('Reprocess Document Job', async () => {
    const response = await gestell.collection.job.reprocess(collectionId, {
      type: 'status',
      ids: [jobId]
    })
    expect(response.status).toEqual('OK')
  })

  test('Cancel Document Job', async () => {
    const response = await gestell.collection.job.cancel(collectionId, [jobId])
    expect(response.status).toEqual('OK')
  })

  test('Delete', async () => {
    const response = await gestell.collection.document.delete(
      collectionId,
      documentId
    )
    expect(response.status).toEqual('OK')
  })

  test('Delete Test Collection', async () => {
    const response = await gestell.collection.delete(collectionId)
    expect(response.status).toEqual('OK')
  })

  test('Delete Test Organization', async () => {
    const response = await gestell.organization.delete(organizationId)
    expect(response.status).toEqual('OK')
  })
})
