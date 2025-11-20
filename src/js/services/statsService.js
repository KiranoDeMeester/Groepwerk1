const EXCHANGE_API_BASE = "https://api.exchangerate.host/latest";

/**
 * Haal wisselkoers op van EUR naar currencyCode.
 * @param {string} currencyCode bijv. "USD"
 * @returns {Promise<number|null>} wisselkoers of null bij fout
 */
export async function fetchRateToEuro(currencyCode) {
    // TODO:
    // - bouw URL op met ?base=EUR&symbols=CURRENCY
    // - gebruik fetch + async/await
    // - haal de juiste rate uit data.rates[currencyCode]
    // - geef null terug bij fout

    return null;
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

    return {
        totalCountries: 0,
        averagePopulation: 0,
        favoritesPopulation: 0
    };
}
