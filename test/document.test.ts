import { afterAll, describe, expect, test } from 'bun:test'
import { createReadStream, readFileSync } from 'fs'
import { join } from 'path'
import Gestell from '@gestell/index'

const gestell = new Gestell()
const organizationId = process.env.ORGANIZATION_ID || ''

if (!organizationId) {
  console.error('Please create an organization first')
  process.exit()
}

describe('Document', () => {
  let colDeleted = false
  let docDeleted = false
  let collectionId = ''
  let documentId = ''

  test('Create Test Collection', async () => {
    const response = await gestell.collection.create({
      organizationId,
      name: 'Automated Document Collection',
      description: 'An automated document collection',
      type: 'frame'
    })

    expect(response.status).toEqual('OK')
    expect(response.id.length).toBeGreaterThan(1)
    collectionId = response.id
  })

  test('Presign, Upload and Create Document', async () => {
    const { default: fetch } = await import('node-fetch')

    const { status, path, url } = await gestell.document.presign({
      collectionId,
      type: 'image/jpeg',
      filename: 'sample.jpg'
    })
    expect(status).toEqual('OK')

    await fetch(url, {
      method: 'PUT',
      headers: {
        ContentType: 'image/jpeg'
      },
      body: createReadStream(join(process.cwd(), 'test', 'sample.jpg'))
    })

    const response = await gestell.document.create({
      collectionId,
      name: 'sample.jpg',
      path,
      type: 'image/jpeg'
    })

    expect(response.status).toEqual('OK')
    documentId = response.id
  })

  test('Upload Document as Buffer and String', async () => {
    const file = join(process.cwd(), 'test', 'sample.jpg')

    const response = await gestell.document.upload({
      collectionId,
      name: 'sample-2.jpg',
      file
    })

    expect(response.status).toEqual('OK')

    await gestell.document.delete({
      collectionId,
      documentId: response.id
    })

    const response2 = await gestell.document.upload({
      collectionId,
      name: 'sample-2.jpg',
      type: 'image/jpeg',
      file: readFileSync(file)
    })

    expect(response2.status).toEqual('OK')

    await gestell.document.delete({
      collectionId,
      documentId: response2.id
    })
  })

  test('Update', async () => {
    const response = await gestell.document.update({
      collectionId,
      documentId,
      name: 'sample-updated.jpg'
    })
    expect(response.status).toEqual('OK')
  })

  test('Get', async () => {
    const response = await gestell.document.get({ collectionId, documentId })
    expect(response.status).toEqual('OK')
  })

  test('Get Document Job', async () => {
    const response = await gestell.job.get({ collectionId, documentId })
    expect(response.status).toEqual('OK')
  })

  test('Reprocess Document Job', async () => {
    const response = await gestell.job.reprocess({
      collectionId,
      type: 'status',
      ids: [documentId]
    })
    expect(response.status).toEqual('OK')
  })

  test('Cancel Document Job', async () => {
    const response = await gestell.job.cancel({
      collectionId,
      ids: [documentId]
    })
    expect(response.status).toEqual('OK')
  })

  test('Delete Test Document', async () => {
    const response = await gestell.document.delete({ collectionId, documentId })
    docDeleted = true
    expect(response.status).toEqual('OK')
  })

  test('Delete Test Collection', async () => {
    const response = await gestell.collection.delete(collectionId)
    colDeleted = true
    expect(response.status).toEqual('OK')
  })

  afterAll(async () => {
    if (collectionId && documentId && docDeleted === false) {
      try {
        await gestell.document.delete({ collectionId, documentId })
      } catch (error) {
        console.error(error)
      }
    }
    if (collectionId && colDeleted === false) {
      try {
        await gestell.collection.delete(collectionId)
      } catch (error) {
        console.error(error)
      }
    }
  })
})
