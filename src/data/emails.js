export const EMAILS = [
  {
    id: "E-INBOX-01",
    from: "박준혁 <editor@{{SENIOR_COMPANY_DOMAIN}}>",
    to: ["{{SENIOR}}"],
    subject: "그 취재 아직 살아있는 거지?",
    sentAt: "2016-04-02T09:14:00",
    folder: "inbox",
    read: false,
    body:
      "지훈아,\n\n지난달에 얘기했던 그 건, 아직 취재 중인 거 맞지?\n" +
      "위에서는 자꾸 접으라고 하는데 나는 좀 더 보고 싶어.\n" +
      "증거 될 만한 거 나오면 바로 공유해줘.\n\n" +
      "- 준혁 -",
    clueIds: [],
  },
  {
    id: "E-INBOX-02",
    from: "제보자 <anon2016@mailbox.local>",
    to: ["{{SENIOR}}"],
    subject: "말씀하신 단체 관련입니다",
    sentAt: "2016-04-05T23:41:00",
    folder: "inbox",
    read: false,
    body:
      "기자님,\n\n예전에 문의하신 단체 이름 맞습니다. '{{CULT_NAME}}' 이라고 검색해보시면\n" +
      "홈페이지가 하나 나올 겁니다. 겉으로는 평범한 봉사단체처럼 보이는데\n" +
      "내부 사정은 다릅니다.\n\n" +
      "더 자세한 건 만나서 얘기하고 싶습니다. 회신 부탁드립니다.",
    clueIds: ["CLUE-CULT-NAME"],
  },
  {
    id: "E-SENT-01",
    from: "{{SENIOR}} <{{SENIOR_EMAIL}}>",
    to: ["익명 <family-friend@mailbox.local>"],
    subject: "{{SENIOR_FAMILY_GIVEN}} 일 때문에 그런데",
    sentAt: "2016-03-18T22:03:00",
    folder: "sent",
    read: true,
    body:
      "누나,\n\n{{SENIOR_FAMILY_GIVEN}} 얘기 계속 마음에 걸려서 연락드려요.\n" +
      "{{CULT_NAME}}에 나가기 시작한 뒤로 연락도 뜸해지고, 돈 얘기도 좀 이상하게 하더라고요.\n" +
      "혹시 그쪽 사정 아시는 거 있으면 알려주세요. 기사 때문이 아니라 그냥... 걱정돼서요.\n\n" +
      "- 지훈 -",
    clueIds: ["CLUE-FAMILY-LINK"],
  },
  {
    id: "E-INBOX-03",
    from: "취재원 K <source.k@mailbox.local>",
    to: ["{{SENIOR}}"],
    subject: "Fwd: 이거 캡처 하나 구했어요",
    sentAt: "2016-05-20T01:12:00",
    folder: "inbox",
    read: false,
    body:
      "말씀하신 대로 안쪽 사람한테 캡처 하나 받았습니다.\n" +
      "{{LEADER}} {{CULT_LEADER_TITLE}}이랑 {{FOLLOWER}} 신도랑 새벽에 주고받은 메시지인데,\n" +
      "일부만 구할 수 있었어요. 첨부 확인해보세요.\n\n" +
      "이거 진짜면 그림이 심각한 것 같은데...",
    attachments: ["capture_0520.png"],
    clueIds: ["CLUE-FOLLOWER-CHAT-FRAGMENT"],
  },
  {
    id: "E-DRAFT-01",
    from: "{{SENIOR}} <{{SENIOR_EMAIL}}>",
    to: [],
    subject: "(제목없음)",
    sentAt: "2016-06-02T02:47:00",
    folder: "draft",
    read: true,
    body:
      "메모용 초안. 보내지 않음.\n\n" +
      "- 001이 {{LEADER}}인 건 확인됨.\n" +
      "- 근데 왜 001부터 시작하지? 000은 없나?\n" +
      "- 관리자 페이지 찾아야 함. 공식 사이트엔 링크 없음.\n" +
      "- {{FOLLOWER_GIVEN}} 얘기랑 별개로, 이상하게 모든 자료에 이름 하나가 자꾸 겹친다. 확인 필요.",
    clueIds: [],
  },
  {
    id: "E-ARCHIVE-01",
    from: "내부시스템 관리팀 <admin@{{CULT_DOMAIN}}>",
    to: ["회계팀 <acc@{{CULT_DOMAIN}}>", "행정팀 <staff@{{CULT_DOMAIN}}>"],
    subject: "업무시스템 정기 점검 안내",
    sentAt: "2016-02-11T10:00:00",
    folder: "archive",
    read: true,
    body:
      "안녕하십니까.\n\n" +
      "업무시스템(staff.{{CULT_DOMAIN}}) 정기 점검이 2/13 새벽 진행됩니다.\n" +
      "점검 후에도 계정(예: s.yoon 등)으로 정상 로그인 가능함을 확인했습니다.\n" +
      "비밀번호 재설정이 필요하신 분은 관리팀으로 별도 연락 바랍니다.\n\n" +
      "감사합니다.",
    clueIds: ["CLUE-STAFF-URL", "CLUE-STAFF-ID"],
  },
  {
    id: "E-TRASH-01",
    from: "{{SENIOR}} <{{SENIOR_EMAIL}}>",
    to: ["나에게"],
    subject: "명부 스캔 정리",
    sentAt: "2016-06-10T03:20:00",
    folder: "trash",
    read: false,
    body:
      "스캔본 파일 정리해둠. Documents/취재/ 폴더에 있음.\n" +
      "001 {{LEADER}} 확인. 근데 그 위에 한 줄이 지워져 있음. 번호가 안 보임.\n" +
      "이거 왜 지웠지.",
    clueIds: ["CLUE-MEMBER-001"],
  },
];
