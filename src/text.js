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

// "이름 <메일주소>" 같은 문자열을 innerHTML에 그대로 넣으면 <메일주소>가
// 태그로 해석되어 사라진다. 사용자에게 보여줄 일반 텍스트를 넣기 전에
// 반드시 이 함수로 이스케이프한다.
export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function renderTextSafe(str) {
  return escapeHtml(renderText(str));
}
