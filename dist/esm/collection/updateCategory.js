import loadFetch from 'util/fetch';
export async function updateCategory({ apiKey, apiUrl, debug, collectionId, categoryId, name, type, instructions }) {
    const fetch = await loadFetch();
    const url = new URL(`/api/collection/${collectionId}/category`, apiUrl);
    const payload = await fetch(url, {
        method: 'PATCH',
        headers: {
            Authorization: `BEARER ${apiKey}`
        },
        body: JSON.stringify({
            categoryId,
            name,
            type,
            instructions
        })
    });
    if (!payload.ok) {
        const errorResponse = await payload.json().catch(() => null);
        if (debug) {
            console.log(errorResponse);
        }
        return {
            status: 'ERROR',
            message: errorResponse?.message || 'There was an error updating the category'
        };
    }
    const response = (await payload.json());
    return response;
}
