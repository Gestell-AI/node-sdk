import loadFetch from 'util/fetch';
export async function presignDocument({ apiKey, apiUrl, debug, collectionId, filename, type }) {
    const fetch = await loadFetch();
    const url = new URL(`/api/collection/${collectionId}/document/presign`, apiUrl);
    const payload = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `BEARER ${apiKey}`
        },
        body: JSON.stringify({
            filename,
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
            message: errorResponse?.message || 'There was an error presigning the document',
            path: '',
            url: ''
        };
    }
    const response = (await payload.json());
    return response;
}
