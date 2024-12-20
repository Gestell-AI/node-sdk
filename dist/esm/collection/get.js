import loadFetch from 'util/fetch';
export async function getCollection({ apiKey, apiUrl, debug, collectionId }) {
    const fetch = await loadFetch();
    const url = new URL(`/api/collection/${collectionId}`, apiUrl);
    const payload = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `BEARER ${apiKey}`
        }
    });
    if (!payload.ok) {
        const errorResponse = await payload.json().catch(() => null);
        if (debug) {
            console.log(errorResponse);
        }
        return {
            status: 'ERROR',
            message: errorResponse?.message || 'There was an retrieving the collection',
            result: null,
            stats: null
        };
    }
    const response = (await payload.json());
    return response;
}
