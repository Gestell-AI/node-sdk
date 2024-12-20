"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryKV = exports.QueryPrecise = exports.QueryNormal = exports.QueryFast = void 0;
exports.QueryFast = {
    type: 'phrase',
    vectorDepth: 10,
    nodeDepth: 1,
    maxQueries: 1,
    maxResults: 10
};
exports.QueryNormal = {
    type: 'summary',
    vectorDepth: 8,
    nodeDepth: 2,
    maxQueries: 3,
    maxResults: 10
};
exports.QueryPrecise = {
    type: 'summary',
    vectorDepth: 10,
    nodeDepth: 5,
    maxQueries: 3,
    maxResults: 10
};
exports.QueryKV = {
    fast: exports.QueryFast,
    normal: exports.QueryNormal,
    precise: exports.QueryPrecise
};
