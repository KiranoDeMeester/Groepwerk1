


// eigen voor leafletoptimalisatie



/**
 * Initialiseert de Leaflet-kaart in #country_map.
 */
import L from "leaflet";
import "leaflet/dist/leaflet.css";

let map = null;
let marker = null;
let lastGeoLayer = null;

const DEFAULT_CENTER = [20, 0];
const DEFAULT_ZOOM = 2;

/**
 * Initialiseert de Leaflet-kaart in een element met id #country_map (standaard).
 * Dit kan veilig aangeroepen worden op DOMContentLoaded, maar als het element
 * nog verborgen is (bv. modal), roep `invalidateMap()` aan na het openen van
 * de modal zodat Leaflet z'n berekeningen opnieuw doet.
 *
 * @param {string|HTMLElement} containerOrId
 */
export function initMap(containerOrId = "country_map") {
    const mapContainer = typeof containerOrId === "string"
        ? document.getElementById(containerOrId)
        : containerOrId;

    if (!mapContainer) return;
    if (map) return; // kaart reeds gemaakt

    // Zorg dat de element de juiste afmetingen heeft (in case inline style override)
    mapContainer.style.width = mapContainer.style.width || "100%";
    // Let op: container parent (country_map_container) heeft expliciete hoogte

    map = L.map(mapContainer).setView(DEFAULT_CENTER, DEFAULT_ZOOM);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(map);
}

/**
 * Handmatig invalidaten wanneer de container van de kaart zichtbaar wordt
 * (bijv. na het openen van een Bootstrap modal).
 */
export function invalidateMap() {
    if (!map) return;
    setTimeout(() => {
        try {
            map.invalidateSize();
        } catch (err) {
            console.warn("invalidateMap error", err);
        }
    }, 100);
}

/**
 * Zoomt in op een bepaald land en toont een marker met naam.
 * @param {number} lat
 * @param {number} lng
 * @param {string} name
 * @param {*} geoJsonData
 */
export function focusCountry(lat, lng, name = "", geoJsonData = null) {
    if (!map) return;
    if (typeof lat !== "number" || typeof lng !== "number") {
        console.warn("Ongeldige coördinaten voor focusCountry");
        return;
    }

    // verwijder vorige marker/layer
    if (marker) {
        map.removeLayer(marker);
        marker = null;
    }
    if (lastGeoLayer) {
        map.removeLayer(lastGeoLayer);
        lastGeoLayer = null;
    }

    try {
        // Forceer herberekening van maatvoering voor verborgen containers
        map.invalidateSize();

        if (geoJsonData) {
            lastGeoLayer = L.geoJSON(geoJsonData).addTo(map);
            try {
                map.fitBounds(lastGeoLayer.getBounds(), { padding: [30, 30] });
            } catch (err) {
                // fallback to center
                map.setView([lat, lng], 5);
            }
        } else {
            map.setView([lat, lng], 5);
            marker = L.marker([lat, lng]);
            if (name) marker.bindPopup(name);
            marker.addTo(map);
        }
    } catch (err) {
        console.error("focusCountry error:", err);
    }
}

