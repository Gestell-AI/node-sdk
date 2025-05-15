"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CollectionService;
const addCategory_1 = require("../collection/addCategory");
const create_1 = require("../collection/create");
const delete_1 = require("../collection/delete");
const get_1 = require("../collection/get");
const list_1 = require("../collection/list");
const removeCategory_1 = require("../collection/removeCategory");
const update_1 = require("../collection/update");
const updateCategory_1 = require("../collection/updateCategory");
const client_1 = __importDefault(require("../service/client"));
/**
 * Factory that returns helpers scoped to **collections**.
 *
 * @param client - Global Gestell SDK configuration.
 * @returns Strongly typed helpers implementing {@link CollectionServiceApi}.
 */
function CollectionService(client = {}) {
    const options = (0, client_1.default)(client);
    async function get(collectionId) {
        return (0, get_1.getCollection)({ ...options, collectionId });
    }
    async function list(payload) {
        return (0, list_1.getCollections)({ ...options, ...payload });
    }
    async function create(payload) {
        return (0, create_1.createCollection)({ ...options, ...payload });
    }
    async function update(payload) {
        return (0, update_1.updateCollection)({ ...options, ...payload });
    }
    async function deleteCollectionFn(collectionId) {
        return (0, delete_1.deleteCollection)({ ...options, collectionId });
    }
    async function addCategoryFn(payload) {
        return (0, addCategory_1.addCategory)({ ...options, ...payload });
    }
    async function updateCategoryFn(payload) {
        return (0, updateCategory_1.updateCategory)({ ...options, ...payload });
    }
    async function removeCategoryFn(payload) {
        return (0, removeCategory_1.removeCategory)({ ...options, ...payload });
    }
    return {
        get,
        list,
        create,
        update,
        delete: deleteCollectionFn,
        addCategory: addCategoryFn,
        updateCategory: updateCategoryFn,
        removeCategory: removeCategoryFn
    };
}
