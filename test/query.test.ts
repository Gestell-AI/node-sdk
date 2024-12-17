import { describe, expect, test } from 'bun:test'
import Gestell from 'index'

const gestell = new Gestell()

describe('Collection', () => {
  let organizationId = ''
  let collectionId = ''
  let featureId = ''
  let tableId = ''

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
      type: 'canon',
      categories: [
        {
          name: 'Unga Bunga Features',
          type: 'features',
          instructions: 'Unga Bunga, Features, Unga Bunga'
        },
        {
          name: 'Unga Bunga Tables',
          type: 'table',
          instructions: 'Unga Bunga, Tables, Unga Bunga'
        }
      ]
    })

    expect(response.status).toEqual('OK')
    expect(response.id.length).toBeGreaterThan(1)
    collectionId = response.id
  })

  test('Retrieve Category IDs', async () => {
    const response = await gestell.collection.get(collectionId)
    expect(response.status).toEqual('OK')
    for (const category of response.result?.categories || []) {
      if (category.type === 'features') {
        featureId = category.id
      }
      if (category.type === 'table') {
        tableId = category.id
      }
    }
  })

  test('Query Search', async () => {
    const response = await gestell.collection.query.search(collectionId, {
      prompt: 'Unga Bunga, do not return anything, Unga Bunga',
      method: 'fast'
    })
    expect(response.status).toEqual('OK')
  })

  test('Query Prompt', async () => {
    const response = await gestell.collection.query.prompt(collectionId, {
      prompt: 'Unga Bunga, do not return anything, Unga Bunga',
      method: 'fast',
      cot: false,
      chat: false,
      threadId: ''
    })
    const stream = response.getReader()
    let result = ''

    while (true) {
      const { done, value } = await stream.read()
      if (done) break
      result += value // Append the chunk to the result
    }

    expect(result.length).toBeGreaterThan(1)
  })

  test('Query Features', async () => {
    const response = await gestell.collection.query.features(collectionId, {
      categoryId: featureId
    })
    expect(response.status).toEqual('OK')
  })

  test('Query Table', async () => {
    const response = await gestell.collection.query.table(collectionId, {
      categoryId: tableId
    })
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
