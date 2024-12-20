import loadFetch from 'util/fetch';
export async function reprocessDocument({ apiKey, apiUrl, debug, collectionId, ids, type }) {
    const fetch = await loadFetch();
    const url = new URL(`/api/collection/${collectionId}/job`, apiUrl);
    const payload = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `BEARER ${apiKey}`
        },
        body: JSON.stringify({
            ids,
            type
        })
    });
    if (!payload.ok) {
        const errorResponse = await payload.json().catch(() => null);
        if (debug) {
            console.log(errorResponse);
        }
        return {
            status: 'ERROR',
            message: errorResponse?.message || 'There was an error reprocessing jobs'
        };
    }
    const response = (await payload.json());
    return response;
}
