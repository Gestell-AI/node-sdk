"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchModes = exports.SearchPrecise = exports.SearchNormal = exports.SearchFast = void 0;
/** Fast search defaults: minimal depth for speed. */
exports.SearchFast = {
    type: 'phrase',
    vectorDepth: 10,
    nodeDepth: 1,
    maxQueries: 1,
    maxResults: 10
};
/** Normal search defaults: balanced speed and coverage. */
exports.SearchNormal = {
    type: 'summary',
    vectorDepth: 8,
    nodeDepth: 2,
    maxQueries: 3,
    maxResults: 10
};
/** Precise search defaults: deeper exploration for accuracy. */
exports.SearchPrecise = {
    type: 'summary',
    vectorDepth: 10,
    nodeDepth: 5,
    maxQueries: 3,
    maxResults: 10
};
/**
 * Mapping of search methods to their default parameter sets.
 */
exports.SearchModes = {
    fast: exports.SearchFast,
    normal: exports.SearchNormal,
    precise: exports.SearchPrecise
};
