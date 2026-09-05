import { discoverClue as rawDiscoverClue, setFlag, hasFlag, hasClue } from "./state.js";
import { getClue, CLUES } from "./data/clues.js";
import { showToast } from "./ui.js";
import { renderText } from "./text.js";
import { FLAGS } from "./data/flags.js";

export function discover(id) {
  const clue = getClue(id);
  if (clue && clue.requires && !clue.requires.every((r) => hasFlag(r) || hasClue(r))) {
    return false; // 선행 조건 미충족 시 아직 발견 처리하지 않음
  }
  const added = rawDiscoverClue(id);
  if (added && clue) {
    (clue.unlocks || []).forEach(setFlag);
    showToast("새로운 단서: " + renderText(clue.title));
    checkFinalReveal();
  }
  return added;
}

function checkFinalReveal() {
  const finalClue = getClue("CLUE-000-IDENTITY");
  if (!finalClue) return;
  if (hasClue(finalClue.id)) return;
  if (finalClue.requires.every((r) => hasClue(r))) {
    discover(finalClue.id);
  }
}

export function allClues() {
  return CLUES;
}
