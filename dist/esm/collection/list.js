import loadFetch from 'util/fetch';
export async function getCollections({ apiKey, apiUrl, debug, search = '', take = 10, skip = 0, extended = false }) {
    const fetch = await loadFetch();
    const url = new URL(`/api/collection`, apiUrl);
    url.searchParams.set('search', search);
    url.searchParams.set('take', take.toString());
    url.searchParams.set('skip', skip.toString());
    url.searchParams.set('extended', extended.toString());
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
            message: errorResponse?.message || 'There was an error retrieving collections',
            result: []
        };
    }
    const response = (await payload.json());
    return response;
}
