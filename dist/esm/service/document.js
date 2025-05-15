"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DocumentService;
const create_1 = require("../document/create");
const delete_1 = require("../document/delete");
const export_1 = require("../document/export");
const get_1 = require("../document/get");
const list_1 = require("../document/list");
const presign_1 = require("../document/presign");
const update_1 = require("../document/update");
const upload_1 = require("../document/upload");
const client_1 = __importDefault(require("../service/client"));
/**
 * Factory that returns helpers scoped to **documents**.
 *
 * @param client - Global Gestell SDK configuration.
 * @returns Strongly typed helpers implementing {@link DocumentServiceApi}.
 */
function DocumentService(client = {}) {
    const options = (0, client_1.default)(client);
    async function get(payload) {
        return (0, get_1.getDocument)({ ...options, ...payload });
    }
    async function exportDocumentFn(payload) {
        return (0, export_1.exportDocument)({ ...options, ...payload });
    }
    async function list(payload) {
        return (0, list_1.getDocuments)({ ...options, ...payload });
    }
    async function presign(payload) {
        return (0, presign_1.presignDocument)({ ...options, ...payload });
    }
    async function create(payload) {
        return (0, create_1.createDocument)({ ...options, ...payload });
    }
    async function upload(payload) {
        return (0, upload_1.uploadDocument)({ ...options, ...payload });
    }
    async function update(payload) {
        return (0, update_1.updateDocument)({ ...options, ...payload });
    }
    async function deleteDocumentFn(payload) {
        return (0, delete_1.deleteDocument)({ ...options, ...payload });
    }
    return {
        get,
        export: exportDocumentFn,
        list,
        presign,
        create,
        upload,
        update,
        delete: deleteDocumentFn
    };
}
