import { Job } from '../types/job';
import { AudioLayout, DocumentLayout, LayoutType, PhotoLayout, VideoLayout } from '../types/layout';
/**
 * Represents a document stored within a collection, including its processing
 * job, layout details, and file metadata.
 */
export interface Document {
    /** Unique identifier for the document. */
    id: string;
    /** Identifier of the parent collection. */
    collectionId: string;
    /** Human-readable name of the document (e.g., filename). */
    name: string;
    /** MIME type or custom type label of the document. */
    type: string;
    /** The layout parsing strategy applied to this document. */
    layoutType: LayoutType;
    /** Number of layout nodes generated during parsing. */
    layoutNodes: number;
    /** Whether the document contains tables to be parsed. */
    tables: boolean;
    /** Custom instructions or notes for processing this document. */
    instructions: string;
    /** Optional processing job associated with this document. */
    job?: Job;
    /**
     * Parsed layout structure, varying by `layoutType`:
     * - `DocumentLayout[]` for text/image based documents
     * - `PhotoLayout[]` for images
     * - `VideoLayout[]` for videos
     * - `AudioLayout[]` for audio
     */
    layout?: DocumentLayout[] | PhotoLayout[] | VideoLayout[] | AudioLayout[];
    /**
     * File metadata for the document.
     * - `size`: file size in bytes
     * - `pages`: number of pages (if applicable)
     * - `length`: duration in seconds (for audio/video)
     */
    metadata?: {
        /** File size in bytes. */
        size: number;
        /** Number of pages (for paginated documents). */
        pages: number;
        /** Duration in seconds (for audio/video). */
        length: number;
    };
    /** Timestamp when the document was created. */
    dateCreated: Date;
    /** Timestamp when the document was last updated. */
    dateUpdated: Date;
}
