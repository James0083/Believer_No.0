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
