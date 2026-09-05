import { REPORTER_NOTES } from "../data/notes.js";
import { renderText } from "../text.js";
import { getState, setPlayerNotes } from "../state.js";
import { iconDataUri } from "../avatar.js";
import { openWindow } from "../windowManager.js";

export function openNotesApp() {
  openWindow({
    appId: "notes",
    title: "메모",
    icon: iconDataUri("notes"),
    width: 480,
    height: 460,
    render(body) {
      renderNotes(body);
    },
  });
}

function renderNotes(body) {
  let tab = "reporter";
  body.innerHTML = `
    <div class="notes-tabs">
      <button id="tab-reporter" class="active">선배의 메모</button>
      <button id="tab-player">내 메모</button>
    </div>
    <div id="notes-body" style="height:calc(100% - 38px);overflow-y:auto;"></div>
  `;
  const notesBody = body.querySelector("#notes-body");
  const tabReporter = body.querySelector("#tab-reporter");
  const tabPlayer = body.querySelector("#tab-player");

  function draw() {
    tabReporter.classList.toggle("active", tab === "reporter");
    tabPlayer.classList.toggle("active", tab === "player");
    if (tab === "reporter") {
      notesBody.innerHTML = REPORTER_NOTES.map(
        (n) => `<div class="note-item"><b>${renderText(n.title)}</b> <span style="color:var(--text-secondary);font-size:11px;">${n.date}</span>\n${renderText(n.body)}</div>`
      ).join("");
    } else {
      notesBody.innerHTML = `<textarea id="player-notes-textarea" placeholder="여기에 자유롭게 메모하세요.">${getState().playerNotes}</textarea>`;
      notesBody.querySelector("#player-notes-textarea").addEventListener("input", (e) => {
        setPlayerNotes(e.target.value);
      });
    }
  }

  tabReporter.addEventListener("click", () => { tab = "reporter"; draw(); });
  tabPlayer.addEventListener("click", () => { tab = "player"; draw(); });
  draw();
}
