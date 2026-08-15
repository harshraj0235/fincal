// Lazy-loaded Government Schemes data
let cache: any[] | null = null;
let categoryCache: any[] | null = null;

export const loadGovSchemesData = async (): Promise<{ schemes: any[], categories: any[] }> => {
    if (cache !== null && categoryCache !== null) {
        return { schemes: cache, categories: categoryCache };
    }

    try {
        const { governmentSchemes, schemeCategories } = await import('./governmentSchemesData');
        cache = governmentSchemes || [];
        categoryCache = schemeCategories || [];
        return { schemes: cache, categories: categoryCache };
    } catch (error) {
        console.error('Failed to load government schemes data:', error);
        return { schemes: [], categories: [] };
    }
};
