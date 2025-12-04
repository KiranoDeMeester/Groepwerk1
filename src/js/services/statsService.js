// Using open.er-api.com as provided by the user. We'll request rates with EUR as base.
const EXCHANGE_API_BASE = "https://open.er-api.com/v6/latest";

/**
 * Haal wisselkoers op van EUR naar currencyCode.
 * @param {string} currencyCode bijv. "USD"
 * @returns {Promise<number|null>} wisselkoers of null bij fout
 */
export async function fetchRateToEuro(currencyCode) {
    if (!currencyCode) return null;

    try {
        // Request latest rates with EUR as base
        const url = `${EXCHANGE_API_BASE}/EUR`;
        const res = await fetch(url);
        if (!res.ok) return null;
        const data = await res.json();

        const rate = data && data.rates ? data.rates[currencyCode] : null;
        return typeof rate === "number" ? rate : null;
    } catch (err) {
        console.error("fetchRateToEuro error:", err);
        return null;
    }
}

/**
 * Bereken statistieken op basis van gefilterde landen en favorieten.
 * @param {Array} countries huidige gefilterde landen
 * @param {Array} favorites lijst van favorieten
 */
export function calculateStats(countries, favorites) {
    // TODO:
    // - totalCountries
    // - averagePopulation
    // - favoritesPopulation
    const totalCountries = countries.length;

    const averagePopulation =
        totalCountries === 0
            ? 0
            : Math.round(
                countries.reduce((sum, c) => sum + c.population, 0) /
                totalCountries
            );

    const favoritesPopulation = favorites.reduce((sum, fav) => {

        const fullMatch =
            countries.find(c => c.cca3 === fav.cca3) ||
            window.allCountries?.find(c => c.cca3 === fav.cca3);

        return sum + (fullMatch ? fullMatch.population : 0);
    }, 0);

    return {
        totalCountries,
        averagePopulation,
        favoritesPopulation
    };
}
