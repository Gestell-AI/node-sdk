import loadFetch from 'util/fetch';
export async function deleteOrganization({ apiKey, apiUrl, debug, id }) {
    const fetch = await loadFetch();
    const url = new URL(`/api/organization/${id}`, apiUrl);
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
            message: errorResponse?.message || 'There was an error deleting the organization'
        };
    }
    const response = (await payload.json());
    return response;
}
