// ============================================================================
// 전역 설정: 인물 / 교단 / 플레이어 / 소품
// 이름·직책·색상 등 컨셉이 바뀌면 이 파일만 수정하면 게임 전체에 반영된다.
// PLACEHOLDER: true 인 값은 아직 확정되지 않은 설정 (TODO.md 참고).
// ============================================================================

export const PLAYER = {
  id: "PLAYER",
  displayName: "너",
  role: "기자 (인턴/후배)",
  nameRevealed: false, // TODO: 플레이어 이름 공개 여부 미정
};

export const SENIOR = {
  id: "SENIOR",
  name: "박수철",
  givenName: "수철",
  age: 39,
  ageIsPlaceholder: true, // TODO: 나이 확정 필요
  company: "일간초록불",
  companyPlaceholder: true, // TODO: 소속 언론사명 확정 필요
  email: "scpark@greenlightdaily.co.kr",
  companyEmailDomain: "greenlightdaily.co.kr", // 위 이메일 도메인과 일치시킴 (확정)
  // 계정명/PC 이름은 임의로 로마자 표기를 지어내지 않는다.
  // 실제 값이 정해지면 여기만 채우면 된다.
  osAccountName: "__SENIOR_ACCOUNT__",
  computerLabel: "__SENIOR_PC_NAME__",
  // 선배 컴퓨터 로그인 암호. 아내 이름("지혜") + "러브"를 한글 자판이 아닌
  // 영문 자판(2벌식 매핑) 그대로 입력한 문자열: "지혜러브" -> "wlgPfjqm".
  // 로그인 화면에서는 영문(A-Z, a-z)만 입력되도록 필터링한다.
  loginPassword: "wlgPfjqm",
};

export const SENIOR_FAMILY = {
  id: "SENIOR_FAMILY",
  name: "서지혜",
  givenName: "지혜", // 가족끼리는 성을 떼고 이름만 부른다
  placeholder: true, // TODO: 선배 기자 가족 중 교단에 빠진 사람 확정 필요
  relationToSenior: "아내",
  age: 39,
};

// 인물 키는 이름이 아니라 "역할"로 둔다. 이름/나이가 바뀌어도
// 키(LEADER/FOLLOWER/DISCIPLE_ZERO)는 그대로 두고 필드 값만 갱신하면 된다.
export const PEOPLE = {
  LEADER: {
    id: "LEADER",
    name: "이정호",
    memberNo: "001",
    publicRole: "교주",
    age2016: 44,
    avatarSeed: "leader",
    avatarColor: "#446A82",
  },
  FOLLOWER: {
    id: "FOLLOWER",
    name: "채은서",
    givenName: "은서",
    memberNo: "002",
    memberNoPlaceholder: true, // TODO: 채은서 회원번호 확정 필요 (임시값 002)
    publicRole: "신도",
    // 교단 바이블 D. 조직·권력 구조 기준
    orgTeam: "모집팀 (기록 담당 겸임)",
    orgAccessNote: "간부회(원로회) 정보까지는 접근하지 못함. 이정호의 개인 기록과 신규 신도 정보까지만 접근 가능.",
    age2016: 32,
    avatarSeed: "follower",
    avatarColor: "#7A5C6E",
  },
  DISCIPLE_ZERO: {
    id: "DISCIPLE_ZERO",
    name: "윤선희",
    memberNo: "000",
    publicRole: "직책 없는 오래된 신도 / 돌봄 담당",
    secretRole: "비공식 실세 · 회원번호 000",
    age2016: 52,
    education: "화학과 졸업",
    avatarSeed: "sunhee",
    avatarColor: "#5C6B4E",
    // TODO: 윤선희가 왜 이 정도 접근권을 가질 수 있는지에 대한 구체적 설정은 교단 바이블 H표에서도 "반드시 설정" 항목으로 남아있음 (미정)
  },
  EDITOR: {
    id: "EDITOR",
    name: "박준혁",
    publicRole: "{{SENIOR_COMPANY}} 편집장",
    placeholder: true,
    avatarSeed: "editor",
    avatarColor: "#686E72",
  },

  // ---- 원로회 (교주 바로 아래 핵심 간부 5인, 각자 실무팀을 하나씩 맡는다) ----
  // 이정호와 함께 영림대학교 봉사동아리 출신. 나이·용모 등 세부는 아직 미정.
  COUNCIL_WELFARE_1: {
    id: "COUNCIL_WELFARE_1",
    name: "김병철",
    publicRole: "원로회 · 봉사팀",
    orgTeam: "봉사팀",
    avatarSeed: "council-welfare-1",
    avatarColor: "#5C6B4E",
  },
  COUNCIL_WELFARE_2: {
    id: "COUNCIL_WELFARE_2",
    name: "최상훈",
    publicRole: "원로회 · 봉사팀",
    orgTeam: "봉사팀",
    avatarSeed: "council-welfare-2",
    avatarColor: "#6B7A4E",
  },
  COUNCIL_FINANCE: {
    id: "COUNCIL_FINANCE",
    name: "한미정",
    publicRole: "원로회 · 재정팀",
    orgTeam: "재정팀",
    avatarSeed: "council-finance",
    avatarColor: "#A48C5A",
  },
  COUNCIL_EDUCATION: {
    id: "COUNCIL_EDUCATION",
    name: "고은아",
    publicRole: "원로회 · 교육팀",
    orgTeam: "교육팀",
    avatarSeed: "council-education",
    avatarColor: "#7A5C6E",
  },
  COUNCIL_FACILITY: {
    id: "COUNCIL_FACILITY",
    name: "문재성",
    publicRole: "원로회 · 관리팀(생활·시설)",
    orgTeam: "관리팀",
    orgNote: "윤선희가 공식 직책 없이 이 팀 영역(식사·공간·일정)에 자연스럽게 섞여 들어갈 수 있는 통로.",
    avatarSeed: "council-facility",
    avatarColor: "#446A82",
  },
};

// 가상 포털 (선배의 브라우저에서 검색·뉴스·메일 등에 접속하는 가상 사이트).
// 2010년대 한국 포털의 뼈대만 참고한 완전히 독립된 가상 서비스.
export const PORTAL = {
  id: "PORTAL",
  name: "다이버",
  englishName: "DIVER",
  domain: "diver.com",
  colors: {
    primary: "#03C75A",
    primaryDark: "#02A94D",
    primaryDarker: "#018C40",
    primaryLight: "#E9FBEF",
    primaryLighter: "#F2FDF6",
  },
};

// 다이버 카페(가상 포털의 '내 카페' 기능) 회원 계정 목록.
// 설정: 공식 창립(1999년) 이전 활동은 이 카페(영림대학교 봉사동아리 시절부터
// 쓰던 비공개 카페)에서 이뤄졌다. 카페는 가입 회원 계정만 접속 가능한
// 비공개 카페이며, 원로회를 비롯한 간부만 회원으로 등록되어 있다.
// diverId가 null인 인물은 아직 다이버 계정 아이디가 확정되지 않은 것 —
// 확정되면 문자열만 채워 넣으면 카페 접근 로직(isDiverCafeMember)에 자동
// 반영된다. 새로운 간부가 추가로 카페 회원이라는 설정이 생기면 이 배열에
// { personId: "...", diverId: "..." } 한 줄만 추가하면 된다.
export const DIVER_CAFE_MEMBERS = [
  { personId: "LEADER", diverId: null },
  { personId: "COUNCIL_WELFARE_1", diverId: null },
  { personId: "COUNCIL_WELFARE_2", diverId: null },
  { personId: "COUNCIL_FINANCE", diverId: null },
  { personId: "COUNCIL_EDUCATION", diverId: null },
  { personId: "COUNCIL_FACILITY", diverId: null },
];

// 로그인한 다이버 계정 아이디가 카페 회원인지 확인한다. diverId가 아직
// null(미확정)인 회원은 어떤 아이디를 입력해도 매치되지 않는다.
export function isDiverCafeMember(loginId) {
  if (!loginId) return false;
  return DIVER_CAFE_MEMBERS.some((m) => m.diverId && m.diverId === loginId);
}

// 카페 "회원" 목록 화면 표시용. 아이디가 미확정인 회원도 이름은 보여주되
// 계정 미확정 상태임을 표시한다.
export function getCafeMemberRoster() {
  return DIVER_CAFE_MEMBERS.map((m) => ({
    person: PEOPLE[m.personId],
    diverId: m.diverId,
  }));
}

// 교단 설정. "교단 바이블 — 창립·교리·조직·성장" 문서 기준 (연성회 고정 설정).
// 그 문서에서 ⚪ 미정으로 남은 항목은 여기서도 placeholder로만 표시하고
// 임의로 채우지 않는다 — 값이 정해지면 이 파일만 고치면 게임 전체에 반영된다.
export const CULT = {
  name: "연성회",
  hanja: "蓮聖會",
  domain: "yeonseonghoe.local",

  // ---- 상징 (연꽃 + 태양 + 새벽) ----
  symbolSummary: "연꽃 + 어둠 속에서 반쯤 떠오르는 태양 + 새벽",
  symbolism: {
    lotus:
      "더러운 진흙 속에서도 피어나는 연꽃처럼, 타락한 세상 속에서도 선택받은 인간은 더럽혀지지 않을 수 있다는 상징. 신도 한 명 한 명을 '연화(蓮花)'라고 부르기도 한다.",
    sun:
      "아직 세상에 뜨지 않은 구원과 진실의 상징. 태양 자체를 숭배하는 것은 아니며, 선지자가 세상에 태양을 '띄운다'고 믿는다.",
    dawn:
      "선지자의 도래 직전의 시간. '가장 어두울 때가 새벽에 가장 가깝다'는 식의 문구를 자주 사용한다.",
  },
  logoDirection: "연꽃 위로 반쯤 떠오르는 태양",
  colors: {
    primary: "#4e625b",
    secondary: "#ece8dc",
    accent: "#a48c5a",
    ink: "#343733",
  },
  colorsPlaceholder: true, // TODO: 교단 대표색은 교단 바이블에도 빈칸으로 남아있음. 위 값은 확정 전 임시 팔레트.

  // ---- 핵심 교리 ----
  coreDoctrine:
    "세상은 이미 타락하여 어둠으로 물들었다. 그러나 때가 이르면 선지자가 나타나 세상에 태양을 띄울 것이다.",
  currentEraName: "긴 밤",
  innerIdentity: "밤을 견디는 사람들",
  // 강림 정의는 기존 canon 그대로 유지한다. '계시'는 대체 용어로 쓰지 않는다.
  gangnimDefinition:
    "신이 이정호의 몸 자체를 매개로 사용하는 현상. 이정호는 강림 중 자신의 발언을 기억하지 못한다.",
  innerPhrases: [
    "밤은 반드시 끝난다.",
    "진흙 없는 연꽃은 없다.",
    "우리는 태양을 기다리는 것이 아니라, 태양을 맞을 준비를 한다.",
    "새벽을 본 자는 다시 밤으로 돌아갈 수 없다.",
  ],

  // ---- 외부용 ----
  publicDescription: "봉사·상담·명상·청소년 지원 등을 하는 작은 종교 공동체",
  publicReputation: "조금 특이하지만 봉사를 열심히 하는 종교단체",
  publicSlogan: "__TBD_PUBLIC_SLOGAN__",
  publicSloganPlaceholder: true, // TODO: 외부 홍보 슬로건은 교단 바이블에도 확정 안 됨 (내부 문구 4개는 innerPhrases 참고, 그것과는 별개)

  // ---- 지도자 호칭 ----
  // leaderTitle/leaderHonorific: 회원DB·간부 시스템 등 행정/구조적 맥락에서 쓰는 직함.
  // leaderPublicEpithet: 대외적으로 실제 불리는 호칭. 이정호는 스스로 "내가 선지자다"라고 선언하지 않는다.
  leaderTitle: "교주",
  leaderHonorific: "교주님",
  leaderPublicEpithet: "새벽을 준비하는 자",
  leaderPublicEpithetAlt: "길을 밝히는 사람",

  // ---- 창립 (공식 대외 서사와 실제 시작 사이에 시차가 있다 — 000 미스터리와 연결) ----
  founded: "1999", // 공식(대외) 창립년도. {{CULT_FOUNDED}} 토큰은 이 값을 쓴다.
  officialFoundedDate: "1999-08-07", // 공식 창립일 (대외 공개)
  actualStartDate: "1998-08-01", // 실제 시작일 (비공개 — 아카이브 등에서 발견)
  foundingPlace: "영림대학교 봉사동아리 방", // 실제 시작 장소 (비공개)

  // ---- 본부/규모 ----
  hq: "주황길 25",
  hqType: "단독 건물 (자가)",
  branches: "없음",
  memberCounts: {
    peakLabel: "전성기 약 230~270명",
    active2016: 180,
    registered2016: 250,
    core: 5, // 원로회 인원
  },

  // ---- 의식 ----
  rituals: {
    dawn: {
      name: "여명의식",
      desc: "해가 뜨기 전 신도들이 모여 어둠 속에서 예식을 시작하고, 마지막에 창문이나 문을 열어 빛을 들인다. 연꽃 문양의 등이나 촛불을 사용한다.",
    },
    confession: {
      name: "연화고백",
      desc: "자신의 죄·후회·비밀을 '진흙'이라고 표현하며 고백한다. 핵심 문구: '진흙은 인정해야 연꽃이 핀다.'",
    },
    drink: {
      name: "연화수 / 새벽차",
      desc: "일부 폐쇄적인 의식에서 제공되는 음료. 신도들은 영적 체험을 돕는 성스러운 음료로 알고 있으나, 실제 성분과 목적은 극소수 간부만 안다.",
    },
  },

  // ---- 조직도 ----
  orgLevels: ["교주", "원로회 (5명)", "여명관 / 연화관", "봉사팀 · 생활팀(관리팀) · 재정팀 · 교육팀 · 모집팀", "일반 신도 (연화)"],

  // ---- 경제/모집/대외이미지/이탈 관리 ----
  income: "일반 헌금, 신도 후원, 수련회 비용, 명상·상담 프로그램, 산하 봉사단체 후원금",
  recruitPath: "봉사활동·상담·마음치유 프로그램을 통해 처음 접하게 한다. 초반에는 종교나 선지자 이야기를 거의 하지 않는다.",
  leaverTerms: ["밤을 견디지 못한 사람", "새벽을 보지 못하고 돌아간 사람"],
};

export const STAFF_CREDENTIALS = {
  username: "s.yoon",
  password: "chungnyeon1998",
  placeholder: true, // TODO: 간부 계정 ID/비밀번호 확정 필요 (임시 퍼즐용 값)
};

// 토큰 치환용 사전. 컨텐츠 문자열 안에서 {{TOKEN}} 형태로 참조한다.
export function buildTokenMap() {
  return {
    PLAYER: PLAYER.displayName,
    SENIOR: SENIOR.name,
    SENIOR_GIVEN: SENIOR.givenName,
    SENIOR_COMPANY: SENIOR.company,
    SENIOR_COMPANY_DOMAIN: SENIOR.companyEmailDomain,
    SENIOR_EMAIL: SENIOR.email,
    SENIOR_FAMILY: SENIOR_FAMILY.name,
    SENIOR_FAMILY_GIVEN: SENIOR_FAMILY.givenName,
    SENIOR_FAMILY_REL: SENIOR_FAMILY.relationToSenior,
    LEADER: PEOPLE.LEADER.name,
    LEADER_NO: PEOPLE.LEADER.memberNo,
    LEADER_TITLE: PEOPLE.LEADER.publicRole,
    FOLLOWER: PEOPLE.FOLLOWER.name,
    FOLLOWER_GIVEN: PEOPLE.FOLLOWER.givenName,
    FOLLOWER_NO: PEOPLE.FOLLOWER.memberNo,
    SUNHEE: PEOPLE.DISCIPLE_ZERO.name,
    SUNHEE_NO: PEOPLE.DISCIPLE_ZERO.memberNo,
    SUNHEE_ROLE: PEOPLE.DISCIPLE_ZERO.publicRole,
    EDITOR: PEOPLE.EDITOR.name,
    CULT_NAME: CULT.name,
    CULT_SLOGAN: CULT.publicSlogan,
    CULT_LEADER_TITLE: CULT.leaderTitle,
    CULT_LEADER_HONORIFIC: CULT.leaderHonorific,
    CULT_FOUNDED: CULT.founded,
    CULT_DOMAIN: CULT.domain,
    CULT_HANJA: CULT.hanja,
    CULT_LEADER_EPITHET: CULT.leaderPublicEpithet,
    CULT_LEADER_EPITHET_ALT: CULT.leaderPublicEpithetAlt,
    CULT_CORE_DOCTRINE: CULT.coreDoctrine,
    CULT_ERA_NAME: CULT.currentEraName,
    CULT_INNER_IDENTITY: CULT.innerIdentity,
    CULT_HQ: CULT.hq,
    CULT_FOUNDING_PLACE: CULT.foundingPlace,
    PORTAL_NAME: PORTAL.name,
    PORTAL_EN: PORTAL.englishName,
    PORTAL_DOMAIN: PORTAL.domain,
  };
}

export function getPerson(id) {
  if (id === "SENIOR") return SENIOR;
  if (id === "SENIOR_FAMILY") return SENIOR_FAMILY;
  if (id === "PLAYER") return PLAYER;
  return PEOPLE[id];
}
