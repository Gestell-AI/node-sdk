import loadFetch from 'util/fetch';
export async function createCollection({ apiKey, apiUrl, debug, organizationId, name, description, type, instructions, graphInstructions, promptInstructions, searchInstructions, categories }) {
    const fetch = await loadFetch();
    const url = new URL(`/api/collection`, apiUrl);
    const payload = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `BEARER ${apiKey}`
        },
        body: JSON.stringify({
            organizationId,
            name,
            description,
            type,
            instructions,
            graphInstructions,
            promptInstructions,
            searchInstructions,
            categories
        })
    });
    if (!payload.ok) {
        const errorResponse = await payload.json().catch(() => null);
        if (debug) {
            console.log(errorResponse);
        }
        return {
            status: 'ERROR',
            message: errorResponse?.message || 'There was an error creating a collection',
            id: ''
        };
    }
    const response = (await payload.json());
    return response;
}
