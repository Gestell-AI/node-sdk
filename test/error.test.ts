import { describe, expect, test } from 'bun:test'
import Gestell from 'index'

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
      id: '...',
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
      id: '...',
      members: []
    })
    expect(response.status).toBe('ERROR')
  })

  test('organization.removeMembers', async () => {
    const response = await gestell.organization.removeMembers({
      id: '...',
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
      id: '...',
      name: '...'
    })
    expect(response.status).toBe('ERROR')
  })

  test('collection.delete', async () => {
    const response = await gestell.collection.delete('...')
    expect(response.status).toBe('ERROR')
  })

  test('collection.query.search', async () => {
    const response = await gestell.collection.query.search('...', {
      prompt: '...'
    })
    expect(response.status).toBe('ERROR')
  })

  test('collection.query.prompt', async () => {
    const response = await gestell.collection.query.prompt('...', {
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
    const response = await gestell.collection.query.table('...', {
      categoryId: '...'
    })
    expect(response.status).toBe('ERROR')
  })

  test('collection.query.features', async () => {
    const response = await gestell.collection.query.features('...', {
      categoryId: '...'
    })
    expect(response.status).toBe('ERROR')
  })

  test('collection.job.get', async () => {
    const response = await gestell.collection.job.get('...', '...')
    expect(response.status).toBe('ERROR')
  })

  test('collection.job.list', async () => {
    const response = await gestell.collection.job.list('...')
    expect(response.status).toBe('ERROR')
  })

  test('collection.job.reprocess', async () => {
    const response = await gestell.collection.job.reprocess('...', {
      type: 'status',
      ids: []
    })
    expect(response.status).toBe('ERROR')
  })

  test('collection.job.cancel', async () => {
    const response = await gestell.collection.job.cancel('...', [])
    expect(response.status).toBe('ERROR')
  })

  test('collection.document.get', async () => {
    const response = await gestell.collection.document.get('...', '...')
    expect(response.status).toBe('ERROR')
  })

  test('collection.document.list', async () => {
    const response = await gestell.collection.document.list('...')
    expect(response.status).toBe('ERROR')
  })

  test('collection.document.presign', async () => {
    const response = await gestell.collection.document.presign('...', {
      type: '...',
      filename: '...'
    })
    expect(response.status).toBe('ERROR')
  })

  test('collection.document.create', async () => {
    const response = await gestell.collection.document.create('...', {
      type: '...',
      name: '...',
      path: '...'
    })
    expect(response.status).toBe('ERROR')
  })

  test('collection.document.update', async () => {
    const response = await gestell.collection.document.update('...', '...', {
      name: '...'
    })
    expect(response.status).toBe('ERROR')
  })

  test('collection.document.delete', async () => {
    const response = await gestell.collection.document.delete('...', '...')
    expect(response.status).toBe('ERROR')
  })
})
