/**
 * Maakt een element met optionele class(es) en text.
 */
export function createElement(tag, className = "", text = "") {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
}

/**
 * Verwijdert alle child nodes uit een element.
 */
export function clearElement(el) {
    if (!el) return;
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}
