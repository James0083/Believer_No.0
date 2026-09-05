import { renderText } from "../text.js";
import {
  markPageVisited,
  setFlag,
  setStaffLoggedIn,
  hasFlag,
  getState,
  pushSearch,
} from "../state.js";
import { discover } from "../clueEngine.js";
import { STAFF_CREDENTIALS, PEOPLE } from "../config.js";
import { iconDataUri, resolveSceneImage, personAvatarDataUri } from "../avatar.js";
import { getPhoto } from "../data/photos.js";
import { openWindow } from "../windowManager.js";
import { FLAGS } from "../data/flags.js";
import { BOARD_POSTS, EVENTS, CULT_ABOUT_TEXT, CULT_LEADER_BIO, CULT_BELIEFS } from "../data/cultSite.js";
import { findResultForQuery, SEARCH_RESULTS } from "../data/search.js";
import { MEMBER_ROWS, STAFF_MESSENGER_LOG, STAFF_DOCS } from "../data/staffSite.js";
import { ARCHIVE_OLD_MEMBER_ROWS, ARCHIVE_INTRO } from "../data/archive.js";

const BOOKMARKS_BASE = [{ label: "포털", url: "portal:/home" }, { label: "{{CULT_NAME}}", url: "cult:/home" }];

function prettyUrl(key) {
  const domain = renderText("{{CULT_DOMAIN}}");
  if (key.startsWith("portal:")) return "portal.local" + key.slice(7);
  if (key.startsWith("search:")) return "search.local" + key.slice(7);
  if (key.startsWith("cult:")) return domain + key.slice(5);
  if (key.startsWith("staff:")) return "staff." + domain + key.slice(6);
  if (key.startsWith("archive:")) return "archive." + domain + key.slice(8);
  return key;
}

function parseTypedUrl(text) {
  const domain = renderText("{{CULT_DOMAIN}}");
  const t = text.trim();
  if (t.startsWith("portal.local")) return "portal:" + (t.slice("portal.local".length) || "/home");
  if (t.startsWith("search.local")) return "search:" + (t.slice("search.local".length) || "/");
  if (t.startsWith("staff." + domain)) return "staff:" + (t.slice(("staff." + domain).length) || "/login");
  if (t.startsWith("archive." + domain)) return "archive:" + (t.slice(("archive." + domain).length) || "/home");
  if (t.startsWith(domain)) return "cult:" + (t.slice(domain.length) || "/home");
  return null;
}

export function openBrowserApp(initialUrl = "portal:/home") {
  openWindow({
    appId: "browser",
    title: "브라우저",
    icon: iconDataUri("browser"),
    width: 900,
    height: 600,
    render(body) {
      renderBrowser(body, initialUrl);
    },
  });
}

function renderBrowser(body, initialUrl) {
  const stack = [initialUrl];
  let idx = 0;

  body.innerHTML = `
    <div class="app-toolbar">
      <button id="btn-back">←</button>
      <button id="btn-fwd">→</button>
      <button id="btn-refresh">⟳</button>
      <input type="text" id="addr-bar" />
      <button id="btn-go">이동</button>
      <button id="btn-bookmarks">즐겨찾기</button>
      <button id="btn-history">기록</button>
    </div>
    <div class="page-frame" id="page-frame"></div>
  `;

  const addr = body.querySelector("#addr-bar");
  const frame = body.querySelector("#page-frame");
  const btnBack = body.querySelector("#btn-back");
  const btnFwd = body.querySelector("#btn-fwd");

  function currentKey() { return stack[idx]; }

  function updateNavButtons() {
    btnBack.disabled = idx <= 0;
    btnFwd.disabled = idx >= stack.length - 1;
  }

  function go(key, { push = true } = {}) {
    if (push) {
      stack.splice(idx + 1);
      stack.push(key);
      idx = stack.length - 1;
    }
    addr.value = prettyUrl(key);
    markPageVisited(key);
    updateNavButtons();
    renderRoute(key, frame, go);
  }

  btnBack.addEventListener("click", () => { if (idx > 0) { idx -= 1; addr.value = prettyUrl(currentKey()); renderRoute(currentKey(), frame, go); updateNavButtons(); } });
  btnFwd.addEventListener("click", () => { if (idx < stack.length - 1) { idx += 1; addr.value = prettyUrl(currentKey()); renderRoute(currentKey(), frame, go); updateNavButtons(); } });
  body.querySelector("#btn-refresh").addEventListener("click", () => renderRoute(currentKey(), frame, go));
  body.querySelector("#btn-go").addEventListener("click", () => tryNavigateTyped());
  addr.addEventListener("keydown", (e) => { if (e.key === "Enter") tryNavigateTyped(); });

  function tryNavigateTyped() {
    const parsed = parseTypedUrl(addr.value);
    if (parsed) go(parsed);
    else go("portal:/notfound");
  }

  body.querySelector("#btn-bookmarks").addEventListener("click", () => {
    const marks = BOOKMARKS_BASE.slice();
    if (hasFlag(FLAGS.FOUND_STAFF_URL)) marks.push({ label: "업무시스템", url: "staff:/login" });
    if (hasFlag(FLAGS.FOUND_ARCHIVE_URL)) marks.push({ label: "옛 사이트(Archive)", url: "archive:/home" });
    frame.innerHTML = `<div class="history-list"><b>즐겨찾기</b>${marks
      .map((m) => `<div class="history-row" data-url="${m.url}" style="cursor:pointer;color:var(--accent);">${renderText(m.label)} — ${prettyUrl(m.url)}</div>`)
      .join("")}</div>`;
    frame.querySelectorAll("[data-url]").forEach((r) => r.addEventListener("click", () => go(r.dataset.url)));
  });

  body.querySelector("#btn-history").addEventListener("click", () => {
    const visited = getState().visitedPages.filter((k) => k.includes(":"));
    frame.innerHTML = `<div class="history-list"><b>방문 기록</b>${
      visited.map((k) => `<div class="history-row" data-url="${k}" style="cursor:pointer;">${prettyUrl(k)}</div>`).join("") ||
      "<div class='history-row'>기록 없음</div>"
    }</div>`;
    frame.querySelectorAll("[data-url]").forEach((r) => r.addEventListener("click", () => go(r.dataset.url)));
  });

  go(initialUrl);
}

function cultNav(active) {
  const items = [
    ["home", "홈"],
    ["about", "소개"],
    ["leader", "{{CULT_LEADER_TITLE}} 소개"],
    ["beliefs", "교리"],
    ["events", "행사"],
    ["board", "게시판"],
  ];
  return `<div class="cult-nav">${items
    .map(([k, label]) => `<a data-nav="cult:/${k}" class="${active === k ? "active" : ""}">${renderText(label)}</a>`)
    .join("")}</div>`;
}

function staffNav(active) {
  const items = [
    ["dashboard", "홈"],
    ["members", "회원 관리"],
    ["messenger", "내부 메시지"],
    ["docs", "문서함"],
  ];
  return `<div class="staff-nav">${items
    .map(([k, label]) => `<a data-nav="staff:/${k}" class="${active === k ? "active" : ""}">${label}</a>`)
    .join("")}</div>`;
}

function wireNav(frame, go) {
  frame.querySelectorAll("[data-nav]").forEach((a) => a.addEventListener("click", () => go(a.dataset.nav)));
}

function renderRoute(key, frame, go) {
  const [prefix, rest = "/"] = [key.split(":")[0], key.split(":")[1]];

  if (prefix === "portal") return renderPortal(rest, frame, go);
  if (prefix === "search") return renderSearch(rest, frame, go);
  if (prefix === "cult") return renderCult(rest, frame, go);
  if (prefix === "staff") return renderStaff(rest, frame, go);
  if (prefix === "archive") return renderArchive(rest, frame, go);
  frame.innerHTML = `<div class="pane-content">페이지를 찾을 수 없습니다.</div>`;
}

function renderPortal(path, frame, go) {
  frame.innerHTML = `
    <div class="portal-home">
      <div class="logo">Portal</div>
      <div class="search-box-row">
        <input type="text" id="portal-q" placeholder="검색어를 입력하세요" />
        <button id="portal-search-btn">검색</button>
      </div>
      <ul class="portal-news">
        <li>[사회] 지역 공동체 모임, 봉사활동으로 눈길</li>
        <li>[생활] 요즘 뜨는 소규모 신앙 모임들</li>
        <li>[날씨] 이번 주말 전국 대체로 맑음</li>
      </ul>
    </div>
  `;
  const input = frame.querySelector("#portal-q");
  const doSearch = () => { if (input.value.trim()) go("search:/?q=" + encodeURIComponent(input.value.trim())); };
  frame.querySelector("#portal-search-btn").addEventListener("click", doSearch);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") doSearch(); });
}

function renderSearch(path, frame, go) {
  const params = new URLSearchParams(path.split("?")[1] || "");
  const q = params.get("q") || "";
  frame.innerHTML = `
    <div style="padding:20px 20px 0;text-align:center;background:#fafafa;">
      <div class="search-box-row" style="margin-bottom:14px;">
        <input type="text" id="portal-q" value="${q}" />
        <button id="portal-search-btn">검색</button>
      </div>
    </div>
    <div class="search-results" id="results"></div>
  `;
  const input = frame.querySelector("#portal-q");
  const doSearch = () => { if (input.value.trim()) go("search:/?q=" + encodeURIComponent(input.value.trim())); };
  frame.querySelector("#portal-search-btn").addEventListener("click", doSearch);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") doSearch(); });

  const results = frame.querySelector("#results");
  if (!q) { results.innerHTML = `<p style="color:#777;">검색어를 입력하세요.</p>`; return; }
  pushSearch(q);
  const group = findResultForQuery(q);
  if (!group || (group.requires && !group.requires.every((r) => hasFlag(r)))) {
    results.innerHTML = `<p style="color:#777;">'${q}'에 대한 검색결과가 없습니다.</p>`;
    return;
  }
  const r = SEARCH_RESULTS[group.resultId];
  results.innerHTML = `
    <div class="search-result-item">
      <div class="sr-url">${renderText(r.url)}</div>
      <div class="sr-title" data-goto="${r.navigateTo || ""}">${renderText(r.title)}</div>
      <div class="sr-desc">${renderText(r.desc)}</div>
    </div>
  `;
  const titleEl = results.querySelector(".sr-title");
  if (r.navigateTo) titleEl.addEventListener("click", () => go(r.navigateTo));
}

function renderCult(path, frame, go) {
  const page = path.split("/")[1] || "home";

  if (page === "home") {
    frame.innerHTML = renderText(`
      <div class="cult-site">
        ${cultNav("home")}
        <div class="cult-hero">
          <img src="${resolveSceneImage("IMG-CULT-HQ-01", "본부 외관")}" style="max-width:320px;margin:0 auto 14px;" />
          <h1>{{CULT_NAME}}</h1>
          <p>{{CULT_SLOGAN}}</p>
        </div>
        <div class="cult-section">
          <h2>{{LEADER}} {{CULT_LEADER_TITLE}}의 인사말</h2>
          <p>안녕하세요, {{CULT_NAME}}입니다. 늘 이웃과 함께하는 공동체가 되겠습니다.</p>
        </div>
        <div class="cult-section">
          <h2>다가오는 행사</h2>
          <div class="cult-card-grid">
            ${EVENTS.map((e) => `<div class="cult-card"><b>${renderText(e.title)}</b><br/>${e.date}</div>`).join("")}
          </div>
        </div>
      </div>
    `);
  } else if (page === "about") {
    frame.innerHTML = `<div class="cult-site">${cultNav("about")}
      <div class="cult-section"><h2>연혁</h2><p style="white-space:pre-wrap;">${renderText(CULT_ABOUT_TEXT)}</p></div>
    </div>`;
  } else if (page === "leader") {
    frame.innerHTML = renderText(`<div class="cult-site">${cultNav("leader")}
      <div class="cult-section">
        <img src="${personAvatarDataUri(PEOPLE.LEADER.name, PEOPLE.LEADER.avatarSeed, PEOPLE.LEADER.avatarColor)}" style="max-width:200px;" />
        <h2>{{LEADER}} {{CULT_LEADER_TITLE}}</h2>
        <p style="white-space:pre-wrap;">${renderText(CULT_LEADER_BIO)}</p>
        <img src="${resolveSceneImage("IMG-JEONGHO-SPEECH-01", "{{LEADER}} 설교 중")}" style="max-width:320px;margin-top:12px;" />
      </div>
    </div>`);
  } else if (page === "beliefs") {
    frame.innerHTML = `<div class="cult-site">${cultNav("beliefs")}
      <div class="cult-section"><h2>교리 소개</h2><p>${renderText(CULT_BELIEFS.publicIntro)}</p></div>
    </div>`;
  } else if (page === "events") {
    frame.innerHTML = `<div class="cult-site">${cultNav("events")}
      <div class="cult-hero" style="padding:0;">
        <img src="${resolveSceneImage("IMG-CULT-HALL-01", "행사장 내부")}" style="width:100%;max-height:220px;object-fit:cover;" />
      </div>
      <div class="cult-section"><h2>행사</h2><div class="cult-card-grid">
        ${EVENTS.map((e) => `<div class="cult-card"><img src="${resolveSceneImage(getPhoto(e.photoId)?.imageId, renderText(e.title))}"/><b>${renderText(e.title)}</b><br/>${e.date}</div>`).join("")}
      </div></div>
    </div>`;
  } else if (page === "board") {
    const postId = path.split("/")[2];
    if (postId) {
      const post = BOARD_POSTS.find((p) => p.id === postId);
      frame.innerHTML = `<div class="cult-site">${cultNav("board")}
        <div class="board-post-body">
          <button data-nav="cult:/board">← 목록</button>
          <h2>${renderText(post.title)}</h2>
          <div style="color:var(--text-secondary);font-size:12px;">${renderText(post.authorDisplay)} · ${post.createdAt}</div>
          <p style="white-space:pre-wrap;margin-top:10px;">${renderText(post.body).replace("__ARCHIVE_LINK__", "")}</p>
          ${post.body.includes("__ARCHIVE_LINK__") ? `<button id="archive-link-btn">→ 옛 사이트로 이동</button>` : ""}
          <div>${post.comments.map((c) => `<div class="board-comment"><b>${renderText(c.authorDisplay)}</b> ${c.createdAt}<br/>${renderText(c.body)}</div>`).join("")}</div>
        </div>
      </div>`;
      wireNav(frame, go);
      const archBtn = frame.querySelector("#archive-link-btn");
      if (archBtn) archBtn.addEventListener("click", () => { setFlag(FLAGS.FOUND_ARCHIVE_URL); go("archive:/home"); });
      return;
    }
    const visiblePosts = BOARD_POSTS.filter((p) => !p.deleted);
    frame.innerHTML = `<div class="cult-site">${cultNav("board")}
      <div>
        ${visiblePosts
          .map((p) => `<div class="board-list-row" data-nav="cult:/board/${p.id}"><span>[${renderText(p.board)}] ${renderText(p.title)}</span><span style="color:var(--text-secondary);">${p.createdAt}</span></div>`)
          .join("")}
      </div>
    </div>`;
  }

  wireNav(frame, go);
}

function renderArchive(path, frame, go) {
  setFlag(FLAGS.VISITED_ARCHIVE);
  frame.innerHTML = renderText(`
    <div class="cult-site" style="filter:grayscale(0.2);">
      <div class="cult-hero" style="background:#e4ddc8;">
        <h1>{{CULT_NAME}} (구 홈페이지 보존본)</h1>
        <p style="white-space:pre-wrap;">${renderText(ARCHIVE_INTRO)}</p>
      </div>
      <div class="cult-section">
        <h2>초기 모임 사진</h2>
        <img src="${resolveSceneImage("IMG-EARLY-GROUP-01", "창립 이전 모임")}" style="max-width:320px;" id="archive-photo" />
        <p style="font-size:12px;color:var(--text-secondary);">1997년경으로 추정. 이정호로 보이는 인물은 없음.</p>
      </div>
      <div class="cult-section">
        <h2>옛 회원 명단 (일부)</h2>
        <table class="staff-table">
          <thead><tr><th>번호</th><th>이름</th><th>가입</th><th>비고</th></tr></thead>
          <tbody>
            ${ARCHIVE_OLD_MEMBER_ROWS.map((r) => `<tr><td>${r.no}</td><td>${renderText(r.name)}</td><td>${renderText(r.joined)}</td><td>${renderText(r.note)}</td></tr>`).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `);
  frame.querySelector("#archive-photo").addEventListener("click", () => {
    discover("CLUE-EARLY-PHOTO");
    discover("CLUE-TRACE-000");
  });
}

function renderStaff(path, frame, go) {
  const page = path.split("/")[1] || "login";

  if (page === "login" && !hasFlag(FLAGS.STAFF_LOGIN_SUCCESS)) {
    frame.innerHTML = `
      <div class="staff-site">
        <div class="login-box">
          <h2>업무시스템 로그인</h2>
          <input type="text" id="staff-id" placeholder="아이디" />
          <input type="password" id="staff-pw" placeholder="비밀번호" />
          <button id="staff-login-btn">로그인</button>
          <div id="staff-login-error" class="login-error"></div>
        </div>
      </div>
    `;
    frame.querySelector("#staff-login-btn").addEventListener("click", () => {
      const idv = frame.querySelector("#staff-id").value.trim();
      const pwv = frame.querySelector("#staff-pw").value.trim();
      if (idv === STAFF_CREDENTIALS.username && pwv === STAFF_CREDENTIALS.password) {
        setFlag(FLAGS.STAFF_LOGIN_SUCCESS);
        setStaffLoggedIn(true);
        go("staff:/dashboard");
      } else {
        frame.querySelector("#staff-login-error").textContent = "아이디 또는 비밀번호가 올바르지 않습니다.";
      }
    });
    return;
  }

  if (!hasFlag(FLAGS.STAFF_LOGIN_SUCCESS)) {
    frame.innerHTML = `<div class="pane-content">로그인이 필요합니다.</div>`;
    return;
  }

  const inner = document.createElement("div");
  inner.className = "staff-site";
  inner.innerHTML = renderText(`<div class="staff-header-bar"><span>{{CULT_NAME}} 업무시스템</span><span>{{SUNHEE}}님 등 3명 접속중</span></div>${staffNav(page)}<div class="staff-content" id="staff-inner"></div>`);
  frame.innerHTML = "";
  frame.appendChild(inner);
  const staffInner = inner.querySelector("#staff-inner");

  if (page === "dashboard") {
    staffInner.innerHTML = `<p>공지: 창립기념 행사 준비 관련 문의는 행정팀으로.</p><p>오늘 일정: 상담 2건, 정기 회의 1건.</p>`;
  } else if (page === "members") {
    staffInner.innerHTML = `
      <input type="text" id="member-search" placeholder="회원번호 또는 이름 검색" />
      <table class="staff-table" style="margin-top:10px;">
        <thead><tr><th>번호</th><th>이름</th><th>가입일</th><th>상태</th><th>담당</th><th>메모</th></tr></thead>
        <tbody id="member-rows">
          ${MEMBER_ROWS.map((r) => `<tr><td>${r.no}</td><td>${renderText(r.name)}</td><td>${renderText(r.joined)}</td><td>${r.status}</td><td>${renderText(r.manager)}</td><td>${renderText(r.note)}</td></tr>`).join("")}
        </tbody>
      </table>
      <div id="member-search-result"></div>
    `;
    discover("CLUE-MEMBER-001");
    staffInner.querySelector("#member-search").addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      const v = e.target.value.trim();
      const resultBox = staffInner.querySelector("#member-search-result");
      if (v === "000") {
        discover("CLUE-TRACE-000");
        resultBox.innerHTML = `<p class="login-error">회원번호 000: 레코드가 삭제되었거나 열람 권한이 없습니다. (문서함의 백업 안내 참고)</p>`;
      } else {
        resultBox.innerHTML = `<p style="color:var(--text-secondary);">일치하는 항목이 없습니다.</p>`;
      }
    });
  } else if (page === "messenger") {
    staffInner.innerHTML = `<div class="staff-msg-thread">${STAFF_MESSENGER_LOG.map((m) => `<div class="staff-msg-row"><b>${renderText(m.speaker)}</b><span>${renderText(m.text)}</span></div>`).join("")}</div>`;
    discover("CLUE-SUNHEE-PATTERN");
  } else if (page === "docs") {
    const docId = path.split("/")[2];
    if (docId) {
      const doc = STAFF_DOCS.find((d) => d.id === docId);
      staffInner.innerHTML = `<button data-nav="staff:/docs">← 목록</button><h3>${renderText(doc.title)}</h3><div style="color:var(--text-secondary);font-size:12px;">${doc.date}</div><p style="white-space:pre-wrap;">${renderText(doc.body)}</p>`;
    } else {
      staffInner.innerHTML = STAFF_DOCS.map((d) => `<div class="board-list-row" data-nav="staff:/docs/${d.id}"><span>${renderText(d.title)}</span><span>${d.date}</span></div>`).join("");
    }
  }

  wireNav(inner, go);
}
