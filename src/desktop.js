import { iconDataUri } from "./avatar.js";
import { openMailApp } from "./apps/mail.js";
import { openMessengerApp } from "./apps/messenger.js";
import { openPhoneApp } from "./apps/phone.js";
import { openFilesApp } from "./apps/filesApp.js";
import { openPhotosApp } from "./apps/photosApp.js";
import { openNotesApp } from "./apps/notesApp.js";
import { openBrowserApp } from "./apps/browserApp.js";
import { EMAILS } from "./data/emails.js";
import { getState, onStateChange } from "./state.js";
import { onWindowsChange, focusWindow, toggleMinimize, openWindow } from "./windowManager.js";
import { SENIOR } from "./config.js";
import { renderText } from "./text.js";
import { showToast } from "./ui.js";

function openTrashApp() {
  openWindow({
    appId: "trash",
    title: "휴지통",
    icon: iconDataUri("trash"),
    width: 420,
    height: 320,
    render(body) {
      body.innerHTML = `<div class="pane-content" style="color:var(--text-secondary);text-align:center;padding-top:60px;">휴지통이 비어 있습니다.</div>`;
    },
  });
}

const ICONS = [
  { id: "computer", label: "내 컴퓨터", icon: "computer", open: () => openFilesApp() },
  { id: "browser", label: "브라우저", icon: "browser", open: () => openBrowserApp() },
  { id: "mail", label: "메일", icon: "mail", open: () => openMailApp(), badge: () => EMAILS.filter((e) => e.folder === "inbox" && !getState().readEmails.includes(e.id)).length },
  { id: "messenger", label: "메신저", icon: "messenger", open: () => openMessengerApp() },
  { id: "phone", label: "통화기록", icon: "phone", open: () => openPhoneApp() },
  { id: "photos", label: "사진", icon: "photos", open: () => openPhotosApp() },
  { id: "notes", label: "메모", icon: "notes", open: () => openNotesApp() },
  { id: "trash", label: "휴지통", icon: "trash", open: () => openTrashApp() },
];

export function initDesktop() {
  const desktop = document.getElementById("desktop");
  const iconsWrap = document.getElementById("desktop-icons");
  const taskWindows = document.getElementById("taskbar-windows");
  const clock = document.getElementById("tray-clock");

  iconsWrap.innerHTML = ICONS.map(
    (i) => `<div class="desktop-icon" data-id="${i.id}" tabindex="0">
      <img src="${iconDataUri(i.icon)}" />
      <span>${renderText(i.label)}</span>
      ${i.badge ? `<span class="desktop-badge" data-badge="${i.id}" style="display:none;"></span>` : ""}
    </div>`
  ).join("");

  iconsWrap.querySelectorAll(".desktop-icon").forEach((elm) => {
    const conf = ICONS.find((i) => i.id === elm.dataset.id);
    elm.addEventListener("dblclick", () => conf.open());
    elm.addEventListener("click", () => {
      iconsWrap.querySelectorAll(".desktop-icon").forEach((e2) => e2.classList.remove("selected"));
      elm.classList.add("selected");
    });
    elm.addEventListener("keydown", (e) => { if (e.key === "Enter") conf.open(); });
  });

  function updateBadges() {
    ICONS.forEach((i) => {
      if (!i.badge) return;
      const badgeEl = iconsWrap.querySelector(`[data-badge="${i.id}"]`);
      const n = i.badge();
      if (n > 0) { badgeEl.style.display = "flex"; badgeEl.textContent = n; } else { badgeEl.style.display = "none"; }
    });
  }
  updateBadges();
  onStateChange(updateBadges);

  function renderTaskbar(list) {
    taskWindows.innerHTML = list
      .map(
        (w) => `<div class="taskbar-item ${w.focused ? "focused" : ""}" data-id="${w.id}">
          <img src="${w.icon}" /> <span>${w.title}</span>
        </div>`
      )
      .join("");
    taskWindows.querySelectorAll(".taskbar-item").forEach((row) => {
      row.addEventListener("click", () => {
        const id = row.dataset.id;
        const item = list.find((w) => w.id === id);
        if (item && item.focused) toggleMinimize(id);
        else focusWindow(id);
      });
    });
  }
  onWindowsChange(renderTaskbar);

  function tick() {
    const now = new Date();
    clock.textContent = now.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
  }
  tick();
  setInterval(tick, 15000);

  initStartMenu();

  desktop.classList.add("active");
}

function initStartMenu() {
  const startBtn = document.getElementById("start-btn");
  let menu = null;

  function closeMenu() {
    if (menu) { menu.remove(); menu = null; }
    document.removeEventListener("click", onOutsideClick, true);
  }
  function onOutsideClick(e) {
    if (menu && !menu.contains(e.target) && e.target !== startBtn) closeMenu();
  }
  function openMenu() {
    menu = document.createElement("div");
    menu.className = "start-menu";
    menu.innerHTML = `
      <div class="start-menu-item" data-item="notes">메모</div>
      <div class="start-menu-item" data-item="settings">설정 (준비 중)</div>
      <div class="start-menu-item" data-item="about">이 컴퓨터에 대하여</div>
    `;
    document.getElementById("desktop").appendChild(menu);
    menu.querySelector('[data-item="notes"]').addEventListener("click", () => { closeMenu(); openNotesApp(); });
    menu.querySelector('[data-item="settings"]').addEventListener("click", () => { closeMenu(); showToast("준비 중인 기능입니다."); });
    menu.querySelector('[data-item="about"]').addEventListener("click", () => { closeMenu(); showToast(`${SENIOR.computerLabel} · 사용자: ${SENIOR.osAccountName}`); });
    setTimeout(() => document.addEventListener("click", onOutsideClick, true), 0);
  }

  startBtn.addEventListener("click", () => {
    if (menu) closeMenu();
    else openMenu();
  });
}

export function getSeniorAccountLabel() {
  return SENIOR.osAccountName;
}
