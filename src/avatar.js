// 모든 "사진"은 비용이 들지 않도록 코드로 생성한 SVG placeholder를 사용한다.
// 실제 원화/사진으로 교체할 때는 이 파일의 함수가 반환하는 data URI만
// 실제 이미지 경로로 바꿔치기하면 된다 (호출부 수정 불필요).
//
// 인물 아바타(초상)와 앱 아이콘은 web/assets/images/ 폴더의 실제 .svg 파일로
// 존재한다 (assets.js 참고). 아직 정적 파일이 없는 seed/kind는 즉석에서
// 생성한 SVG data URI로 대체된다.

import { ICON_ASSET_PATHS, PORTRAIT_ASSET_PATHS, IMAGE_MANIFEST } from "./assets.js";

// imageId가 IMAGE_MANIFEST(실제 생성된 원화)에 있으면 그 경로를, 없으면
// 코드로 그린 placeholder를 반환한다. 원화가 새로 생기면 assets.js의
// IMAGE_MANIFEST에 한 줄만 추가하면 이 함수를 쓰는 모든 곳에 자동 반영된다.
export function resolveSceneImage(imageId, fallbackLabel) {
  if (imageId && IMAGE_MANIFEST[imageId]) return IMAGE_MANIFEST[imageId];
  return scenePlaceholderDataUri(fallbackLabel);
}

function hashSeed(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return h;
}

function initials(name) {
  if (!name) return "?";
  const cleaned = name.replace(/[^가-힣A-Za-z]/g, "");
  if (/^[가-힣]+$/.test(cleaned)) return cleaned.slice(-2);
  return cleaned.slice(0, 2).toUpperCase();
}

export function personAvatarDataUri(name, seed, color = "#446A82") {
  if (PORTRAIT_ASSET_PATHS[seed]) return PORTRAIT_ASSET_PATHS[seed];
  const label = initials(name);
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
    <rect width="160" height="160" fill="${color}"/>
    <circle cx="80" cy="64" r="30" fill="#F1F1EE" opacity="0.85"/>
    <ellipse cx="80" cy="140" rx="52" ry="34" fill="#F1F1EE" opacity="0.85"/>
    <text x="80" y="158" font-family="Malgun Gothic, Noto Sans KR, sans-serif" font-size="20"
      fill="#ffffff" text-anchor="middle" opacity="0.001">${label}</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

const PALETTE = ["#60747D", "#7A5C6E", "#5C6B4E", "#9A633D", "#446A82", "#686E72"];

export function scenePlaceholderDataUri(label, seed = label) {
  const h = hashSeed(String(seed));
  const bg = PALETTE[h % PALETTE.length];
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="480" height="320" viewBox="0 0 480 320">
    <rect width="480" height="320" fill="${bg}"/>
    <rect x="0" y="230" width="480" height="90" fill="#00000022"/>
    <circle cx="150" cy="150" r="46" fill="#F1F1EE" opacity="0.75"/>
    <ellipse cx="150" cy="250" rx="80" ry="52" fill="#F1F1EE" opacity="0.75"/>
    <circle cx="300" cy="160" r="38" fill="#F1F1EE" opacity="0.55"/>
    <ellipse cx="300" cy="250" rx="66" ry="46" fill="#F1F1EE" opacity="0.55"/>
    <rect x="12" y="284" width="456" height="24" fill="#00000055"/>
    <text x="24" y="300" font-family="Malgun Gothic, Noto Sans KR, sans-serif" font-size="13"
      fill="#F1F1EE">${label}</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

export function docScanDataUri(label) {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="420" height="560" viewBox="0 0 420 560">
    <rect width="420" height="560" fill="#F4F1E8"/>
    <rect x="18" y="18" width="384" height="524" fill="none" stroke="#C8C1AC" stroke-width="1"/>
    ${Array.from({ length: 14 })
      .map(
        (_, i) =>
          `<rect x="40" y="${60 + i * 30}" width="${300 - (i % 4) * 40}" height="8" fill="#3A372E" opacity="0.55"/>`
      )
      .join("")}
    <text x="40" y="40" font-family="Malgun Gothic, Noto Sans KR, sans-serif" font-size="14" fill="#7A433F">${label}</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

export function stickyNoteDataUri(lines = []) {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="480" height="320" viewBox="0 0 480 320">
    <rect width="480" height="320" fill="#5a5f57"/>
    <g transform="translate(150,90) rotate(-3)">
      <rect width="200" height="150" fill="#fff6a8" stroke="#d8cf70"/>
      ${lines
        .map(
          (l, i) =>
            `<text x="16" y="${34 + i * 24}" font-family="Malgun Gothic, Noto Sans KR, sans-serif" font-size="16" fill="#3a3a2a">${l}</text>`
        )
        .join("")}
    </g>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

function escapeXml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// 캡처(스크린샷)로 발견되는 대화. 실시간 메신저 스레드가 아니라
// 이미지 파일로 존재해야 한다는 설계 원칙에 따라, 대사를 이미지 위에
// 직접 그려서 반환한다. lines: [{ text, mine }]
export function chatScreenshotDataUri(lines) {
  const rowH = 46;
  const height = 60 + lines.length * rowH;
  const bubbles = lines
    .map((l, i) => {
      const y = 50 + i * rowH;
      const w = Math.min(300, 40 + l.text.length * 9);
      const x = l.mine ? 460 - w : 20;
      const fill = l.mine ? "#fbe8a6" : "#dbe4e8";
      return `
        <rect x="${x}" y="${y}" width="${w}" height="30" rx="10" fill="${fill}" />
        <text x="${x + 12}" y="${y + 20}" font-family="Malgun Gothic, Noto Sans KR, sans-serif" font-size="13" fill="#25282A">${escapeXml(l.text)}</text>
      `;
    })
    .join("");
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="480" height="${height}" viewBox="0 0 480 ${height}">
    <rect width="480" height="${height}" fill="#1c1f22"/>
    <rect x="0" y="0" width="480" height="34" fill="#2b3338"/>
    <text x="16" y="22" font-family="Malgun Gothic, Noto Sans KR, sans-serif" font-size="12" fill="#8fa0a6">스크린샷 캡처</text>
    ${bubbles}
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

export function iconDataUri(kind) {
  if (ICON_ASSET_PATHS[kind]) return ICON_ASSET_PATHS[kind];
  const shapes = {
    mail: '<rect x="20" y="34" width="88" height="60" rx="4" fill="#F1F1EE" stroke="#25282A" stroke-width="3"/><path d="M20 36 L64 72 L108 36" fill="none" stroke="#25282A" stroke-width="3"/>',
    browser:
      '<circle cx="64" cy="64" r="42" fill="#F1F1EE" stroke="#25282A" stroke-width="3"/><path d="M22 64 H106 M64 22 V106 M35 38 Q64 64 35 90 M93 38 Q64 64 93 90" fill="none" stroke="#25282A" stroke-width="2.5"/>',
    messenger:
      '<rect x="18" y="26" width="92" height="64" rx="10" fill="#F1F1EE" stroke="#25282A" stroke-width="3"/><path d="M40 90 L40 106 L60 90 Z" fill="#F1F1EE" stroke="#25282A" stroke-width="3"/>',
    files:
      '<path d="M18 40 h30 l10 12 h52 v46 h-92 z" fill="#F1F1EE" stroke="#25282A" stroke-width="3"/>',
    photos:
      '<rect x="18" y="26" width="92" height="76" rx="4" fill="#F1F1EE" stroke="#25282A" stroke-width="3"/><circle cx="42" cy="52" r="9" fill="#25282A"/><path d="M18 90 L46 64 L70 82 L92 58 L110 78 V102 H18 Z" fill="#25282A"/>',
    phone:
      '<rect x="42" y="16" width="44" height="96" rx="8" fill="#F1F1EE" stroke="#25282A" stroke-width="3"/><line x1="42" y1="94" x2="86" y2="94" stroke="#25282A" stroke-width="2"/>',
    notes:
      '<rect x="26" y="18" width="76" height="92" fill="#F1F1EE" stroke="#25282A" stroke-width="3"/><line x1="38" y1="40" x2="90" y2="40" stroke="#25282A" stroke-width="2"/><line x1="38" y1="56" x2="90" y2="56" stroke="#25282A" stroke-width="2"/><line x1="38" y1="72" x2="78" y2="72" stroke="#25282A" stroke-width="2"/>',
    trash:
      '<path d="M32 40 h64 v64 h-64 z" fill="#F1F1EE" stroke="#25282A" stroke-width="3"/><path d="M24 40 h80 M50 40 v-10 h28 v10" fill="none" stroke="#25282A" stroke-width="3"/>',
    computer:
      '<rect x="20" y="28" width="88" height="56" rx="3" fill="#F1F1EE" stroke="#25282A" stroke-width="3"/><rect x="48" y="90" width="32" height="8" fill="#25282A"/>',
  };
  const inner = shapes[kind] || shapes.files;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">${inner}</svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}
