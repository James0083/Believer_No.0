export const MEMBER_ROWS = [
  { no: "001", name: "{{LEADER}}", joined: "{{CULT_FOUNDED}}", status: "활동", manager: "-", note: "창립자" },
  { no: "002", name: "{{FOLLOWER}}", joined: "2014", status: "활동", manager: "모집팀", note: "기록 업무 겸임" },
  { no: "003", name: "이O진", joined: "1999", status: "활동", manager: "-", note: "" },
  { no: "008", name: "김병철", joined: "1999", status: "활동", manager: "-", note: "원로회 · 봉사팀" },
  { no: "009", name: "최상훈", joined: "1999", status: "활동", manager: "-", note: "원로회 · 봉사팀" },
  { no: "010", name: "한미정", joined: "1999", status: "활동", manager: "-", note: "원로회 · 재정팀" },
  { no: "011", name: "고은아", joined: "1999", status: "활동", manager: "-", note: "원로회 · 교육팀" },
  { no: "012", name: "문재성", joined: "1999", status: "활동", manager: "-", note: "원로회 · 관리팀" },
  { no: "017", name: "{{SUNHEE}}", joined: "1999", status: "활동", manager: "-", note: "직책 없음 / 돌봄 담당" },
];
// TODO: 008~012 번호는 교단 바이블에 명시되지 않은 임시 번호. 확정되면 바꿀 것.

export const STAFF_MESSENGER_LOG = [
  { speaker: "관리팀 이", text: "이번 주 {{CULT_LEADER_HONORIFIC}} 일정 변경됐어요?" },
  { speaker: "관리팀 박", text: "선희 선생님한테 먼저 확인해야 알아요. 아직 답 안 오셨어요." },
  { speaker: "관리팀 이", text: "행사 순서 이것도 선희 선생님이 다시 짜신 거예요." },
  { speaker: "관리팀 박", text: "원래 저희가 짠 순서 있었잖아요." },
  { speaker: "문재성", text: "선희 선생님이 보시고 바꾸셨어요. {{CULT_LEADER_HONORIFIC}} 컨디션 때문에." },
  { speaker: "관리팀 이", text: "그분 직책이 정확히 뭐예요?" },
  { speaker: "문재성", text: "그냥... 오래 계신 분이요. 근데 다들 그분한테 먼저 물어봐요." },
];

export const STAFF_DOCS = [
  {
    id: "DOC-MEETING-01",
    title: "2016년 5월 운영회의록",
    date: "2016-05-18",
    body:
      "참석: 관리팀 3명\n" +
      "결재: s.yoon\n\n" +
      "1. 창립기념 행사 일정 확정 (선희 선생님 검토 완료)\n" +
      "2. {{CULT_LEADER_HONORIFIC}} 컨디션 관리 관련 - 기존과 동일하게 선희 선생님 담당 유지\n" +
      "3. 신규 신도 상담 배정",
  },
  {
    id: "DOC-BACKUP-01",
    title: "구 회원관리시스템 백업 안내",
    date: "2010-01-10",
    body:
      "구 시스템(1998~2009) 데이터는 archive.{{CULT_DOMAIN}} 에서 열람 가능합니다.\n" +
      "일부 초기 레코드는 관리자 판단으로 비공개 처리되었습니다.",
  },
  {
    id: "DOC-COUNCIL-01",
    title: "원로회 구성 안내",
    date: "2016-01-15",
    body:
      "원로회는 {{LEADER}}와 함께 영림대학교 봉사동아리 시절부터 함께해온\n" +
      "5인으로 구성되며, 각자 실무팀을 하나씩 맡는다.\n\n" +
      "· 봉사팀 — 김병철, 최상훈\n" +
      "· 재정팀 — 한미정\n" +
      "· 교육팀 — 고은아\n" +
      "· 관리팀(생활·시설) — 문재성\n\n" +
      "※ 모집팀({{FOLLOWER}} 담당)과 여명관·연화관은 원로회 산하 조직이며\n" +
      "세부 운영 방식은 별도 문서로 안내 예정.",
  },
];
