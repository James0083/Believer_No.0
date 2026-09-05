import { SENIOR } from "./config.js";
import { renderText } from "./text.js";
import { personAvatarDataUri } from "./avatar.js";
import { initDesktop } from "./desktop.js";
import { resetState, hasClue, hasFlag, setFlag, onFlagSet } from "./state.js";
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
    if (hasFlag(FLAGS.SENIOR_LOGIN_SUCCESS)) enterDesktop();
    else showLogin();
  }, 1500);
}

function showLogin() {
  const login = document.getElementById("login-screen");
  login.style.display = "flex";
  login.querySelector(".login-avatar-img").src = personAvatarDataUri(SENIOR.name, "senior", "#446A82");
  login.querySelector(".login-account-name").textContent = SENIOR.osAccountName;

  const pwInput = login.querySelector("#login-pw");
  const errorEl = login.querySelector("#login-pw-error");
  const btn = login.querySelector("#login-btn");

  // 한글 IME로 조합돼 들어오는 문자를 포함해, 영문(A-Z/a-z) 외의 입력은
  // 즉시 걸러낸다. 이 암호는 한글 단어를 영문 자판으로 그대로 친 것이라
  // 실제로 한글이 입력되면 안 된다.
  pwInput.addEventListener("input", () => {
    const filtered = pwInput.value.replace(/[^A-Za-z]/g, "");
    if (filtered !== pwInput.value) pwInput.value = filtered;
  });

  function submit() {
    if (pwInput.value === SENIOR.loginPassword) {
      setFlag(FLAGS.SENIOR_LOGIN_SUCCESS);
      enterDesktop();
    } else {
      errorEl.textContent = "암호가 올바르지 않습니다.";
    }
  }

  btn.addEventListener("click", submit);
  pwInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") submit();
  });
  pwInput.focus();
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
