"use strict";
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
        const { default: fetch } = await import('node-fetch');
        const { readFileSync } = await import('node:fs');
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
