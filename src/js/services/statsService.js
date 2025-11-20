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
    const totalCountries = countries.length;
    const averagePopulation = Math.round(
        countries.reduce((sum, c) => sum + c.population, 0) / totalCountries
    );
    const favoritesPopulation = countries
        .filter(c => favorites.includes(c.cca3))
        .reduce((sum, c) => sum + c.population, 0);

    return {
        totalCountries,
        averagePopulation,
        favoritesPopulation
    };
}
