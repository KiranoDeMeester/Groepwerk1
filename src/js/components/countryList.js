import { clearElement, createElement } from "../utils/dom.js";

/**
 * Render de lijst van landen in #country_list.
 *
 * @param {Object} config
 * @param {Array} config.countries
 * @param {Array} config.favorites
 * @param {Function} config.onCountryClick  (country) => void
 * @param {Function} config.onFavoriteToggle (country) => void
 */
export function renderCountryList({ countries, favorites, onCountryClick, onFavoriteToggle }) {
    const container = document.querySelector("#country_list");
    if (!container) return;

    clearElement(container);

    if (!countries || countries.length === 0) {
        const empty = createElement(
            "div",
            "col-12 alert alert-light border text-center mb-0",
            "Geen landen gevonden voor deze filter."
        );
        container.appendChild(empty);
        return;
    }

    countries.forEach((country) => {
        const col = createElement("div", "col");
        const card = createElement("div", "card h-100 shadow-sm border-0");
        const body = createElement("div", "card-body d-flex flex-column");

        // TODO:
        // - vlag, naam, regio, populatie tonen
        // - knop "Details" die onCountryClick(country) oproept
        // - knop/icon voor favoriet (onFavoriteToggle(country))
        // - check of dit land in favorites zit (kleur/icoon aanpassen)

        // vlag initialiseren
        const flag = createElement("img", "card-img-top b-2",);
        flag.src = country.flags.svg;
        flag.alt = `Vlag van ${country.name.common}`

        // naam, regio, populatie tonen
        const title = createElement("h5", "card-title mb-1");
        title.textContent = country.name.common;
        const info = createElement("p", "card-text small mb-2");
        info.innerHTML = `🌍 ${country.region}<br>👥 ${country.population.toLocaleString()}`;

        // buttons maken
        const btnGroup = createElement("div", "mt-auto d-flex justify-content-between align-items-center");
        const detailsBtn = createElement("button", "btn btn-sm btn-primary");
        detailsBtn.textContent = "Details";
        detailsBtn.addEventListener("click", () => onCountryClick(country));
        const favBtn = createElement("button", "btn btn-sm btn-outline-warning");
        favBtn.innerHTML = favorites.includes(country.cca3) ? "★" : "☆"; // ingevuld of leeg sterretje
        favBtn.addEventListener("click", () => {
            onFavoriteToggle(country);
            // meteen icoon updaten
            favBtn.innerHTML = favorites.includes(country.cca3) ? "★" : "☆";
        });

        // alles maken
        btnGroup.appendChild(detailsBtn);
        btnGroup.appendChild(favBtn);

        body.appendChild(flag);
        body.appendChild(title);
        body.appendChild(info);
        body.appendChild(btnGroup);

        card.appendChild(body);
        col.appendChild(card);
        container.appendChild(col);
    });
}
