import { CreateDocumentRequest, CreateDocumentResponse } from '../document/create';
import { DeleteDocumentRequest, DeleteDocumentResponse } from '../document/delete';
import { ExportDocumentRequest, ExportDocumentResponse } from '../document/export';
import { GetDocumentRequest, GetDocumentResponse } from '../document/get';
import { GetDocumentsRequest, GetDocumentsResponse } from '../document/list';
import { PresignDocumentRequest, PresignDocumentResponse } from '../document/presign';
import { UpdateDocumentRequest, UpdateDocumentResponse } from '../document/update';
import { UploadDocumentRequest, UploadDocumentResponse } from '../document/upload';
import { GestellOptions } from '../index';
/**
 * The **document services** for the Gestell SDK.
 *
 * @remarks
 * All helpers resolve to a strongly typed `{ status, message, … }` payload.
 * If the SDK was initialised with `debug: true`, verbose request / response
 * logs will be emitted to the console to aid troubleshooting.
 *
 * @example
 * ```ts
 * import Gestell from '@gestell/sdk'
 *
 * const gestell = new Gestell()
 * const docs = await gestell.document.list()
 *
 * console.log(docs)
 *
 * ```
 *
 * @see https://gestell.ai/docs/reference#document
 */
export interface DocumentServiceApi {
    /**
     * Retrieves a specific document from a collection.
     * Learn more: https://gestell.ai/docs/reference#document
     *
     * @param payload - Document retrieval parameters including:
     * - `collectionId`: ID of the collection containing the document.
     * - `documentId`: ID of the document to retrieve.
     * @returns A promise that resolves to the response, including:
     * - `result`: The retrieved document or null if not found.
     * - `status`: The request status.
     * - `message`: An optional explanatory message.
     */
    get(payload: GetDocumentRequest): Promise<GetDocumentResponse>;
    /**
     * Exports a document from a collection in the specified format.
     * Learn more: https://gestell.ai/docs/reference#document
     *
     * @param payload - Document export parameters including:
     * - `collectionId`: ID of the collection containing the document.
     * - `documentId`: ID of the document to export.
     * - `type?`: Format of the exported document ('json' for layout or 'text' for raw text).
     * @returns A promise that resolves to the exported content, which can be:
     * - Layout arrays (DocumentLayout[], AudioLayout[], PhotoLayout[], or VideoLayout[])
     * - Raw text (string)
     */
    export(payload: ExportDocumentRequest): Promise<ExportDocumentResponse>;
    /**
     * Retrieves a list of documents from a collection with optional filtering and pagination.
     * Learn more: https://gestell.ai/docs/reference#document
     *
     * @param payload - Document listing parameters including:
     * - `collectionId`: The unique identifier of the collection to query.
     * - `search?`: Optional text to search within document content or metadata.
     * - `take?`: Maximum number of documents to return (default: 10).
     * - `skip?`: Number of documents to skip for pagination (default: 0).
     * - `extended?`: Whether to include extended document data (default: false).
     * - `status?`: Filter by overall job status.
     * - `nodes?`: Filter by node processing status.
     * - `edges?`: Filter by edge processing status.
     * - `vectors?`: Filter by vector processing status.
     * - `category?`: Filter by category processing status.
     * @returns A promise that resolves to the response, including:
     * - `result`: Array of document objects matching the query.
     * - `status`: The request status.
     * - `message`: An optional explanatory message.
     */
    list(payload: GetDocumentsRequest): Promise<GetDocumentsResponse>;
    /**
     * Generates a pre-signed URL for secure document uploads to a collection.
     * Learn more: https://gestell.ai/docs/reference#document
     *
     * @param payload - Presigned URL request parameters including:
     * - `collectionId`: ID of the target collection.
     * - `filename`: Name of the document file.
     * - `type`: MIME type of the document (e.g., 'application/pdf').
     * @returns A promise that resolves to the presigned URL response, including:
     * - `path`: Storage path for the document.
     * - `url`: Presigned URL for uploading the document.
     * - `status`: The request status.
     * - `message`: An optional explanatory message.
     */
    presign(payload: PresignDocumentRequest): Promise<PresignDocumentResponse>;
    /**
     * Creates a new document in a collection with the specified details.
     * Learn more: https://gestell.ai/docs/reference#document
     *
     * @param payload - Document creation parameters including:
     * - `collectionId`: ID of the collection to create the document in.
     * - `name`: Name of the new document.
     * - `path`: Path for the document.
     * - `type`: Document mime type (e.g., application/pdf).
     * - `instructions?`: Optional instructions for document creation.
     * - `job?`: Whether to run creation as a background job.
     * - `tables?`: Whether to do additional table processing in the document.
     * @returns A promise that resolves to the creation response, including:
     * - `id`: The unique identifier of the created document.
     * - `status`: The request status.
     * - `message`: An optional explanatory message.
     */
    create(payload: CreateDocumentRequest): Promise<CreateDocumentResponse>;
    /**
     * Uploads a document to a collection with optional processing.
     * Learn more: https://gestell.ai/docs/reference#document
     *
     * @param payload - Document upload parameters including:
     * - `collectionId`: ID of the target collection.
     * - `name`: Name of the document.
     * - `file`: File content as path, Buffer, or File.
     * - `type?`: MIME type (auto-detected if not provided).
     * - `instructions?`: Optional instructions for processing.
     * - `job?`: Whether to process as a background job (default: true).
     * - `tables?`: Whether to include table processing (default: false).
     * @returns A promise that resolves to the upload response, including:
     * - `id`: The unique identifier of the uploaded document.
     * - `status`: The request status.
     * - `message`: An optional explanatory message.
     */
    upload(payload: UploadDocumentRequest): Promise<UploadDocumentResponse>;
    /**
     * Updates an existing document's details in a collection.
     * Learn more: https://gestell.ai/docs/reference#document
     *
     * @param payload - Document update parameters including:
     * - `collectionId`: ID of the collection containing the document.
     * - `documentId`: ID of the document to update.
     * - `name?`: New name for the document.
     * - `instructions?`: Updated instructions or description.
     * - `tables?`: Whether to perform additional OCR processing for tables.
     * - `job?`: Whether to dispatch a background job for processing.
     * @returns A promise that resolves to the update response, including:
     * - `status`: The request status.
     * - `message`: An optional explanatory message.
     */
    update(payload: UpdateDocumentRequest): Promise<UpdateDocumentResponse>;
    /**
     * Deletes a document from a collection.
     * Learn more: https://gestell.ai/docs/reference#document
     *
     * @param payload - Document deletion parameters including:
     * - `collectionId`: ID of the collection containing the document.
     * - `documentId`: ID of the document to delete.
     * @returns A promise that resolves to the deletion response, including:
     * - `status`: The request status.
     * - `message`: An optional explanatory message.
     */
    delete(payload: DeleteDocumentRequest): Promise<DeleteDocumentResponse>;
}
/**
 * Factory that returns helpers scoped to **documents**.
 *
 * @param client - Global Gestell SDK configuration.
 * @returns Strongly typed helpers implementing {@link DocumentServiceApi}.
 */
export default function DocumentService(client?: GestellOptions): DocumentServiceApi;
