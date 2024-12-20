import { Collection } from '../types/collection';
export type JobType = 'status' | 'nodes' | 'vectors' | 'edges' | 'category';
export type JobStatusType = 'processing' | 'error' | 'ready' | 'cancelled' | 'unprocessed' | 'partial' | 'all';
export interface Job {
    id: string;
    collectionId: string;
    collection?: Collection;
    documentId: string;
    document?: Document;
    status: JobStatusType;
    nodes: JobStatusType;
    edges: JobStatusType;
    vectors: JobStatusType;
    category: JobStatusType;
    message: string;
    dateCreated: Date;
    dateUpdated: Date;
}
