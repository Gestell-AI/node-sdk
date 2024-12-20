import loadFetch from 'util/fetch';
export async function removeCategory({ apiKey, apiUrl, debug, collectionId, categoryId }) {
    const fetch = await loadFetch();
    const url = new URL(`/api/collection/${collectionId}/category/${categoryId}`, apiUrl);
    const payload = await fetch(url, {
        method: 'DELETE',
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
            message: errorResponse?.message || 'There was an error removing the category'
        };
    }
    const response = (await payload.json());
    return response;
}
