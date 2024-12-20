import loadFetch from 'util/fetch';
export async function featuresQuery({ apiKey, apiUrl, debug, collectionId, categoryId, skip = 0, take = 10 }) {
    const fetch = await loadFetch();
    const url = new URL(`/api/collection/${collectionId}/features`, apiUrl);
    const payload = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `BEARER ${apiKey}`
        },
        body: JSON.stringify({
            collectionId,
            categoryId,
            skip,
            take
        })
    });
    if (!payload.ok) {
        const errorResponse = await payload.json().catch(() => null);
        if (debug) {
            console.log(errorResponse);
        }
        return {
            status: 'ERROR',
            message: errorResponse?.message ||
                'There was an error running the features query',
            result: []
        };
    }
    const response = (await payload.json());
    return response;
}
