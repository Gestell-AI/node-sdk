import { createDocument } from 'document/create';
import { presignDocument } from 'document/presign';
import { createReadStream } from 'fs';
import mime from 'mime-types';
export async function uploadDocument({ apiKey, apiUrl, debug, collectionId, name, file, type, instructions = '', job = true }) {
    const fileType = type ||
        (file instanceof File ? file.type : mime.lookup(file)) ||
        'text/plain';
    const { status, message, path, url } = await presignDocument({
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
            body: createReadStream(file)
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
    return (await createDocument({
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