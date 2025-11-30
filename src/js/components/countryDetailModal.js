import * as bootstrap from "bootstrap";
import { clearElement, createElement } from "../utils/dom.js";
import { focusCountry, initMap, invalidateMap } from "../services/mapService.js";
import { fetchRateToEuro } from "../services/statsService.js";

let modalInstance = null;
let modalElement = null;
let currentCountry = null;
let onFavoriteToggleCallback = null;

/**
 * Initialiseert de modal (één keer aanroepen in main.js)
 */
export function initCountryModal(onFavoriteToggle) {
    modalElement = document.querySelector("#country_modal");
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

    // Titel en vlag
    title.textContent = country.name && country.name.common ? country.name.common : "Onbekend";
    if (flagImg) {
        flagImg.src = (country.flags && (country.flags.svg || country.flags.png)) || "";
        flagImg.alt = `${title.textContent} vlag`;
    }

    // Details: hoofdstad, regio, populatie, talen, valuta
    clearElement(detailsDl);
    clearElement(currencyInfo);

    const addDetail = (label, value) => {
        const dt = createElement("dt", "col-4", label);
        const dd = createElement("dd", "col-8", value || "—");
        detailsDl.appendChild(dt);
        detailsDl.appendChild(dd);
    };

    const capital = Array.isArray(country.capital) ? country.capital.join(", ") : country.capital || "—";
    const region = country.region || "—";
    const population = typeof country.population === "number" ? country.population.toLocaleString() : "—";

    const languages = country.languages ? Object.values(country.languages).join(", ") : "—";

    const currenciesObj = country.currencies || null;
    const currenciesList = currenciesObj
        ? Object.entries(currenciesObj).map(([code, info]) => `${code} — ${info.name || ""} ${info.symbol || ""}`)
        : ["—"];

    addDetail("Hoofdstad", capital);
    addDetail("Regio", region);
    addDetail("Populatie", population);
    addDetail("Talen", languages);
    addDetail("Valuta", currenciesList.join("; "));

    // Map: focus als we lat/lng hebben, anders toon waarschuwing

    const latlng = country.latlng?.length >= 2 ? country.latlng.map(Number) : null;

    if (!latlng || latlng.some(Number.isNaN)) {
        if (alertBox) {
            alertBox.classList.remove("d-none");
            alertBox.textContent = "Geen locatiegegevens beschikbaar voor deze locatie.";
        }
        return;
    }

    if (alertBox) alertBox.classList.add("d-none");

    const [lat, lng] = latlng;
    // Ensure the map is (re-)initialized and call focus AFTER the modal is visible
    // otherwise Leaflet doesn't know its container size.
    // initMap() is idempotent so it's safe to call multiple times.
    initMap();
    // show the modal first, then focus when shown
    modalInstance.show();
    if (modalElement) {
        const onShown = () => {
            try {
                invalidateMap();
                focusCountry(lat, lng, country.name?.common ?? "");
            } catch (err) {
                console.error("Error focusing country after modal shown", err);
            } finally {
                modalElement.removeEventListener("shown.bs.modal", onShown);
            }
        };
        modalElement.addEventListener("shown.bs.modal", onShown);
    } else {
        // Fallback
        focusCountry(lat, lng, country.name?.common ?? "");
    }

    // Wisselkoers: neem eerste currency code en vraag rate op ten opzichte van EUR
    if (currencyInfo) {
        if (currenciesObj) {
            const codes = Object.keys(currenciesObj);
            if (codes.length > 0) {
                const primary = codes[0];
                // plaats tijdelijke tekst
                currencyInfo.textContent = `Wisselkoers laden voor ${primary}...`;
                try {
                    const rate = await fetchRateToEuro(primary);
                    if (rate && typeof rate === "number") {
                        currencyInfo.textContent = `1 EUR = ${rate} ${primary}`;
                    } else {
                        currencyInfo.textContent = `Wisselkoers niet beschikbaar voor ${primary}`;
                    }
                } catch (err) {
                    console.error(err);
                    currencyInfo.textContent = `Fout bij ophalen wisselkoers`;
                }
            }
        }
    }

    // Favorite button appearance
    if (favBtn) {
        if (isFavorite) {
            favBtn.classList.remove("btn-outline-primary");
            favBtn.classList.add("btn-danger");
            favBtn.textContent = "Verwijder favoriet";
        } else {
            favBtn.classList.remove("btn-danger");
            favBtn.classList.add("btn-outline-primary");
            favBtn.textContent = "Voeg toe aan favorieten";
        }
    }

    modalInstance.show();
}
