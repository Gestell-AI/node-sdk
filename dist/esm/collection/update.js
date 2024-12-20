import loadFetch from 'util/fetch';
export async function updateCollection({ apiKey, apiUrl, debug, collectionId, organizationId, name, type, description, instructions, graphInstructions, promptInstructions, searchInstructions, tags }) {
    const fetch = await loadFetch();
    const url = new URL(`/api/collection/${collectionId}`, apiUrl);
    const payload = await fetch(url, {
        method: 'PATCH',
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
            tags
        })
    });
    if (!payload.ok) {
        const errorResponse = await payload.json().catch(() => null);
        if (debug) {
            console.log(errorResponse);
        }
        return {
            status: 'ERROR',
            message: errorResponse?.message || 'There was an error creating the collection',
            id: ''
        };
    }
    const response = (await payload.json());
    return response;
}
