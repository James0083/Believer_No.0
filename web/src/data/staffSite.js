export const MEMBER_ROWS = [
  { no: "001", name: "{{LEADER}}", joined: "{{CULT_FOUNDED}}", status: "활동", manager: "-", note: "창립자" },
  { no: "002", name: "{{FOLLOWER}}", joined: "2014", status: "활동", manager: "{{SUNHEE}}", note: "" },
  { no: "003", name: "이O진", joined: "1999", status: "활동", manager: "-", note: "" },
  { no: "017", name: "{{SUNHEE}}", joined: "1999", status: "활동", manager: "-", note: "직책 없음 / 돌봄 담당" },
];

export const STAFF_MESSENGER_LOG = [
  { speaker: "행정팀 이", text: "이번 주 {{CULT_LEADER_HONORIFIC}} 일정 변경됐어요?" },
  { speaker: "행정팀 최", text: "선희 선생님한테 먼저 확인해야 알아요. 아직 답 안 오셨어요." },
  { speaker: "행정팀 이", text: "행사 순서 이것도 선희 선생님이 다시 짜신 거예요." },
  { speaker: "행정팀 박", text: "원래 저희가 짠 순서 있었잖아요." },
  { speaker: "행정팀 최", text: "선희 선생님이 보시고 바꾸셨어요. {{CULT_LEADER_HONORIFIC}} 컨디션 때문에." },
  { speaker: "행정팀 이", text: "그분 직책이 정확히 뭐예요?" },
  { speaker: "행정팀 박", text: "그냥... 오래 계신 분이요. 근데 다들 그분한테 먼저 물어봐요." },
];

export const STAFF_DOCS = [
  {
    id: "DOC-MEETING-01",
    title: "2016년 5월 운영회의록",
    date: "2016-05-18",
    body:
      "참석: 행정팀 3명\n" +
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
];
