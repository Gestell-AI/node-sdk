import loadFetch from 'util/fetch';
export async function removeMembers({ apiKey, apiUrl, debug, organizationId, members }) {
    const fetch = await loadFetch();
    const url = new URL(`/api/organization/${organizationId}/member`, apiUrl);
    for (const member of members) {
        url.searchParams.append('id', member);
    }
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
            message: errorResponse?.message || 'There was an error removing members'
        };
    }
    const response = (await payload.json());
    return response;
}
