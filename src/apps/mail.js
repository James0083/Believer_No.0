import { EMAILS } from "../data/emails.js";
import { CAPTURE_FRAGMENT_LINES } from "../data/capturedChat.js";
import { renderText, renderTextSafe } from "../text.js";
import { markEmailRead, isEmailRead } from "../state.js";
import { discover } from "../clueEngine.js";
import { iconDataUri, chatScreenshotDataUri } from "../avatar.js";
import { openImageModal } from "../ui.js";
import { openWindow } from "../windowManager.js";

function captureImageDataUri() {
  return chatScreenshotDataUri(
    CAPTURE_FRAGMENT_LINES.map((l) => ({ text: renderText(l.text), mine: l.from === "FOLLOWER" }))
  );
}

const FOLDERS = [
  { id: "inbox", label: "받은편지함" },
  { id: "sent", label: "보낸편지함" },
  { id: "draft", label: "임시보관" },
  { id: "archive", label: "보관함" },
  { id: "trash", label: "휴지통" },
];

export function openMailApp() {
  openWindow({
    appId: "mail",
    title: "메일",
    icon: iconDataUri("mail"),
    width: 820,
    height: 520,
    render(body) {
      renderMail(body);
    },
  });
}

function renderMail(body) {
  let currentFolder = "inbox";
  let currentEmailId = null;

  body.innerHTML = `
    <div class="app-3pane" style="height:100%;">
      <div class="app-pane" style="width:130px;padding-top:6px;">
        ${FOLDERS.map((f) => `<div class="list-row folder-row" data-folder="${f.id}">${f.label}</div>`).join("")}
      </div>
      <div class="app-pane" style="width:250px;" id="mail-list"></div>
      <div class="app-pane" style="flex:1;" id="mail-content"><div class="pane-content" style="color:var(--text-secondary);">메일을 선택하세요.</div></div>
    </div>
  `;

  const folderRows = body.querySelectorAll(".folder-row");
  const listPane = body.querySelector("#mail-list");
  const contentPane = body.querySelector("#mail-content");

  function renderList() {
    folderRows.forEach((r) => r.classList.toggle("active", r.dataset.folder === currentFolder));
    const items = EMAILS.filter((e) => e.folder === currentFolder).sort((a, b) => (a.sentAt < b.sentAt ? 1 : -1));
    listPane.innerHTML = items
      .map((e) => {
        const unread = !isEmailRead(e.id) && e.folder !== "sent" && e.folder !== "draft";
        return `<div class="list-row ${unread ? "unread" : ""} ${currentEmailId === e.id ? "active" : ""}" data-id="${e.id}">
          <div class="row-title">${renderText(e.subject)}</div>
          <div class="row-meta">${renderTextSafe(e.from)} · ${e.sentAt.slice(0, 10)}</div>
        </div>`;
      })
      .join("") || `<div class="pane-content" style="color:var(--text-secondary);">비어있음</div>`;

    listPane.querySelectorAll(".list-row").forEach((row) => {
      row.addEventListener("click", () => {
        currentEmailId = row.dataset.id;
        openEmail(currentEmailId);
      });
    });
  }

  function openEmail(id) {
    const e = EMAILS.find((x) => x.id === id);
    if (!e) return;
    markEmailRead(id);
    (e.clueIds || []).forEach(discover);
    renderList();
    contentPane.innerHTML = `
      <div class="pane-content">
        <div class="mail-header">
          <h3>${renderText(e.subject)}</h3>
          <div class="mail-meta-row">보낸사람: ${renderTextSafe(e.from)}</div>
          <div class="mail-meta-row">받는사람: ${(e.to || []).map(renderTextSafe).join(", ") || "-"}</div>
          <div class="mail-meta-row">${e.sentAt.replace("T", " ")}</div>
        </div>
        <div class="mail-body">${renderText(e.body)}</div>
        ${(e.attachments || [])
          .map((a) => `<div class="attachment-chip" data-att="${a}">📎 ${a}</div>`)
          .join("")}
      </div>
    `;
    contentPane.querySelectorAll(".attachment-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        openImageModal(captureImageDataUri(), chip.dataset.att);
      });
    });
  }

  folderRows.forEach((row) => {
    row.addEventListener("click", () => {
      currentFolder = row.dataset.folder;
      currentEmailId = null;
      contentPane.innerHTML = `<div class="pane-content" style="color:var(--text-secondary);">메일을 선택하세요.</div>`;
      renderList();
    });
  });

  renderList();
}
