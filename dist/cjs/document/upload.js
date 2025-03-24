"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadDocument = uploadDocument;
const mime_types_1 = __importDefault(require("mime-types"));
const create_1 = require("../document/create");
const presign_1 = require("../document/presign");
async function uploadDocument({ apiKey, apiUrl, debug, collectionId, name, file, type, instructions = '', job = true, tables = false }) {
    const fileType = type ||
        (file instanceof File ? file.type : mime_types_1.default.lookup(file)) ||
        'text/plain';
    const { status, message, path, url } = await (0, presign_1.presignDocument)({
        apiKey,
        apiUrl,
        debug,
        collectionId,
        type: fileType,
        filename: name
    });
    if (status !== 'OK') {
        return {
            status,
            message,
            id: ''
        };
    }
    if (typeof file === 'string' || file instanceof Buffer) {
        const { default: fetch } = await Promise.resolve().then(() => __importStar(require('node-fetch')));
        const { readFileSync } = await Promise.resolve().then(() => __importStar(require('node:fs')));
        if (typeof file === 'string') {
            try {
                const upload = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': fileType || 'application/octet-stream'
                    },
                    body: readFileSync(file)
                });
                if (!upload.ok) {
                    console.log(await upload.text());
                    return {
                        status: 'ERROR',
                        message: 'Error uploading document, failed to upload to the presigned url',
                        id: ''
                    };
                }
            }
            catch {
                return {
                    status: 'ERROR',
                    message: 'Error uploading document',
                    id: ''
                };
            }
        }
        else {
            try {
                const upload = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': fileType || 'application/octet-stream'
                    },
                    body: file
                });
                if (!upload.ok) {
                    return {
                        status: 'ERROR',
                        message: 'Error uploading document, failed to upload to the presigned url',
                        id: ''
                    };
                }
            }
            catch {
                return {
                    status: 'ERROR',
                    message: 'Error uploading document',
                    id: ''
                };
            }
        }
    }
    else if (typeof window !== 'undefined' && file instanceof File) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const upload = await fetch(url, {
                method: 'PUT',
                body: formData //This is a workaround. FormData is the correct type, but typescript doesn't know this
            });
            if (!upload.ok) {
                return {
                    status: 'ERROR',
                    message: 'Error uploading document, failed to upload to the presigned url',
                    id: ''
                };
            }
        }
        catch {
            return {
                status: 'ERROR',
                message: 'Error uploading document',
                id: ''
            };
        }
    }
    else {
        return {
            status: 'ERROR',
            message: 'Invalid file type provided, must be a string (path), Buffer (Node) or a File (Client).',
            id: ''
        };
    }
    return (await (0, create_1.createDocument)({
        apiKey,
        apiUrl,
        debug,
        collectionId,
        name,
        path,
        type: fileType,
        instructions,
        job,
        tables
    }));
}
