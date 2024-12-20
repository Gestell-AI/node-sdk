import type { BaseRequest } from '@gestell/types/base';
import { PromptPayload } from '@gestell/types/query';
export declare function promptQuery({ apiKey, apiUrl, debug, collectionId, categoryId, prompt, method, type, vectorDepth, nodeDepth, maxQueries, maxResults, template, cot, threadId, chat }: PromptPayload & BaseRequest): Promise<ReadableStream<string>>;
