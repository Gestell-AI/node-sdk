import type { BaseRequest } from '../types/base';
import { AudioLayout, DocumentLayout, PhotoLayout, VideoLayout } from '../types/layout';
/**
 * Request parameters for exporting a document from a collection.
 */
export interface ExportDocumentRequest {
    /** ID of the collection containing the document */
    collectionId: string;
    /** ID of the document to export */
    documentId: string;
    /** Format of the exported document (defaults to JSON if not specified) */
    type?: 'json' | 'text';
}
/**
 * Response data from a document export operation.
 * Returns layout arrays for various media types or a string representation.
 */
export type ExportDocumentResponse = DocumentLayout[] | AudioLayout[] | PhotoLayout[] | VideoLayout[] | string;
export declare function exportDocument({ apiKey, apiUrl, debug, collectionId, documentId, type }: ExportDocumentRequest & BaseRequest): Promise<ExportDocumentResponse>;
