import { PHOTOS } from "../data/photos.js";
import { PEOPLE, STAFF_CREDENTIALS } from "../config.js";
import { renderText } from "../text.js";
import { discover } from "../clueEngine.js";
import { iconDataUri, resolveSceneImage, stickyNoteDataUri } from "../avatar.js";
import { openWindow } from "../windowManager.js";

export function openPhotosApp() {
  openWindow({
    appId: "photos",
    title: "사진",
    icon: iconDataUri("photos"),
    width: 700,
    height: 480,
    render(body) {
      renderPhotos(body);
    },
  });
}

function imageFor(p) {
  if (p.sticky) {
    return stickyNoteDataUri([
      renderText("staff.{{CULT_DOMAIN}}"),
      "id: " + STAFF_CREDENTIALS.username,
      "pw: " + STAFF_CREDENTIALS.password,
    ]);
  }
  return resolveSceneImage(p.imageId, renderText(p.caption));
}

function renderPhotos(body) {
  body.innerHTML = `<div class="photo-grid" id="grid"></div>`;
  const grid = body.querySelector("#grid");
  grid.innerHTML = PHOTOS.map(
    (p) => `<div class="photo-thumb" data-id="${p.id}">
      <img src="${imageFor(p)}" />
      <div class="cap">${renderText(p.caption)}</div>
    </div>`
  ).join("");

  grid.querySelectorAll(".photo-thumb").forEach((elm) => {
    elm.addEventListener("click", () => openViewer(elm.dataset.id, body));
  });
}

function openViewer(id, body) {
  const p = PHOTOS.find((x) => x.id === id);
  if (!p) return;
  (p.clueIds || []).forEach(discover);
  body.innerHTML = `
    <div class="photo-viewer">
      <img src="${imageFor(p)}" />
      <div class="photo-meta">
        <button id="back-btn">← 목록</button>
        <dl>
          <dt>파일명</dt><dd>${renderText(p.filename)}</dd>
          <dt>촬영일</dt><dd>${p.takenAt}</dd>
          <dt>수정일</dt><dd>${p.modifiedAt}</dd>
          <dt>장소</dt><dd>${renderText(p.location || "-")}</dd>
          <dt>인물</dt><dd>${(p.people || []).map((pid) => renderText(PEOPLE[pid]?.name || pid)).join(", ") || "-"}</dd>
          ${p.note ? `<dt>메모</dt><dd>${renderText(p.note)}</dd>` : ""}
        </dl>
      </div>
    </div>
  `;
  body.querySelector("#back-btn").addEventListener("click", () => renderPhotos(body));
}
