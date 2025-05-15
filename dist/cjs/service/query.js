"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QueryService;
const exportFeatures_1 = require("../query/exportFeatures");
const exportTable_1 = require("../query/exportTable");
const features_1 = require("../query/features");
const prompt_1 = require("../query/prompt");
const search_1 = require("../query/search");
const table_1 = require("../query/table");
const client_1 = __importDefault(require("../service/client"));
/**
 * Factory that returns helpers scoped to **queries**.
 *
 * @param client - Global Gestell SDK configuration.
 * @returns Strongly typed helpers implementing {@link QueryServiceApi}.
 */
function QueryService(client = {}) {
    const options = (0, client_1.default)(client);
    async function promptFn(payload) {
        return (0, prompt_1.promptQuery)({ ...options, ...payload });
    }
    async function searchFn(payload) {
        return (0, search_1.searchQuery)({ ...options, ...payload });
    }
    async function featuresFn(payload) {
        return (0, features_1.featuresQuery)({ ...options, ...payload });
    }
    async function tableFn(payload) {
        return (0, table_1.tablesQuery)({ ...options, ...payload });
    }
    async function featuresExportFn(payload) {
        return (0, exportFeatures_1.exportFeatures)({ ...options, ...payload });
    }
    async function tableExportFn(payload) {
        return (0, exportTable_1.exportTable)({ ...options, ...payload });
    }
    return {
        prompt: promptFn,
        search: searchFn,
        features: featuresFn,
        table: tableFn,
        featuresExport: featuresExportFn,
        tableExport: tableExportFn
    };
}
