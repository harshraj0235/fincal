// Lazy-loaded Crypto data
let cache: any[] | null = null;

export const loadCryptoData = async (): Promise<any[]> => {
    if (cache !== null) return cache;

    try {
        const { cryptoArticles } = await import('./cryptoData');
        cache = cryptoArticles || [];
        return cache;
    } catch (error) {
        console.error('Failed to load crypto data:', error);
        return [];
    }
};
