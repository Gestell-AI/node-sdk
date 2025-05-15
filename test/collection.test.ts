import { afterAll, describe, expect, test } from 'bun:test'
import Gestell from '@gestell/index'

export const gestell = new Gestell()
const organizationId = process.env.ORGANIZATION_ID || ''

if (!organizationId) {
  console.error('Please create an organization first')
  process.exit()
}

describe('Collection', () => {
  let deleted = false
  let collectionId = ''
  let categoryId = ''

  test('Create', async () => {
    const response = await gestell.collection.create({
      organizationId,
      name: 'Automated Collection',
      description: 'An automated collection',
      type: 'canon'
    })

    expect(response.status).toEqual('OK')
    expect(response.id.length).toBeGreaterThan(1)
    collectionId = response.id
  })

  test('List', async () => {
    const response = await gestell.collection.list()
    expect(response.status).toEqual('OK')
  })

  test('List with skip', async () => {
    const response = await gestell.collection.list({
      skip: 1000,
      take: 0
    })
    expect(response.status).toEqual('OK')
    expect(response.result.length).toBe(0)
  })

  test('List with Search', async () => {
    const response = await gestell.collection.list({
      search: 'Unga Bunga 42 42'
    })
    expect(response.status).toEqual('OK')
    expect(response.result.length).toBe(0)
  })

  test('Get', async () => {
    const response = await gestell.collection.get(collectionId)
    expect(response.status).toEqual('OK')
  })

  test('Update', async () => {
    const response = await gestell.collection.update({
      collectionId,
      name: 'Automated Test Collection updated',
      description: 'An automated test collection updated'
    })
    expect(response.status).toEqual('OK')
  })

  test('Add Category', async () => {
    const response = await gestell.collection.addCategory({
      collectionId,
      name: 'Automated Test Category',
      type: 'concepts',
      instructions: 'Hello World'
    })
    expect(response.status).toEqual('OK')
    categoryId = response.id
    expect(categoryId.length).toBeGreaterThan(1)
  })

  test('Update Category', async () => {
    const response = await gestell.collection.updateCategory({
      collectionId,
      categoryId,
      name: 'Automated Test Category Update',
      instructions: 'Hello World Update'
    })
    expect(response.status).toEqual('OK')
  })

  test('Remove Category', async () => {
    const response = await gestell.collection.removeCategory({
      collectionId,
      categoryId
    })
    expect(response.status).toEqual('OK')
  })

  test('Delete', async () => {
    const response = await gestell.collection.delete(collectionId)
    deleted = true
    expect(response.status).toEqual('OK')
  })

  afterAll(async () => {
    if (collectionId && deleted === false) {
      try {
        await gestell.collection.delete(collectionId)
      } catch (error) {
        console.error(error)
      }
    }
  })
})
