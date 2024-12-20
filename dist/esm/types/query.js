export const QueryFast = {
    type: 'phrase',
    vectorDepth: 10,
    nodeDepth: 1,
    maxQueries: 1,
    maxResults: 10
};
export const QueryNormal = {
    type: 'summary',
    vectorDepth: 8,
    nodeDepth: 2,
    maxQueries: 3,
    maxResults: 10
};
export const QueryPrecise = {
    type: 'summary',
    vectorDepth: 10,
    nodeDepth: 5,
    maxQueries: 3,
    maxResults: 10
};
export const QueryKV = {
    fast: QueryFast,
    normal: QueryNormal,
    precise: QueryPrecise
};
