const STORAGE_KEY = "world-explorer-favorites";

/**
 * Lees favorieten uit localStorage.
 * @returns {Array} lijst van favoriete landen (of lege array)
 */
export function loadFavorites() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed;
    } catch (err) {
        console.error("loadFavorites parse error:", err);
        return [];
    }
}

/**
 * Schrijf favorieten naar localStorage.
 * @param {Array} favorites
 */
export function saveFavorites(favorites) {
    try {
        const toWrite = Array.isArray(favorites) ? favorites : [];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toWrite));
    } catch (err) {
        console.error("saveFavorites error:", err);
    }
}
