export function showToast(text, ms = 3200) {
  const el = document.createElement("div");
  el.className = "clue-toast";
  el.textContent = text;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), ms);
}

export function openImageModal(src, caption = "") {
  const overlay = document.createElement("div");
  overlay.style.cssText =
    "position:fixed;inset:0;background:rgba(0,0,0,0.75);z-index:9997;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;cursor:zoom-out;";
  overlay.innerHTML = `
    <img src="${src}" alt="${caption}" style="max-width:80vw;max-height:80vh;box-shadow:0 6px 24px rgba(0,0,0,0.5);" />
    <div style="color:#f1f1ee;font-size:12px;">${caption}</div>
  `;
  overlay.addEventListener("click", () => overlay.remove());
  document.body.appendChild(overlay);
}

// input에 한글 등 원치 않는 문자가 (한글 자판 상태로 타이핑되거나 붙여넣기로)
// 들어와도 즉시 걸러낸다. IME 조합 결과까지 걸러내려면 keydown이 아니라
// input 이벤트를 써야 한다.
export function restrictInput(el, allowedPattern) {
  if (!el) return;
  el.addEventListener("input", () => {
    const filtered = el.value.replace(allowedPattern, "");
    if (filtered !== el.value) el.value = filtered;
  });
}

export function restrictToAlphanumeric(el) {
  restrictInput(el, /[^A-Za-z0-9]/g);
}

export function restrictToAlpha(el) {
  restrictInput(el, /[^A-Za-z]/g);
}

// 영문 + 숫자 + 특수문자(키보드로 입력 가능한 아스키 기호)까지 허용하되,
// 한글·기타 비영문 문자는 걸러낸다. 비밀번호 입력칸에 쓴다.
export function restrictToAsciiPassword(el) {
  restrictInput(el, /[^\x20-\x7E]/g);
}

export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") node.className = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else if (v !== undefined && v !== null) node.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach((c) => {
    if (c === null || c === undefined) return;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  });
  return node;
}
