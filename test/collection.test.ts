import { describe, expect, test } from 'bun:test'
import Gestell from 'index'

const gestell = new Gestell()

describe('Collection', () => {
  let organizationId = ''
  let collectionId = ''

  test('Create Test Organization', async () => {
    const response = await gestell.organization.create({
      name: 'Automated Test Organization',
      description: 'This is an automated test organization'
    })
    expect(response.status).toEqual('OK')
    expect(response.id.length).toBeGreaterThan(1)
    organizationId = response.id
  })

  test('Create', async () => {
    const response = await gestell.collection.create({
      organizationId,
      name: 'Automated Test Collection',
      description: 'An automated test collection',
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
      id: collectionId,
      name: 'Automated Test Collection updated',
      description: 'An automated test collection updated'
    })
    expect(response.status).toEqual('OK')
  })

  test('Delete', async () => {
    const response = await gestell.collection.delete(collectionId)
    expect(response.status).toEqual('OK')
  })

  test('Delete Test Organization', async () => {
    const response = await gestell.organization.delete(organizationId)
    expect(response.status).toEqual('OK')
  })
})
