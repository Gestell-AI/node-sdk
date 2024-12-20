import loadFetch from 'util/fetch';
export async function getJob({ apiKey, apiUrl, debug, collectionId, jobId }) {
    const fetch = await loadFetch();
    const url = new URL(`/api/collection/${collectionId}/job/${jobId}`, apiUrl);
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
            message: errorResponse?.message || 'There was an error retrieving the job',
            result: null
        };
    }
    const response = (await payload.json());
    return response;
}
