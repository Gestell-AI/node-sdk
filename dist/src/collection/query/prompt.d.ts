import type { BaseRequest } from 'types/base';
import { PromptPayload } from 'types/query';
export interface PromptQueryRequestToApi extends PromptPayload {
    id: string;
}
export declare function promptQuery({ apiKey, apiUrl, debug, id, categoryId, prompt, method, type, vectorDepth, nodeDepth, maxQueries, maxResults, template, cot, threadId, chat }: PromptQueryRequestToApi & BaseRequest): Promise<ReadableStream<string>>;
//# sourceMappingURL=prompt.d.ts.map