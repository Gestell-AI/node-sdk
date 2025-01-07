import { describe, expect, test } from 'bun:test'
import Gestell from '@gestell/index'

const gestell = new Gestell()
const organizationId = process.env.ORGANIZATION_ID || ''

if (!organizationId) {
  console.error('Please create an organization first')
  process.exit()
}

describe('Organization', () => {
  test('Get', async () => {
    const response = await gestell.organization.get(organizationId)
    expect(response.status).toEqual('OK')
  })

  test('List', async () => {
    const response = await gestell.organization.list()
    expect(response.status).toEqual('OK')
    expect(response.result.length).toBeGreaterThan(0)
  })

  test('List with Skip', async () => {
    const response = await gestell.organization.list({
      skip: 100,
      take: 0
    })
    expect(response.status).toEqual('OK')
    expect(response.result.length).toBe(0)
  })

  test('List with Search', async () => {
    const response = await gestell.organization.list({
      search: 'Unga Bunga 42 42'
    })
    expect(response.status).toEqual('OK')
    expect(response.result.length).toBe(0)
  })

  test('Update', async () => {
    const response = await gestell.organization.update({
      organizationId,
      name: 'Automated Test Organization Updated',
      description: 'This is an automated test organization updated'
    })

    expect(response.status).toBe('OK')
  })

  test('Add Member', async () => {
    const response = await gestell.organization.addMembers({
      organizationId,
      members: [
        {
          id: 'test@chriscates.ca',
          role: 'member'
        }
      ]
    })
    expect(response.status).toBe('OK')
  })

  test('Remove Member', async () => {
    const response = await gestell.organization.removeMembers({
      organizationId,
      members: ['test@chriscates.ca']
    })
    expect(response.status).toBe('OK')
  })
})
