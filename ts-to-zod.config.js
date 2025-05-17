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
  }
]

module.exports = config
