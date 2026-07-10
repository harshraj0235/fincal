/**
 * Unified lazy loading for strategic content silos to optimize performance.
 */
let siloCache: any = null;

export const loadSilosData = async () => {
    if (siloCache !== null) {
        return siloCache;
    }

    try {
        const silos = await import('./silos/index');
        siloCache = silos;
        return siloCache;
    } catch (error) {
        console.error('Failed to load strategic silos data:', error);
        return { allSilos: {}, siloCategories: [] };
    }
};

/** Match a slug across all silos */
export const findSiloItemBySlug = async (slug: string) => {
    const { allSilos } = await loadSilosData();
    for (const key in allSilos) {
        const item = (allSilos as any)[key].find((s: any) => s.slug === slug);
        if (item) return { item, type: key };
    }
    return null;
};
