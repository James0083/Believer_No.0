export const BOARD_POSTS = [
  {
    id: "POST-NOTICE-01",
    board: "공지",
    title: "홈페이지 새 단장 안내",
    authorDisplay: "관리자",
    createdAt: "2016-01-05",
    body: "{{CULT_NAME}} 홈페이지가 새롭게 단장했습니다. 많은 관심 부탁드립니다.",
    comments: [],
  },
  {
    id: "POST-TESTIMONY-01",
    board: "간증",
    title: "제 삶이 달라졌습니다",
    authorDisplay: "은***",
    createdAt: "2015-09-12",
    body:
      "처음엔 반신반의했는데 {{CULT_LEADER_EPITHET}}의 말씀을 듣고 마음이 편안해졌어요.\n" +
      "제 안의 진흙도 언젠가는 연꽃이 될 수 있다는 말이 큰 위로가 됐습니다.\n" +
      "선희 선생님이 적응 못 하던 저를 정말 세심하게 챙겨주셨습니다.\n" +
      "이런 곳을 만나게 되어 감사할 따름입니다.",
    comments: [
      { id: "c1", authorDisplay: "박***", createdAt: "2015-09-13", body: "저도 선희 선생님 덕분에 많이 안정됐어요." },
    ],
  },
  {
    id: "POST-FREE-01",
    board: "자유게시판",
    title: "그거 글 왜 지워졌어요?",
    authorDisplay: "익명",
    createdAt: "2016-03-02",
    body: "어제 올라왔던 글이요, {{CULT_LEADER_HONORIFIC}} 관련해서 질문한 거. 그거 왜 삭제됐죠?",
    comments: [
      { id: "c2", authorDisplay: "관리자", createdAt: "2016-03-02", body: "운영 방침에 맞지 않는 내용이라 삭제했습니다." },
      { id: "c3", authorDisplay: "익명", createdAt: "2016-03-02", body: "그냥 직책 없는 사람이 왜 그렇게 다 관여하냐고 물어본 것뿐인데요..." },
    ],
  },
  {
    id: "POST-FREE-DELETED",
    board: "자유게시판",
    title: "질문 있습니다",
    authorDisplay: "익명",
    createdAt: "2016-03-01",
    deleted: true,
    body: "선희 선생님이라는 분, 공식 직책이 뭔가요? 소개 페이지에는 이름이 없던데요.",
    comments: [],
  },
  {
    id: "POST-ARCHIVE-LINK",
    board: "자료실",
    title: "역대 행사 사진 모음 (구)",
    authorDisplay: "관리자",
    createdAt: "2014-06-01",
    body: "새 홈페이지 이전 자료는 옛 사이트에 남아 있습니다. __ARCHIVE_LINK__",
    comments: [],
  },
];

export const EVENTS = [
  { id: "EVT-2016", title: "2016년 창립기념 행사", date: "2016-05-25", photoId: "PHOTO-EVENT-2016" },
  { id: "EVT-2010", title: "2010년 창립기념 행사", date: "2010-05-20", photoId: "PHOTO-EVENT-2010" },
];

export const CULT_ABOUT_TEXT =
  "{{CULT_NAME}}({{CULT_HANJA}})는 {{CULT_FOUNDED}}년, {{LEADER}} {{CULT_LEADER_EPITHET}}의 뜻에 따라 시작되었습니다.\n" +
  "작은 모임에서 출발하여 지금은 많은 분들과 함께하는 공동체로 성장했습니다.\n" +
  "봉사와 상담, 명상 프로그램을 통해 이웃과 함께하는 것을 소중히 여깁니다.";

export const CULT_LEADER_BIO =
  "{{LEADER}}는 {{CULT_FOUNDED}}년 {{CULT_NAME}}를 시작한 이래\n" +
  "한결같이 공동체를 이끌어 왔습니다. 스스로를 '{{CULT_LEADER_EPITHET}}'라고\n" +
  "낮춰 부르며, 소박한 말씀과 진심 어린 상담으로 많은 이들의 신뢰를 얻어 왔습니다.";

// 공개 홈페이지용 (외부에는 '종교'·'선지자' 언어를 거의 쓰지 않는다는
// 교단 바이블의 원칙을 지킨다 — 내부 교리 전체는 STAFF_DOCTRINE_NOTE 참고).
export const CULT_BELIEFS = {
  publicIntro:
    "{{CULT_NAME}}는 봉사와 상담, 명상을 통해 마음을 돌보는 작은 공동체입니다.\n" +
    "지역과 함께하는 활동을 소중히 여기며, 누구나 편하게 찾아올 수 있는 곳이 되고자 합니다.",
  // TODO: 아래 두 값은 교단 바이블에도 미정으로 남아있다. 값이 "__TBD"로
  // 시작하는 동안은 화면에 그대로 노출하지 말고 렌더링에서 건너뛸 것.
  coreQuote: "__TBD_PUBLIC_SLOGAN__",
  lifeRules: "__TBD_LIFE_RULES__",
};
