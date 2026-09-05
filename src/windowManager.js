import { markAppOpened } from "./state.js";

let zTop = 100;
const windows = new Map(); // appId -> { el, config }
const listeners = new Set();

function notify() {
  listeners.forEach((fn) => fn(getOpenList()));
}

export function onWindowsChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getOpenList() {
  return Array.from(windows.entries()).map(([id, w]) => ({
    id,
    title: w.title,
    icon: w.icon,
    minimized: w.el.classList.contains("minimized"),
    focused: w.el.style.zIndex === String(zTop) && !w.el.classList.contains("minimized"),
  }));
}

function clampToDesktop(win) {
  const maxW = window.innerWidth;
  const maxH = window.innerHeight - 34;
  const rect = win.getBoundingClientRect();
  let left = parseInt(win.style.left, 10) || 0;
  let top = parseInt(win.style.top, 10) || 0;
  if (left + rect.width > maxW) left = Math.max(0, maxW - rect.width);
  if (top + rect.height > maxH) top = Math.max(0, maxH - rect.height);
  win.style.left = left + "px";
  win.style.top = top + "px";
}

export function focusWindow(appId) {
  const w = windows.get(appId);
  if (!w) return;
  w.el.classList.remove("minimized");
  zTop += 1;
  w.el.style.zIndex = zTop;
  notify();
}

export function toggleMinimize(appId) {
  const w = windows.get(appId);
  if (!w) return;
  if (w.el.classList.contains("minimized")) {
    focusWindow(appId);
  } else {
    w.el.classList.add("minimized");
    notify();
  }
}

export function closeWindow(appId) {
  const w = windows.get(appId);
  if (!w) return;
  w.el.remove();
  windows.delete(appId);
  notify();
}

function makeDraggable(win, handle) {
  let dragging = false;
  let startX, startY, origX, origY;
  handle.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".win-btn")) return;
    if (win.classList.contains("maximized")) return;
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    origX = parseInt(win.style.left, 10) || 0;
    origY = parseInt(win.style.top, 10) || 0;
    handle.setPointerCapture(e.pointerId);
  });
  handle.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    win.style.left = origX + (e.clientX - startX) + "px";
    win.style.top = Math.max(0, origY + (e.clientY - startY)) + "px";
  });
  handle.addEventListener("pointerup", () => { dragging = false; });
}

function makeResizable(win, handle) {
  let resizing = false;
  let startX, startY, origW, origH;
  handle.addEventListener("pointerdown", (e) => {
    resizing = true;
    startX = e.clientX;
    startY = e.clientY;
    origW = win.offsetWidth;
    origH = win.offsetHeight;
    handle.setPointerCapture(e.pointerId);
    e.stopPropagation();
  });
  handle.addEventListener("pointermove", (e) => {
    if (!resizing) return;
    win.style.width = Math.max(320, origW + (e.clientX - startX)) + "px";
    win.style.height = Math.max(220, origH + (e.clientY - startY)) + "px";
  });
  handle.addEventListener("pointerup", () => { resizing = false; });
}

export function openWindow({ appId, title, icon, width = 640, height = 440, x, y, render, singleInstance = true }) {
  markAppOpened(appId);
  if (singleInstance && windows.has(appId)) {
    focusWindow(appId);
    return windows.get(appId).api;
  }

  const el = document.createElement("div");
  el.className = "win";
  el.dataset.appId = appId;
  el.style.width = width + "px";
  el.style.height = height + "px";
  const offset = windows.size * 24;
  el.style.left = (x ?? 80 + offset) + "px";
  el.style.top = (y ?? 50 + offset) + "px";

  el.innerHTML = `
    <div class="win-titlebar">
      <img src="${icon}" alt="" />
      <div class="win-title">${title}</div>
      <button class="win-btn min" title="최소화">─</button>
      <button class="win-btn max" title="최대화">□</button>
      <button class="win-btn close" title="닫기">✕</button>
    </div>
    <div class="win-body"></div>
    <div class="win-resize-handle"></div>
  `;

  document.getElementById("windows-layer").appendChild(el);
  const titlebar = el.querySelector(".win-titlebar");
  const body = el.querySelector(".win-body");

  makeDraggable(el, titlebar);
  makeResizable(el, el.querySelector(".win-resize-handle"));

  el.addEventListener("pointerdown", () => focusWindow(appId));
  el.querySelector(".win-btn.close").addEventListener("click", () => closeWindow(appId));
  el.querySelector(".win-btn.min").addEventListener("click", () => toggleMinimize(appId));
  el.querySelector(".win-btn.max").addEventListener("click", () => {
    el.classList.toggle("maximized");
  });

  const api = {
    setTitle(t) { el.querySelector(".win-title").textContent = t; },
    body,
  };

  windows.set(appId, { el, title, icon, api });
  zTop += 1;
  el.style.zIndex = zTop;

  if (typeof render === "function") render(body, api);
  clampToDesktop(el);
  notify();
  return api;
}
