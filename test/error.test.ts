import { describe, expect, test } from 'bun:test'
import Gestell from '@gestell/index'

const gestell = new Gestell({
  key: 'INVALID KEY',
  debug: true
})

describe('Error', () => {
  test('organization.get', async () => {
    const response = await gestell.organization.get('...')
    expect(response.status).toBe('ERROR')
  })

  test('organization.list', async () => {
    const response = await gestell.organization.list()
    expect(response.status).toBe('ERROR')
  })

  test('organization.update', async () => {
    const response = await gestell.organization.update({
      organizationId: '...',
      name: '...',
      description: '...'
    })
    expect(response.status).toBe('ERROR')
  })

  test('organization.create', async () => {
    const response = await gestell.organization.create({
      name: '...',
      description: '...'
    })
    expect(response.status).toBe('ERROR')
  })

  test('organization.addMembers', async () => {
    const response = await gestell.organization.addMembers({
      organizationId: '...',
      members: []
    })
    expect(response.status).toBe('ERROR')
  })

  test('organization.removeMembers', async () => {
    const response = await gestell.organization.removeMembers({
      organizationId: '...',
      members: []
    })
    expect(response.status).toBe('ERROR')
  })

  test('organization.delete', async () => {
    const response = await gestell.organization.delete('...')
    expect(response.status).toBe('ERROR')
  })

  test('collection.get', async () => {
    const response = await gestell.collection.get('...')
    expect(response.status).toBe('ERROR')
  })

  test('collection.list', async () => {
    const response = await gestell.collection.list()
    expect(response.status).toBe('ERROR')
  })

  test('collection.create', async () => {
    const response = await gestell.collection.create({
      organizationId: '...',
      name: '...',
      description: '...',
      type: 'canon'
    })
    expect(response.status).toBe('ERROR')
  })

  test('collection.update', async () => {
    const response = await gestell.collection.update({
      collectionId: '...',
      name: '...'
    })
    expect(response.status).toBe('ERROR')
  })

  test('collection.addCategory', async () => {
    const response = await gestell.collection.addCategory({
      collectionId: '...',
      name: '...',
      type: 'concepts',
      instructions: '...'
    })
    expect(response.status).toBe('ERROR')
  })

  test('collection.updateCategory', async () => {
    const response = await gestell.collection.updateCategory({
      collectionId: '...',
      categoryId: '...',
      name: '...',
      type: 'concepts',
      instructions: '...'
    })
    expect(response.status).toBe('ERROR')
  })

  test('collection.removeCategory', async () => {
    const response = await gestell.collection.removeCategory({
      collectionId: '...',
      categoryId: '...'
    })
    expect(response.status).toBe('ERROR')
  })

  test('collection.delete', async () => {
    const response = await gestell.collection.delete('...')
    expect(response.status).toBe('ERROR')
  })

  test('collection.query.search', async () => {
    const response = await gestell.query.search({
      collectionId: '...',
      prompt: '...'
    })
    expect(response.status).toBe('ERROR')
  })

  test('collection.query.prompt', async () => {
    const response = await gestell.query.prompt({
      collectionId: '...',
      prompt: '...'
    })
    const stream = response.getReader()
    let result = ''

    while (true) {
      const { done, value } = await stream.read()
      if (done) break
      result += value // Append the chunk to the result
    }

    expect(result).toBe('Invalid token')
  })

  test('collection.query.table', async () => {
    const response = await gestell.query.table({
      collectionId: '...',
      categoryId: '...'
    })
    expect(response.status).toBe('ERROR')
  })

  test('collection.query.features', async () => {
    const response = await gestell.query.features({
      collectionId: '...',
      categoryId: '...'
    })
    expect(response.status).toBe('ERROR')
  })

  test('collection.job.get', async () => {
    const response = await gestell.job.get({
      collectionId: '...',
      jobId: '...'
    })
    expect(response.status).toBe('ERROR')
  })

  test('collection.job.list', async () => {
    const response = await gestell.job.list({ collectionId: '...' })
    expect(response.status).toBe('ERROR')
  })

  test('collection.job.reprocess', async () => {
    const response = await gestell.job.reprocess({
      collectionId: '...',
      type: 'status',
      ids: []
    })
    expect(response.status).toBe('ERROR')
  })

  test('collection.job.cancel', async () => {
    const response = await gestell.job.cancel({
      collectionId: '...',
      ids: []
    })
    expect(response.status).toBe('ERROR')
  })

  test('collection.document.get', async () => {
    const response = await gestell.document.get({
      collectionId: '...',
      documentId: '...'
    })
    expect(response.status).toBe('ERROR')
  })

  test('collection.document.list', async () => {
    const response = await gestell.document.list({
      collectionId: '...'
    })
    expect(response.status).toBe('ERROR')
  })

  test('collection.document.presign', async () => {
    const response = await gestell.document.presign({
      collectionId: '...',
      type: '...',
      filename: '...'
    })
    expect(response.status).toBe('ERROR')
  })

  test('collection.document.create', async () => {
    const response = await gestell.document.create({
      collectionId: '...',
      type: '...',
      name: '...',
      path: '...'
    })
    expect(response.status).toBe('ERROR')
  })

  test('collection.document.upload', async () => {
    const response = await gestell.document.upload({
      collectionId: '...',
      type: '...',
      name: '...',
      file: '...'
    })
    expect(response.status).toBe('ERROR')
  })

  test('collection.document.update', async () => {
    const response = await gestell.document.update({
      collectionId: '...',
      documentId: '...',
      name: '...'
    })
    expect(response.status).toBe('ERROR')
  })

  test('collection.document.delete', async () => {
    const response = await gestell.document.delete({
      collectionId: '...',
      documentId: '...'
    })
    expect(response.status).toBe('ERROR')
  })
})
