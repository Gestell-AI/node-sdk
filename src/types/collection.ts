import { OrganizationListResult } from '@gestell/types/organization'

/**
 * Supported collection types to choose from
 */
export type CollectionType =
  | /** frame: When you only want the OCR outputs. */ 'frame'
  | /** searchable-frame: Lighter version of canonized collections that are for search based reasoning. */ 'searchable-frame'
  | /** canon: Complete canonized collection that has the best search based reasoning capabilities. */ 'canon'
  | /** features: Specialized collection for category extractions of content. */ 'features'

/**
 * Classification of PII/PHI, select the one model and type most optimal for your use case
 */
export type PiiType =
  | /** Standard personal data without specialized legal or health context. */ 'generic'
  | /** Information with legal or regulatory implications (e.g., SSN, license numbers). */ 'legal'
  | /** Protected health information subject to medical privacy regulations. */ 'medical'

/**
 * Supported categories for organizing content in collections.
 */
export type CategoryType =
  | /** Filter content based on the category instructions */ 'content'
  | /** Conceputalized versions of content. Useful for read heavy contexts */ 'concepts'
  | /** Feature extraction of labels. */ 'features'
  | /** Structured tabular data with rows and columns. */ 'table'

/**
 * A list of all supported Personally Identifiable Information (PII)
 * and Protected Health Information (PHI) labels used across validation,
 * redaction, compliance checks.
 */
export const PII_IDENTIFIER_OPTIONS: PiiIdentifierOption[] = [
  'Name',
  'Geographic Data',
  'Dates',
  'Phone Number',
  'Fax Number',
  'Email Address',
  'Social Security Number',
  'Medical Record Number',
  'Health Plan Beneficiary Number',
  'Account Number',
  'Certificate/License Number',
  'Vehicle Identifier',
  'Device Identifier',
  'Web URL',
  'IP Address',
  'Biometric Identifier',
  'Full-face Photograph',
  'Unique Identifier Code'
]

/**
 * Type used to display every supported PII/PHI label in {@link PII_IDENTIFIER_OPTIONS}.
 */
export type PiiIdentifierOption =
  | /** Full individual name, e.g., "John Doe". */ 'Name'
  | /** Location-related data such as addresses or coordinates. */ 'Geographic Data'
  | /** Dates including birth, death, admission, discharge, etc. */ 'Dates'
  | /** Telephone numbers, mobile or landline. */ 'Phone Number'
  | /** Fax numbers for document transmission. */ 'Fax Number'
  | /** Email addresses used for personal or professional contact. */ 'Email Address'
  | /** Government-issued Social Security Number. */ 'Social Security Number'
  | /** Unique medical record identifier assigned by healthcare providers. */ 'Medical Record Number'
  | /** Identifier for health plan beneficiaries. */ 'Health Plan Beneficiary Number'
  | /** Financial account numbers like bank or credit accounts. */ 'Account Number'
  | /** Licenses or certificates, e.g., driver's license, professional license. */ 'Certificate/License Number'
  | /** Vehicle identification number or related vehicle data. */ 'Vehicle Identifier'
  | /** Devices or equipment identifiers, e.g., serial numbers. */ 'Device Identifier'
  | /** Web addresses and URLs. */ 'Web URL'
  | /** Internet Protocol addresses, e.g., IPv4 or IPv6. */ 'IP Address'
  | /** Biometric data like fingerprints, retinal scans, voiceprints. */ 'Biometric Identifier'
  | /** Photograph capturing a person's full face. */ 'Full-face Photograph'
  | /** System-generated unique codes for identifying entities. */ 'Unique Identifier Code'

/**
 * Represents a collection of documents and metadata within an organization.
 */
export interface Collection {
  /** Unique identifier for the collection. */
  id: string
  /** Identifier of the parent organization. */
  organizationId: string
  /** Display name of the collection. */
  name: string
  /** The type of the collection. */
  type: CollectionType
  /** Description of the collection’s purpose. */
  description: string
  /** Whether this collection contains PII data. */
  pii: boolean
  /** Label indicating the type of PII in this collection. */
  piiType: PiiType
  /** Array of control identifiers for PII handling UI. */
  piiControls: PiiIdentifierOption[]
  /** Tags associated with this collection for filtering/search. */
  tags: string[]
  /** General instructions for collection usage. */
  instructions: string
  /** Instructions specific to graph-based operations. */
  graphInstructions: string
  /** Instructions for prompt-based interactions. */
  promptInstructions: string
  /** Instructions for search operations. */
  searchInstructions: string
  /** Optional organization details that appears in when retrieving by id or in extended lists */
  organization?: OrganizationListResult
  /** Optional list of categories in this collection that appears in when retrieving by id or in extended lists */
  categories?: Category[]
  /** Optional list of documents within this collection that appears in when retrieving by id or in extended lists */
  documents?: Document[]
  /** Timestamp when the collection was created. */
  dateCreated: Date
  /** Timestamp when the collection was last updated. */
  dateUpdated: Date
}

/**
 * Aggregate statistics for a collection’s content and processing status.
 */
export interface CollectionStats {
  /** Total number of indexed documents. */
  docs: number
  /** Total disk/storage size in bytes. */
  size: number
  /** Total number of graph nodes. */
  nodes: number
  /** Breakdown of processing statuses. */
  status: {
    /** Count of processed documents. */
    documents: number
    /** Count of processed nodes. */
    nodes: number
    /** Count of processed edges. */
    edges: number
    /** Count of generated vectors. */
    vectors: number
    /** Count of processed categories. */
    category: number
  }
}

/**
 * Represents a category grouping within a collection.
 */
export interface Category {
  /** Unique identifier for the category. */
  id: string
  /** Identifier of the parent collection. */
  collectionId: string
  /** Display name of the category. */
  name: string
  /** The type of the category */
  type: CategoryType
  /** Free-form instructions for this category. */
  instructions: string
  /** If true, only a single entry is allowed per document. */
  singleEntry: boolean
  /** Timestamp when the category was created. */
  dateCreated: Date
  /** Timestamp when the category was last updated. */
  dateUpdated: Date
}

/**
 * Payload for creating a new category.
 */
export interface CreateCategoryPayload {
  /** Display name for the new category. */
  name: string
  /** The type for the new category. */
  type: CategoryType
  /** Free-form instructions for the new category, markdown is recommended. */
  instructions: string
}
