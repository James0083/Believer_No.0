import { listChildren, folderLabel, getFile, HEALTH_LOG_ROWS, ROSTER_ROWS } from "../data/files.js";
import { CAPTURE_EXTENDED_LINES, CAPTURE_FRAGMENT_LINES } from "../data/capturedChat.js";
import { renderText } from "../text.js";
import { markFileOpened, setFlags } from "../state.js";
import { discover } from "../clueEngine.js";
import { iconDataUri, scenePlaceholderDataUri, resolveSceneImage, chatScreenshotDataUri } from "../avatar.js";
import { openImageModal } from "../ui.js";
import { openWindow } from "../windowManager.js";

export function openFilesApp(startPath = "Desktop") {
  openWindow({
    appId: "files",
    title: "내 컴퓨터",
    icon: iconDataUri("computer"),
    width: 700,
    height: 480,
    render(body) {
      renderFiles(body, startPath);
    },
  });
}

function renderFiles(body, startPath) {
  let path = startPath;
  body.innerHTML = `<div class="file-crumbs" id="crumbs"></div><div class="file-grid" id="grid"></div>`;
  const crumbs = body.querySelector("#crumbs");
  const grid = body.querySelector("#grid");

  function renderCrumbs() {
    const parts = path.split("/");
    let acc = "";
    crumbs.innerHTML = parts
      .map((p, i) => {
        acc = i === 0 ? p : acc + "/" + p;
        return `<span data-path="${acc}">${folderLabel(acc)}</span>`;
      })
      .join(" / ");
    crumbs.querySelectorAll("span").forEach((s) => {
      s.addEventListener("click", () => {
        path = s.dataset.path;
        renderCrumbs();
        renderGrid();
      });
    });
  }

  function renderGrid() {
    const { folders, files } = listChildren(path);
    grid.innerHTML =
      folders
        .map(
          (f) => `<div class="file-item" data-folder="${f}">
            <img src="${iconDataUri("files")}" />
            <span>${folderLabel(f)}</span>
          </div>`
        )
        .join("") +
      files
        .map(
          (f) => `<div class="file-item" data-file="${f.id}">
            <img src="${iconDataUri(f.type === "image" || f.type === "chat-screenshot" ? "photos" : "notes")}" />
            <span>${renderText(f.name)}</span>
          </div>`
        )
        .join("");

    grid.querySelectorAll("[data-folder]").forEach((elm) => {
      elm.addEventListener("click", () => {
        grid.querySelectorAll(".file-item").forEach((e2) => e2.classList.remove("selected"));
        elm.classList.add("selected");
      });
      elm.addEventListener("dblclick", () => {
        path = elm.dataset.folder;
        renderCrumbs();
        renderGrid();
      });
    });
    grid.querySelectorAll("[data-file]").forEach((elm) => {
      elm.addEventListener("click", () => {
        grid.querySelectorAll(".file-item").forEach((e2) => e2.classList.remove("selected"));
        elm.classList.add("selected");
      });
      elm.addEventListener("dblclick", () => openFile(elm.dataset.file, body));
    });
  }

  renderCrumbs();
  renderGrid();
}

function openFile(id, windowBody) {
  const f = getFile(id);
  if (!f) return;
  markFileOpened(id);
  (f.clueIds || []).forEach(discover);
  setFlags(f.onOpenFlags || []);

  if (f.type === "roster") return openRosterViewer();
  if (f.type === "health-log") return openHealthLogViewer();
  if (f.type === "chatlog") return openChatLogViewer();
  if (f.type === "image") return openImageModal(scenePlaceholderDataUri(renderText(f.imageLabel || f.name)), renderText(f.name));
  if (f.type === "chat-screenshot") {
    const img = chatScreenshotDataUri(CAPTURE_FRAGMENT_LINES.map((l) => ({ text: renderText(l.text), mine: l.from === "FOLLOWER" })));
    return openImageModal(img, renderText(f.name));
  }
  if (f.type === "text") return openTextViewer(f);
}

function openTextViewer(f) {
  openWindow({
    appId: "filedoc-" + f.id,
    title: renderText(f.name),
    icon: iconDataUri("notes"),
    width: 480,
    height: 380,
    singleInstance: true,
    render(body) {
      body.innerHTML = `<div class="pane-content" style="white-space:pre-wrap;">${renderText(f.content)}</div>`;
    },
  });
}

function openRosterViewer() {
  openWindow({
    appId: "filedoc-roster",
    title: "초기_신도명부_스캔.jpg",
    icon: iconDataUri("photos"),
    width: 560,
    height: 520,
    render(body) {
      function draw(revealed) {
        body.innerHTML = `
          <div class="doc-scan-wrap">
            <img src="${resolveSceneImage("IMG-E01-SCAN", "초기 신도 명부 스캔")}" style="max-width:280px;margin-bottom:14px;box-shadow:0 2px 8px rgba(0,0,0,0.3);" />
            <table class="staff-table" style="max-width:420px;margin:0 auto;background:#f4f1e8;">
              <thead><tr><th>번호</th><th>이름</th><th>가입</th><th>비고</th></tr></thead>
              <tbody>
                ${ROSTER_ROWS.map((r) => {
                  if (r.hidden && !revealed) {
                    return `<tr style="opacity:0.35;"><td colspan="4">［훼손되어 판독 불가］</td></tr>`;
                  }
                  return `<tr class="${r.hidden ? "private" : ""}"><td>${r.no}</td><td>${renderText(r.name)}</td><td>${renderText(r.joined)}</td><td>${renderText(r.note)}</td></tr>`;
                }).join("")}
              </tbody>
            </table>
            ${!revealed ? '<button id="zoom-btn" style="margin-top:14px;">🔍 확대해서 판독 시도</button>' : '<p style="margin-top:12px;color:#7A433F;font-size:12px;">확대 결과: 001 위에 번호 하나가 지워져 있었습니다.</p>'}
          </div>
        `;
        const btn = body.querySelector("#zoom-btn");
        if (btn) {
          btn.addEventListener("click", () => {
            discover("CLUE-TRACE-000");
            draw(true);
          });
        }
      }
      draw(false);
    },
  });
}

function openHealthLogViewer() {
  openWindow({
    appId: "filedoc-health",
    title: renderText("{{LEADER}}_컨디션관리표.xls"),
    icon: iconDataUri("files"),
    width: 720,
    height: 460,
    render(body) {
      body.innerHTML = renderText(`
        <div class="pane-content">
          <img src="${resolveSceneImage("IMG-E02-DESK", "{{LEADER}}의 컨디션 관리 자료 주변")}" style="float:right;max-width:160px;margin:0 0 10px 12px;box-shadow:0 2px 8px rgba(0,0,0,0.25);" />
          <table class="staff-table">
            <thead><tr><th>날짜</th><th>식사</th><th>컨디션</th><th>일정</th><th>의식/설교</th><th>메모</th></tr></thead>
            <tbody>
              ${HEALTH_LOG_ROWS.map(
                (r) => `<tr><td>${r.date}</td><td>${r.meal}</td><td>${r.condition}</td><td>${r.schedule}</td><td>${r.ritual}</td><td>${renderText(r.note)}</td></tr>`
              ).join("")}
            </tbody>
          </table>
          <p style="color:var(--text-secondary);font-size:11.5px;margin-top:10px;">작성/관리: {{SUNHEE}}</p>
        </div>
      `);
    },
  });
}

function openChatLogViewer() {
  openWindow({
    appId: "filedoc-extlog",
    title: "대화로그_추가분.txt",
    icon: iconDataUri("notes"),
    width: 520,
    height: 420,
    render(body) {
      CAPTURE_EXTENDED_LINES.forEach((m) => (m.clueIds || []).forEach(discover));
      body.innerHTML = `
        <div class="pane-content" style="font-family:monospace;font-size:12px;line-height:1.8;">
          ${CAPTURE_EXTENDED_LINES
            .map((m) => `[${m.day} ${m.time}] ${renderText(m.from === "LEADER" ? "{{LEADER}}" : "{{FOLLOWER}}")}: ${renderText(m.text)}`)
            .join("<br/>")}
        </div>
      `;
    },
  });
}
