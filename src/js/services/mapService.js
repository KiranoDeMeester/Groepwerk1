import L from "leaflet";
import "leaflet/dist/leaflet.css";

let map;
let marker;

/**
 * Initialiseert de Leaflet-kaart in #country_map.
 */
export function initMap() {
    const mapContainer = document.querySelector("#country_map");
    if (!mapContainer) return;

    // Maak een Leaflet map als die nog niet bestaat
    if (!map) {
        map = L.map(mapContainer).setView([20, 0], 2);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        }).addTo(map);
    }
}

/**
 * Zoomt in op een bepaald land en toont een marker met naam.
 * @param {number} lat
 * @param {number} lng
 * @param {string} name
 */
export function focusCountry(lat, lng, name) {
    if (!map) return;
    if (typeof lat !== "number" || typeof lng !== "number") {
        console.warn("Ongeldige coördinaten voor focusCountry");
        return;
    }

    // Zoom naar het land en plaats een marker
    try {
        map.setView([lat, lng], 6);

        if (marker) {
            marker.remove();
        }

        marker = L.marker([lat, lng]).addTo(map);
        if (name) {
            marker.bindPopup(name).openPopup();
        }
    } catch (err) {
        console.error("focusCountry error:", err);
    }
}
