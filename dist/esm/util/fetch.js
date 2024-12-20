export default async function loadFetch() {
    if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
        // Running in a browser environment
        return fetch;
    }
    if (typeof process !== 'undefined') {
        // Running in a Node.js environment
        const { default: nodeFetch } = await import('node-fetch');
        return nodeFetch; // Align types with global fetch
    }
    throw new Error('Unsupported environment: neither browser nor Node.js detected.');
}
