"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadDocument = uploadDocument;
const fs_1 = require("fs");
const mime_types_1 = __importDefault(require("mime-types"));
const create_1 = require("../document/create");
const presign_1 = require("../document/presign");
async function uploadDocument({ apiKey, apiUrl, debug, collectionId, name, file, type, instructions = '', job = true }) {
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
    const { default: fetch } = await import('node-fetch');
    if (typeof file === 'string') {
        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': fileType
            },
            body: (0, fs_1.createReadStream)(file)
        });
    }
    else if (file instanceof Buffer) {
        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': fileType
            },
            body: file
        });
    }
    else if (file instanceof File) {
        const formData = new FormData();
        formData.append('file', file);
        await fetch(url, {
            method: 'PUT',
            body: formData
        });
    }
    else {
        return {
            status: 'ERROR',
            message: 'Invalid file type provided, must be a string (path), Buffer, or File. File can only be used on the client.',
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
        job
    }));
}
