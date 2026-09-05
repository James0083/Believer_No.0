import { CALLS } from "../data/calls.js";
import { renderText } from "../text.js";
import { markCallPlayed, isCallPlayed, hasFlag } from "../state.js";
import { iconDataUri, personAvatarDataUri } from "../avatar.js";
import { openWindow } from "../windowManager.js";

const PLAYBACK_SPEED_MULTIPLIER = 2; // 대사 간 간격을 2배로 늘려 절반 속도로 재생

export function openPhoneApp() {
  openWindow({
    appId: "phone",
    title: "통화기록",
    icon: iconDataUri("phone"),
    width: 420,
    height: 560,
    render(body) {
      renderCallList(body);
    },
  });
}

function visibleCalls() {
  return CALLS.filter((c) => !c.requiresFlag || hasFlag(c.requiresFlag));
}

function renderCallList(body) {
  body.innerHTML = `<div id="phone-view"></div>`;
  const view = body.querySelector("#phone-view");

  function showList() {
    view.innerHTML = `
      <div class="app-toolbar"><b>통화기록</b></div>
      <div>
        ${visibleCalls()
          .map(
            (c) => `
          <div class="list-row" data-id="${c.id}">
            <div class="phone-list-row">
              <span>${renderText(c.contactName)}</span>
              <span class="call-dir">${c.direction === "incoming" ? "수신" : "발신"} · ${c.durationLabel}</span>
            </div>
            <div class="row-meta">${c.dateLabel} ${c.time} ${isCallPlayed(c.id) ? "· 재생됨" : ""}</div>
          </div>`
          )
          .join("")}
      </div>
    `;
    view.querySelectorAll(".list-row").forEach((row) => {
      row.addEventListener("click", () => playCall(row.dataset.id));
    });
  }

  function playCall(id) {
    const call = CALLS.find((c) => c.id === id);
    if (!call) return;
    let idx = 0;
    let timer = null;
    let finished = false;

    view.innerHTML = `
      <div class="phone-screen">
        <div class="phone-status">통화 중</div>
        <div class="phone-timer">00:00</div>
        <img class="phone-avatar" src="${personAvatarDataUri(call.contactName, call.avatarSeed, call.avatarColor)}" />
        <div class="phone-caller">${renderText(call.contactName)}</div>
        <div class="phone-line" id="phone-line"></div>
        <div class="phone-controls">
          <button id="phone-next">다음 대사</button>
          <button id="phone-transcript">전체 대본</button>
          <button id="phone-end" class="primary">종료</button>
        </div>
      </div>
    `;

    const lineEl = view.querySelector("#phone-line");
    const timerEl = view.querySelector(".phone-timer");
    let seconds = 0;
    const timerInt = setInterval(() => {
      seconds += 1;
      const m = String(Math.floor(seconds / 60)).padStart(2, "0");
      const s = String(seconds % 60).padStart(2, "0");
      timerEl.textContent = `${m}:${s}`;
    }, 1000);

    function showLine() {
      if (idx >= call.lines.length) {
        finished = true;
        markCallPlayed(call.id);
        (call.onCompleteFlags || []).forEach(() => {});
        lineEl.innerHTML = `<i style="color:#8fa0a6;">통화가 종료되었습니다.</i>`;
        clearInterval(timerInt);
        return;
      }
      const line = call.lines[idx];
      lineEl.innerHTML = `<b>${renderText(labelFor(line.speaker, call))}</b><br/>“${renderText(line.text)}”`;
      idx += 1;
      timer = setTimeout(showLine, (line.delayMs || 1000) * PLAYBACK_SPEED_MULTIPLIER);
    }

    function labelFor(speaker, call) {
      if (speaker === "SENIOR") return "{{SENIOR}}";
      if (speaker === call.contactName) return call.contactName;
      return speaker;
    }

    showLine();

    view.querySelector("#phone-next").addEventListener("click", () => {
      clearTimeout(timer);
      showLine();
    });
    view.querySelector("#phone-end").addEventListener("click", () => {
      clearTimeout(timer);
      clearInterval(timerInt);
      markCallPlayed(call.id);
      showList();
    });
    view.querySelector("#phone-transcript").addEventListener("click", () => {
      clearTimeout(timer);
      clearInterval(timerInt);
      view.innerHTML = `
        <div class="app-toolbar"><button id="back-to-list">← 목록</button><b style="margin-left:8px;">${renderText(call.contactName)} 전체 대본</b></div>
        <div class="pane-content">
          ${call.lines
            .map((l) => `<p><b>${renderText(labelFor(l.speaker, call))}</b>: ${renderText(l.text)}</p>`)
            .join("")}
        </div>
      `;
      markCallPlayed(call.id);
      view.querySelector("#back-to-list").addEventListener("click", showList);
    });
  }

  showList();
}
