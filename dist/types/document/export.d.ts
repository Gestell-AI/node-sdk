import type { BaseRequest } from '../types/base';
import { AudioLayout, DocumentLayout, PhotoLayout, VideoLayout } from '../types/layout';
export interface ExportDocumentRequest {
    collectionId: string;
    documentId: string;
    type?: 'json' | 'text';
}
export type ExportDocumentResponse = DocumentLayout[] | AudioLayout[] | PhotoLayout[] | VideoLayout[] | string;
export declare function exportDocument({ apiKey, apiUrl, debug, collectionId, documentId, type }: ExportDocumentRequest & BaseRequest): Promise<ExportDocumentResponse>;
