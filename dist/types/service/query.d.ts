import { GestellOptions } from '../index';
import { ExportFeaturesRequest, ExportFeaturesResponse } from '../query/exportFeatures';
import { ExportTableRequest, ExportTableResponse } from '../query/exportTable';
import { FeaturesQueryRequest, FeaturesQueryResponse } from '../query/features';
import { SearchQueryResponse } from '../query/search';
import { TablesQueryRequest, TablesQueryResponse } from '../query/table';
import { PromptRequestBody, SearchRequestBody } from '../types/query';
/**
 * The **query services** for the Gestell SDK.
 *
 * @remarks
 * All helpers resolve to a strongly typed `{ status, message, … }` payload.
 * When the SDK is initialised with `debug: true`, verbose request / response
 * logs are emitted to aid troubleshooting.
 *
 * @example
 * ```ts
 * import Gestell from '@gestell/sdk'
 *
 * const gestell = new Gestell()
 * // Search a collection
 * const { result } = await gestell.query.search({
 *   collectionId: 'col_123',
 *   prompt: 'Find documents about climate change'
 * })
 *
 * // Stream a prompt-based query
 * const stream = await gestell.query.prompt({
 *   collectionId: 'col_123',
 *   prompt: 'Summarise document ABC'
 * })
 * ```
 *
 * @see https://gestell.ai/docs/reference#query
 */
export interface QueryServiceApi {
    /**
     * Executes a **prompt-based query** on a collection and returns a readable
     * stream of model tokens.
     *
     * @param payload - Prompt parameters:
     *  - `collectionId` – Target collection.
     *  - `categoryId`   – *(optional)* Target category for tables / features.
     *  - `prompt`       – The user prompt.
     *  - `method`       – *(optional)* Search method to use.
     *  - `type`         – *(optional)* Search type to apply.
     *  - `vectorDepth`  – *(optional)* Depth of vector traversal.
     *  - `nodeDepth`    – *(optional)* Depth of node traversal.
     *  - `maxQueries`   – *(optional)* Max candidate queries.
     *  - `maxResults`   – *(optional)* Max returned results.
     *  - `template`     – *(optional)* System template for the request.
     *  - `cot`          – *(optional)* Enable chain-of-thought reasoning.
     *  - `messages`     – *(optional)* Chat history.
     *
     * @returns A `ReadableStream<string>` that streams the model response.
     */
    prompt(payload: PromptRequestBody): Promise<ReadableStream<string>>;
    /**
     * Performs a **search** against a collection.
     *
     * @param payload - Search parameters:
     * - `collectionId` - Target collection ID (required)
     * - `categoryId` - Optional category filter within the collection
     * - `prompt` - Natural-language query or prompt (required)
     * - `method?` - Search performance/accuracy mode: 'fast' | 'normal' | 'precise' (default: 'normal')
     * - `type?` - Search output format: 'summary' | 'phrase' | 'keywords' (default depends on method)
     * - `vectorDepth?` - Number of vector hops to explore (default depends on method)
     * - `nodeDepth?` - Number of node hops to explore (default depends on method)
     * - `maxQueries?` - Maximum number of sub-queries to issue (default depends on method)
     * - `maxResults?` - Maximum number of results to return (default: 10)
     * - `includeContent?` - Include full content in each result (default: true)
     * - `includeEdges?` - Include edge references in results (default: false)
     * - `edgesInResult?` - Embed edge data within result objects (default: false)
     *
     * @returns A promise that resolves to the search results, including:
     * - `result`: Array of search results with content and citations
     * - `status`: The request status
     * - `message`: Optional explanatory message
     */
    search(payload: SearchRequestBody): Promise<SearchQueryResponse>;
    /**
     * Retrieves a paginated list of feature layouts for a specific category within a collection.
     *
     * @param payload - Feature query parameters:
     * - `collectionId` - The unique identifier of the collection containing the features.
     * - `categoryId`   - The unique identifier of the category to retrieve features from.
     * - `skip?`        - *(optional)* Number of items to skip for pagination. Default: `0`.
     * - `take?`        - *(optional)* Maximum number of items to return. Default: `10`.
     *
     * @returns A promise that resolves to a response containing:
     * - `status`: The request status (`'OK'` or `'ERROR'`).
     * - `message?`: Optional message providing additional context or error details.
     * - `result`: An array of `FeatureLayout` objects, each containing:
     *   - `position`: Array of coordinates or numerical values relevant to the feature.
     *   - `label`: Label identifying the feature.
     *   - `description`: Description or metadata about the feature.
     *
     * @example
     * ```typescript
     * const { result } = await gestell.query.features({
     *   collectionId: 'col_123',
     *   categoryId: 'cat_features_456',
     *   skip: 0,
     *   take: 20
     * });
     * ```
     */
    features(payload: FeaturesQueryRequest): Promise<FeaturesQueryResponse>;
    /**
     * Retrieves tabular data for a specific category within a collection.
     *
     * @param payload - Table query parameters:
     * - `collectionId` - The unique identifier of the collection containing the table data (required).
     * - `categoryId`   - The unique identifier of the table category to retrieve (required).
     * - `skip?`        - Number of rows to skip for pagination. Default: `0`.
     * - `take?`        - Maximum number of rows to return. Default: `10`.
     * - `prompt?`      - Optional natural language prompt to filter or transform the table data.
     *
     * @returns A promise that resolves to a response containing:
     * - `status`: The request status (`'OK'` or `'ERROR'`).
     * - `message?`: Optional message providing additional context or error details.
     * - `result`: An array of row objects, where each object maps column names to their string values.
     *
     * @example
     * ```typescript
     * const { result } = await gestell.query.table({
     *   collectionId: 'col_123',
     *   categoryId: 'cat_tables_789',
     *   skip: 0,
     *   take: 50,
     *   prompt: 'Show only rows where status is active'
     * });
     * ```
     */
    table(payload: TablesQueryRequest): Promise<TablesQueryResponse>;
    /**
     * Exports feature data for a specific category within a collection in either JSON or CSV format.
     *
     * @param payload - Export configuration:
     * - `collectionId` - The unique identifier of the collection containing the features (required).
     * - `categoryId`   - The unique identifier of the feature category to export (required).
     * - `format?`      - Output format: `'json'` or `'csv'`. Default: `'json'`.
     * - `skip?`        - Number of items to skip for pagination. Default: `0`.
     * - `take?`        - Maximum number of items to include. Default: `10`.
     *
     * @returns A promise that resolves to:
     * - When `format` is `'json'`: An object containing:
     *   - `status`: The request status (`'OK'` or `'ERROR'`).
     *   - `message?`: Optional message with additional context or error details.
     *   - `result`: An array of feature objects.
     * - When `format` is `'csv'`: A string containing the CSV-formatted data.
     *
     * @example <caption>Exporting features as JSON</caption>
     * ```typescript
     * const result = await gestell.query.featuresExport({
     *   collectionId: 'col_123',
     *   categoryId: 'cat_features_456',
     *   format: 'json',
     *   take: 100
     * });
     * if (typeof result !== 'string') {
     *   console.log(result.result); // Array of feature objects
     * }
     * ```
     *
     * @example <caption>Exporting features as CSV</caption>
     * ```typescript
     * const csvData = await gestell.query.featuresExport({
     *   collectionId: 'col_123',
     *   categoryId: 'cat_features_456',
     *   format: 'csv',
     *   take: 1000
     * });
     * if (typeof csvData === 'string') {
     *   console.log(csvData); // String containing CSV data
     * }
     * ```
     */
    featuresExport(payload: ExportFeaturesRequest): Promise<ExportFeaturesResponse | string>;
    /**
     * Exports table data for a specific category within a collection in either JSON or CSV format.
     *
     * @param payload - Export configuration:
     * - `collectionId` - The unique identifier of the collection containing the tables (required).
     * - `categoryId`   - The unique identifier of the table category to export (required).
     * - `format?`      - Output format: `'json'` or `'csv'`. Default: `'json'`.
     * - `skip?`        - Number of items to skip for pagination. Default: `0`.
     * - `take?`        - Maximum number of items to include. Default: `10`.
     *
     * @returns A promise that resolves to:
     * - When `format` is `'json'`: An object containing:
     *   - `status`: The request status (`'OK'` or `'ERROR'`).
     *   - `message?`: Optional message with additional context or error details.
     *   - `result`: An array of record objects where keys are column names and values are strings.
     * - When `format` is `'csv'`: A string containing the CSV-formatted data.
     *
     * @example <caption>Exporting tables as JSON</caption>
     * ```typescript
     * const result = await gestell.query.tableExport({
     *   collectionId: 'col_123',
     *   categoryId: 'cat_tables_789',
     *   format: 'json',
     *   take: 50
     * });
     * if (typeof result !== 'string') {
     *   console.log(result.result); // Array of record objects
     * }
     * ```
     *
     * @example <caption>Exporting tables as CSV</caption>
     * ```typescript
     * const csvData = await gestell.query.tableExport({
     *   collectionId: 'col_123',
     *   categoryId: 'cat_tables_789',
     *   format: 'csv',
     *   take: 1000
     * });
     * if (typeof csvData === 'string') {
     *   console.log(csvData); // String containing CSV data
     * }
     * ```
     */
    tableExport(payload: ExportTableRequest): Promise<ExportTableResponse | string>;
}
/**
 * Factory that returns helpers scoped to **queries**.
 *
 * @param client - Global Gestell SDK configuration.
 * @returns Strongly typed helpers implementing {@link QueryServiceApi}.
 */
export default function QueryService(client?: GestellOptions): QueryServiceApi;
