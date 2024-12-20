import loadFetch from 'util/fetch';
export async function createDocument({ apiKey, apiUrl, debug, collectionId, name, path, type, instructions = '', job = true }) {
    const fetch = await loadFetch();
    const url = new URL(`/api/collection/${collectionId}/document`, apiUrl);
    const payload = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `BEARER ${apiKey}`
        },
        body: JSON.stringify({
            name,
            path,
            type,
            instructions,
            job
        })
    });
    if (!payload.ok) {
        const errorResponse = await payload.json().catch(() => null);
        if (debug) {
            console.log(errorResponse);
        }
        return {
            status: 'ERROR',
            message: errorResponse?.message || 'There was an error creating the document',
            id: ''
        };
    }
    const response = (await payload.json());
    return response;
}
