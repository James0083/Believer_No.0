import { SENIOR } from "./config.js";
import { renderText } from "./text.js";
import { personAvatarDataUri } from "./avatar.js";
import { initDesktop } from "./desktop.js";
import { resetState, hasClue, onFlagSet } from "./state.js";
import { FLAGS } from "./data/flags.js";

function renderTokensInDom() {
  document.querySelectorAll("[data-t]").forEach((el) => {
    el.textContent = renderText(el.dataset.t);
  });
}

function showBoot() {
  const boot = document.getElementById("boot-screen");
  boot.querySelector(".boot-computer-label").textContent = SENIOR.computerLabel;
  setTimeout(() => {
    boot.style.display = "none";
    showLogin();
  }, 1500);
}

function showLogin() {
  const login = document.getElementById("login-screen");
  login.style.display = "flex";
  login.querySelector(".login-avatar-img").src = personAvatarDataUri(SENIOR.name, "senior", "#446A82");
  login.querySelector(".login-account-name").textContent = SENIOR.osAccountName;
  login.querySelector("#login-btn").addEventListener("click", enterDesktop, { once: true });
  login.querySelector("#login-pw").addEventListener("keydown", (e) => {
    if (e.key === "Enter") enterDesktop();
  });
}

function enterDesktop() {
  document.getElementById("login-screen").style.display = "none";
  initDesktop();
}

function setupSaveMenu() {
  document.getElementById("reset-save-btn").addEventListener("click", () => {
    if (confirm("저장된 진행 상황을 초기화할까요?")) {
      resetState();
      location.reload();
    }
  });
}

function watchEnding() {
  onFlagSet((flag) => {
    if (flag === FLAGS.IDENTIFIED_000_AS_SUNHEE) showEnding();
  });
  if (hasClue("CLUE-000-IDENTITY")) showEnding();
}

function showEnding() {
  if (document.getElementById("ending-screen")) return;
  const overlay = document.createElement("div");
  overlay.id = "ending-screen";
  overlay.className = "ending-screen";
  overlay.innerHTML = `
    <div class="ending-box">
      <h2>결론에 도달했다</h2>
      <p>{{LEADER}}는 회원번호 001. 교단의 얼굴이자 절대적 지도자처럼 보였다.</p>
      <p>하지만 001보다 앞선 번호, 창립 이전 사진, 그리고 반복해서 나타나던 이름 하나.</p>
      <p><b>{{SUNHEE}}</b> — 공식 직책 없는 오래된 신도. 그러나 {{LEADER}}의 상태와 판단, 조직의 크고 작은 결정 모두 그녀를 거쳐갔다.</p>
      <p>그녀가 '신도 0번'이다.</p>
      <button id="ending-close-btn">계속 조사하기</button>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay
    .querySelectorAll("p, h2")
    .forEach((p) => (p.textContent = renderText(p.textContent)));
  overlay.querySelector("#ending-close-btn").addEventListener("click", () => overlay.remove());
}

renderTokensInDom();
setupSaveMenu();
watchEnding();
showBoot();
