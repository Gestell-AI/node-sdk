import { Category } from '@gestell/types/category'
import { Document } from '@gestell/types/document'
import { Organization } from '@gestell/types/organization'

export type CollectionType = 'frame' | 'searchable-frame' | 'canon' | 'features'

export interface Collection {
  id: string
  organizationId: string
  organization: Organization
  name: string
  type: CollectionType
  description: string
  tags: string[]
  instructions?: string
  graphInstructions?: string
  promptInstructions?: string
  searchInstructions?: string
  categories?: Category[]
  documents?: Document[]
  dateCreated: string
  dateUpdated: string
}

export interface CollectionStats {
  docs: number
  size: number
  nodes: number
  status: {
    documents: number
    nodes: number
    edges: number
    vectors: number
    category: number
  }
}
