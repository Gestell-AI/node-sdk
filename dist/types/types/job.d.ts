import { LayoutType } from '../types/layout';
/**
 * Types of processing steps available for a job.
 */
export type JobType = /** The OCR job status. */ 'status' | /** Canonization and node extraction step. */ 'nodes' | /** Vector generation step. */ 'vectors' | /** Edge linking step. */ 'edges' | /** Category assignment step. */ 'category';
/**
 * Possible states of a processing step or job.
 */
export type JobStatus = /** Currently in progress. */ 'processing' | /** Encountered an error. */ 'error' | /** Completed successfully. */ 'ready' | /** Manually cancelled. */ 'cancelled' | /** Not yet started. */ 'unprocessed' | /** Partially completed. */ 'partial' | /** All steps completed. */ 'all';
/**
 * Represents a processing job for a specific document within a collection.
 */
export interface Job {
    /** Unique identifier for the job. */
    id: string;
    /** Identifier of the parent collection. */
    collectionId: string;
    /** Identifier of the target document. */
    documentId: string;
    /** Overall job status (equivalent to `status`). */
    status: JobStatus;
    /** Status of the node extraction step. */
    nodes: JobStatus;
    /** Status of the edge linking step. */
    edges: JobStatus;
    /** Status of the vector generation step. */
    vectors: JobStatus;
    /** Status of the category assignment step. */
    category: JobStatus;
    /** Human-readable message or error details. */
    message: string;
    /**
     * Optional snapshot of the document metadata at job creation.
     */
    document?: {
        /** Document identifier. */ id: string;
        /** Collection identifier. */ collectionId: string;
        /** Creation timestamp. */ dateCreated: Date;
        /** Last update timestamp. */ dateUpdated: Date;
        /** Document name or filename. */ name: string;
        /** MIME type or custom type label. */ type: string;
        /** Layout parsing strategy used. */ layoutType: LayoutType;
        /** Number of layout nodes generated. */ layoutNodes: number;
        /** Custom instructions for processing. */ instructions: string;
    };
    /** Timestamp when the job was created. */
    dateCreated: Date;
    /** Timestamp when the job was last updated. */
    dateUpdated: Date;
}
