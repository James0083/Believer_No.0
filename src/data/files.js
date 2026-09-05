export const FOLDER_TREE = {
  "Desktop": { label: "바탕화면", children: ["Desktop/Documents", "Desktop/Downloads", "Desktop/Screenshots"] },
  "Desktop/Documents": { label: "Documents", children: ["Desktop/Documents/취재", "Desktop/Documents/개인"] },
  "Desktop/Documents/취재": { label: "취재", children: [] },
  "Desktop/Documents/개인": { label: "개인", children: [] },
  "Desktop/Downloads": { label: "Downloads", children: [] },
  "Desktop/Screenshots": { label: "Screenshots", children: [] },
};

export const FILES = [
  {
    id: "FILE-E01-SCAN",
    name: "초기_신도명부_스캔.jpg",
    path: "Desktop/Documents/취재",
    type: "roster",
    modifiedAt: "2016-06-10",
    clueIds: ["CLUE-MEMBER-001"],
  },
  {
    id: "FILE-E02-HEALTH",
    name: "{{LEADER}}_컨디션관리표.xls",
    path: "Desktop/Documents/취재",
    type: "health-log",
    modifiedAt: "2016-06-05",
    clueIds: ["CLUE-HEALTH-LOG"],
  },
  {
    id: "FILE-E03-EXTLOG",
    name: "대화로그_추가분.txt",
    path: "Desktop/Documents/취재",
    type: "chatlog",
    modifiedAt: "2016-06-18",
    onOpenFlags: ["FOUND_EXTENDED_CHAT_LOG"],
  },
  {
    id: "FILE-PERSONAL-NOTE",
    name: "{{SENIOR_FAMILY_GIVEN}}이_생각.txt",
    path: "Desktop/Documents/개인",
    type: "text",
    modifiedAt: "2016-03-19",
    content:
      "{{SENIOR_FAMILY_GIVEN}} 요즘 통화하면 목소리가 좀 이상하다.\n" +
      "돈 얘기 자꾸 하고, {{CULT_NAME}} 얘기만 나오면 말을 돌린다.\n" +
      "일단 취재는 별개로 하고, 시간 될 때 직접 찾아가 봐야겠다.",
  },
  {
    id: "FILE-PAMPHLET",
    name: "{{CULT_NAME}}_소개서.pdf",
    path: "Desktop/Downloads",
    type: "image",
    modifiedAt: "2016-02-01",
    imageLabel: "{{CULT_NAME}} 홍보 리플릿",
    clueIds: ["CLUE-CULT-NAME"],
  },
  {
    id: "FILE-CAPTURE-SCREENSHOT",
    name: "capture_0520.png",
    path: "Desktop/Screenshots",
    type: "chat-screenshot",
    modifiedAt: "2016-05-20",
    clueIds: ["CLUE-FOLLOWER-CHAT-FRAGMENT"],
  },
];

export const HEALTH_LOG_ROWS = [
  { date: "05.01", meal: "죽, 소량", condition: "무기력", schedule: "휴식", ritual: "-", note: "선희 선생님 방문, 식사 챙김" },
  { date: "05.02", meal: "정상", condition: "안정", schedule: "오전 상담", ritual: "-", note: "" },
  { date: "05.06", meal: "결식", condition: "두통 호소", schedule: "전체 취소", ritual: "-", note: "선희 선생님이 대신 일정 조율" },
  { date: "05.09", meal: "정상", condition: "양호", schedule: "주말 예배 준비", ritual: "예정", note: "선희 선생님 확인 후 진행" },
  { date: "05.10", meal: "정상", condition: "긴장, 손 떨림", schedule: "주일 예배", ritual: "진행", note: "예배 직전 선희 선생님과 단독 면담 15분" },
  { date: "05.11", meal: "소량", condition: "탈진 기미", schedule: "휴식", ritual: "-", note: "" },
  { date: "05.24", meal: "정상", condition: "안정", schedule: "행사 리허설", ritual: "예정", note: "일정 전면 선희 선생님이 재조정" },
  { date: "05.25", meal: "정상", condition: "고양됨", schedule: "창립기념 행사", ritual: "진행", note: "행사 직후 컨디션 급격히 저하, 선희 선생님 동행" },
];

export const ROSTER_ROWS = [
  { no: "000", name: "████ (판독 불가)", joined: "199?", note: "행 일부 훼손 · 삭제 흔적", hidden: true },
  { no: "001", name: "{{LEADER}}", joined: "{{CULT_FOUNDED}}", note: "창립자" },
  { no: "002", name: "{{FOLLOWER}}", joined: "2014", note: "" },
  { no: "003", name: "이O진", joined: "1999", note: "" },
  { no: "004", name: "박O수", joined: "1999", note: "" },
];

export function listChildren(path) {
  const node = FOLDER_TREE[path];
  const folders = node ? node.children : [];
  const files = FILES.filter((f) => f.path === path);
  return { folders, files };
}

export function folderLabel(path) {
  return FOLDER_TREE[path]?.label ?? path.split("/").pop();
}

export function getFile(id) {
  return FILES.find((f) => f.id === id);
}
