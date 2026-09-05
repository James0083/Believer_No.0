import { CHAT_THREADS } from "../data/chats.js";
import { renderText } from "../text.js";
import { markChatRead, hasFlag, isChatRead } from "../state.js";
import { discover } from "../clueEngine.js";
import { iconDataUri, personAvatarDataUri } from "../avatar.js";
import { openWindow } from "../windowManager.js";

export function openMessengerApp() {
  openWindow({
    appId: "messenger",
    title: "메신저",
    icon: iconDataUri("messenger"),
    width: 760,
    height: 520,
    render(body) {
      renderMessenger(body);
    },
  });
}

function visibleThreads() {
  return CHAT_THREADS.filter((t) => t.alwaysVisible || !t.requiresFlag || hasFlag(t.requiresFlag));
}

function labelFor(from) {
  return from === "SENIOR" ? renderText("{{SENIOR}}") : from;
}

function renderMessenger(body) {
  let currentId = null;
  body.innerHTML = `
    <div class="app-3pane" style="height:100%;">
      <div class="app-pane" style="width:230px;" id="chat-list"></div>
      <div class="app-pane" style="flex:1;display:flex;flex-direction:column;" id="chat-thread-wrap"></div>
    </div>
  `;
  const listEl = body.querySelector("#chat-list");
  const threadWrap = body.querySelector("#chat-thread-wrap");

  function renderList() {
    listEl.innerHTML = visibleThreads()
      .map((t) => {
        const unread = !isChatRead(t.id);
        return `<div class="chat-list-item ${currentId === t.id ? "active" : ""}" data-id="${t.id}">
          <img src="${personAvatarDataUri(t.name, t.avatarSeed, t.avatarColor)}" />
          <div>
            <div style="font-weight:${unread ? "bold" : "normal"};font-size:12.5px;">${renderText(t.name)}</div>
            <div style="font-size:11px;color:var(--text-secondary);">${renderText(t.messages[t.messages.length - 1]?.text || "")}</div>
          </div>
        </div>`;
      })
      .join("");
    listEl.querySelectorAll(".chat-list-item").forEach((row) => {
      row.addEventListener("click", () => {
        currentId = row.dataset.id;
        renderThread(currentId);
        renderList();
      });
    });
  }

  function renderThread(id) {
    const t = CHAT_THREADS.find((x) => x.id === id);
    if (!t) return;
    markChatRead(id);
    const msgs = t.messages
      .filter((m) => !m.requiresFlag || hasFlag(m.requiresFlag))
      .slice()
      .sort((a, b) => (a.day + a.time < b.day + b.time ? -1 : 1));
    msgs.forEach((m) => (m.clueIds || []).forEach(discover));

    let lastDay = null;
    const rows = msgs
      .map((m) => {
        let dayDivider = "";
        if (m.day !== lastDay) {
          dayDivider = `<div class="chat-daydivider">${m.day}</div>`;
          lastDay = m.day;
        }
        return `${dayDivider}
        <div class="chat-bubble-row ${m.mine ? "mine" : "theirs"}">
          <div class="chat-sender">${labelFor(m.from)}</div>
          <div class="chat-bubble">${renderText(m.text)}</div>
          <div class="chat-time">${m.time}</div>
        </div>`;
      })
      .join("");

    threadWrap.innerHTML = `
      <div style="padding:10px 14px;border-bottom:1px solid var(--border);font-weight:bold;">${renderText(t.name)}</div>
      ${t.capturedNote ? `<div class="chat-captured-note" style="margin:10px 14px;">${renderText(t.capturedNote)}</div>` : ""}
      <div class="chat-thread" style="flex:1;overflow-y:auto;">${rows}</div>
    `;
  }

  renderList();
  const first = visibleThreads()[0];
  if (first) {
    currentId = first.id;
    renderThread(first.id);
    renderList();
  }
}
