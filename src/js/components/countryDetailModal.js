import * as bootstrap from "bootstrap";
import { clearElement, createElement } from "../utils/dom.js";
import { focusCountry } from "../services/mapService.js";
import { fetchRateToEuro } from "../services/statsService.js";

let modalInstance = null;
let currentCountry = null;
let onFavoriteToggleCallback = null;

/**
 * Initialiseert de modal (één keer aanroepen in main.js)
 */
export function initCountryModal(onFavoriteToggle) {
    const modalElement = document.querySelector("#country_modal");
    if (!modalElement) return;
    modalInstance = new bootstrap.Modal(modalElement);
    onFavoriteToggleCallback = onFavoriteToggle;

    const favBtn = document.querySelector("#favorite_toggle_btn");
    if (favBtn) {
        favBtn.addEventListener("click", () => {
            if (currentCountry && typeof onFavoriteToggleCallback === "function") {
                onFavoriteToggleCallback(currentCountry);
            }
        });
    }
}

/**
 * Toon de modal voor een bepaald land.
 * @param {Object} country
 * @param {boolean} isFavorite
 */
export async function showCountryDetail(country, isFavorite) {
    if (!modalInstance || !country) return;
    currentCountry = country;

    const title = document.querySelector("#country_modal_label");
    const flagImg = document.querySelector("#country_flag");
    const detailsDl = document.querySelector("#country_details");
    const alertBox = document.querySelector("#country_modal_alert");
    const currencyInfo = document.querySelector("#currency_info");
    const favBtn = document.querySelector("#favorite_toggle_btn");

    // TODO:
    // - titel invullen (country.name.common)
    // - vlag src/alt instellen
    // - detailsDl leegmaken en opnieuw vullen met dt/dd voor:
    //   hoofdstad, regio, populatie, talen, valuta
    clearElement(detailsDl);
    clearElement(currencyInfo);

    // TODO: alertBox verbergen of tonen afhankelijk van geodata (lat/lng)
    // - lat/lng zoeken in country.latlng
    // - als aanwezig: focusCountry(lat, lng, name)
    // - anders: nette melding tonen en map eventueel "disable"-stijl geven

    // TODO: wisselkoers-info ophalen
    // - eerste currency-code bepalen uit country.currencies
    // - fetchRateToEuro(code) aanroepen
    // - resultaat tonen in currencyInfo
    // - foutmeldingen netjes afhandelen

    // TODO: tekst/appearance van favBtn aanpassen op basis van isFavorite

    modalInstance.show();
}
