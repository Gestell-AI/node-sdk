import type { BaseRequest } from '../types/base';
import { PromptRequestBody } from '../types/query';
export declare function promptQuery({ apiKey, apiUrl, debug, collectionId, categoryId, prompt, method, type, vectorDepth, nodeDepth, maxQueries, maxResults, template, cot, messages }: PromptRequestBody & BaseRequest): Promise<ReadableStream<string>>;
