const config = [
  // base types
  {
    name: 'src/types/base',
    input: 'src/types/base.ts',
    output: 'artifacts/base.zod.ts'
  },
  // document types
  {
    name: 'src/types/document',
    input: 'src/types/document.ts',
    output: 'artifacts/document.zod.ts'
  },
  // job types
  {
    name: 'src/types/job',
    input: 'src/types/job.ts',
    output: 'artifacts/job.zod.ts'
  },
  // layout types
  {
    name: 'src/types/layout',
    input: 'src/types/layout.ts',
    output: 'artifacts/layout.zod.ts'
  },
  // organization types
  {
    name: 'src/types/organization',
    input: 'src/types/organization.ts',
    output: 'artifacts/organization.zod.ts'
  },
  // query types
  {
    name: 'src/types/query',
    input: 'src/types/query.ts',
    output: 'artifacts/query.zod.ts'
  },
  // collection types
  {
    name: 'src/types/collection',
    input: 'src/types/collection.ts',
    output: 'artifacts/collection.zod.ts'
  },
  // collection endpoints
  {
    name: 'src/collection/create',
    input: 'src/collection/create.ts',
    output: 'artifacts/collection/create.zod.ts'
  },
  {
    name: 'src/collection/get',
    input: 'src/collection/get.ts',
    output: 'artifacts/collection/get.zod.ts'
  },
  {
    name: 'src/collection/list',
    input: 'src/collection/list.ts',
    output: 'artifacts/collection/list.zod.ts'
  },
  {
    name: 'src/collection/update',
    input: 'src/collection/update.ts',
    output: 'artifacts/collection/update.zod.ts'
  },
  // document endpoints
  {
    name: 'src/document/create',
    input: 'src/document/create.ts',
    output: 'artifacts/document/create.zod.ts'
  },
  {
    name: 'src/document/get',
    input: 'src/document/get.ts',
    output: 'artifacts/document/get.zod.ts'
  },
  {
    name: 'src/document/list',
    input: 'src/document/list.ts',
    output: 'artifacts/document/list.zod.ts'
  },
  {
    name: 'src/document/update',
    input: 'src/document/update.ts',
    output: 'artifacts/document/update.zod.ts'
  },
  {
    name: 'src/document/export',
    input: 'src/document/export.ts',
    output: 'artifacts/document/export.zod.ts'
  },
  {
    name: 'src/document/upload',
    input: 'src/document/upload.ts',
    output: 'artifacts/document/upload.zod.ts'
  },
  {
    name: 'src/document/delete',
    input: 'src/document/delete.ts',
    output: 'artifacts/document/delete.zod.ts'
  },
  {
    name: 'src/job/reprocess',
    input: 'src/job/reprocess.ts',
    output: 'artifacts/document/reprocess.zod.ts'
  },
  // Extraction Endpoints
  {
    name: 'src/query/features',
    input: 'src/query/features.ts',
    output: 'artifacts/extraction/features.zod.ts'
  },
  {
    name: 'src/query/features-export',
    input: 'src/query/exportFeatures.ts',
    output: 'artifacts/extraction/features-export.zod.ts'
  },
  {
    name: 'src/query/table',
    input: 'src/query/table.ts',
    output: 'artifacts/extraction/table.zod.ts'
  },
  {
    name: 'src/query/table-export',
    input: 'src/query/exportTable.ts',
    output: 'artifacts/extraction/table-export.zod.ts'
  },
  // Query Endpoints
  {
    name: 'src/query/prompt',
    input: 'src/query/prompt.ts',
    output: 'artifacts/query/prompt.zod.ts'
  },
  {
    name: 'src/query/search',
    input: 'src/query/search.ts',
    output: 'artifacts/query/search.zod.ts'
  }
]

module.exports = config
