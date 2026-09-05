const SAVE_KEY = "sindo0_save_v1";

function emptyState() {
  return {
    version: 1,
    openedApps: [],
    visitedPages: [],
    readEmails: [],
    readChats: [],
    playedCalls: [],
    openedFiles: [],
    discoveredClues: [],
    flags: [],
    searchHistory: [],
    loggedInStaff: false,
    playerNotes: "",
  };
}

let state = load();
const listeners = new Set();

function load() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw);
    return { ...emptyState(), ...parsed };
  } catch (e) {
    return emptyState();
  }
}

function persist() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch (e) {
    /* ignore quota errors */
  }
  listeners.forEach((fn) => fn(state));
}

export function onStateChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getState() {
  return state;
}

export function resetState() {
  state = emptyState();
  persist();
}

function addUnique(arrKey, value) {
  if (!state[arrKey].includes(value)) {
    state[arrKey] = [...state[arrKey], value];
    persist();
    return true;
  }
  return false;
}

const clueListeners = new Set();
const flagListeners = new Set();
export const onClueDiscovered = (fn) => { clueListeners.add(fn); return () => clueListeners.delete(fn); };
export const onFlagSet = (fn) => { flagListeners.add(fn); return () => flagListeners.delete(fn); };

export const hasFlag = (flag) => state.flags.includes(flag);
export const setFlag = (flag) => {
  const added = addUnique("flags", flag);
  if (added) flagListeners.forEach((fn) => fn(flag));
  return added;
};
export const setFlags = (flags = []) => flags.forEach(setFlag);

export const hasClue = (id) => state.discoveredClues.includes(id);
export const discoverClue = (id) => {
  const added = addUnique("discoveredClues", id);
  if (added) clueListeners.forEach((fn) => fn(id));
  return added;
};

export const markAppOpened = (id) => addUnique("openedApps", id);
export const markPageVisited = (url) => addUnique("visitedPages", url);
export const markEmailRead = (id) => addUnique("readEmails", id);
export const markChatRead = (id) => addUnique("readChats", id);
export const markCallPlayed = (id) => addUnique("playedCalls", id);
export const markFileOpened = (id) => addUnique("openedFiles", id);
export const pushSearch = (q) => addUnique("searchHistory", q);

export function isEmailRead(id) {
  return state.readEmails.includes(id);
}
export function isChatRead(id) {
  return state.readChats.includes(id);
}
export function isCallPlayed(id) {
  return state.playedCalls.includes(id);
}
export function isFileOpened(id) {
  return state.openedFiles.includes(id);
}
export function isPageVisited(url) {
  return state.visitedPages.includes(url);
}

export function setStaffLoggedIn(v) {
  state.loggedInStaff = v;
  persist();
}

export function setPlayerNotes(text) {
  state.playerNotes = text;
  persist();
}

export function meetsRequirements(requires = []) {
  return requires.every((r) => hasFlag(r) || hasClue(r));
}

export function unlockOnEnter(flags = [], clueIds = []) {
  flags.forEach(setFlag);
  clueIds.forEach(discoverClue);
}
