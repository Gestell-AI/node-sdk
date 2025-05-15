"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = JobService;
const cancel_1 = require("../job/cancel");
const get_1 = require("../job/get");
const list_1 = require("../job/list");
const reprocess_1 = require("../job/reprocess");
const client_1 = __importDefault(require("../service/client"));
/**
 * Factory that returns helpers scoped to **jobs**.
 *
 * @param client - Global Gestell SDK configuration.
 * @returns Strongly typed helpers implementing {@link JobServiceApi}.
 */
function JobService(client = {}) {
    const options = (0, client_1.default)(client);
    /** Wraps {@link getJob} with injected client options. */
    async function get(payload) {
        return (0, get_1.getJob)({ ...options, ...payload });
    }
    /** Wraps {@link getJobs} with injected client options. */
    async function list(payload) {
        return (0, list_1.getJobs)({ ...options, ...payload });
    }
    /** Wraps {@link reprocessDocuments} with injected client options. */
    async function reprocessFn(payload) {
        return (0, reprocess_1.reprocessDocuments)({ ...options, ...payload });
    }
    /** Wraps {@link cancelJobs} with injected client options. */
    async function cancelFn(payload) {
        return (0, cancel_1.cancelJobs)({ ...options, ...payload });
    }
    return {
        get,
        list,
        reprocess: reprocessFn,
        cancel: cancelFn
    };
}
