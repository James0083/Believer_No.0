import { buildTokenMap } from "./config.js";

export function renderText(str) {
  if (!str) return "";
  const tokens = buildTokenMap();
  return str.replace(/\{\{([A-Z0-9_]+)\}\}/g, (match, key) => {
    return Object.prototype.hasOwnProperty.call(tokens, key) ? tokens[key] : match;
  });
}

export function renderInto(el, str) {
  el.textContent = renderText(str);
}

export function renderHTML(str) {
  return renderText(str);
}
