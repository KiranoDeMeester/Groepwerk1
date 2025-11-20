/**
 * onderstaand url kan niet meer up to date zijn
 controleer zelf de api
 */
const COUNTRIES_API_URL = "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,latlng,languages,currencies,cca3";

/**
 * Haalt alle landen op via de REST Countries API.
 * @returns {Promise<Array>} array van landen
 */
export async function fetchAllCountries() {
    // TODO:
    // - gebruik fetch om COUNTRIES_API_URL op te halen
    // - controleer res.ok
    // - parse JSON en geef de array terug
    // - gooi een fout bij problemen
    try{
        const res = await fetch(COUNTRIES_API_URL);
        if (!res.ok) throw new Error("Fout bij laden van de landen");

        const landen = await res.json();


    }
    catch(error){
        throw new Error(`Fout bij laden landen: ${error.message}`);
    }
}