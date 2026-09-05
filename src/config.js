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
  name: "한지훈",
  placeholder: true, // TODO: 선배 기자 이름/나이/회사 확정 필요
  age: 34,
  company: "주간시선",
  companyEmailDomain: "sisunweekly.local",
  email: "jihoon.han@sisunweekly.local",
  osAccountName: "jihoon.han",
  computerLabel: "HANJIHOON-PC",
};

export const SENIOR_FAMILY = {
  id: "SENIOR_FAMILY",
  name: "한지영",
  givenName: "지영", // 가족끼리는 성을 떼고 이름만 부른다
  placeholder: true, // TODO: 선배 기자 가족 중 교단에 빠진 사람 확정 필요
  relationToSenior: "여동생",
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
  },
  EDITOR: {
    id: "EDITOR",
    name: "박준혁",
    publicRole: "주간시선 편집장",
    placeholder: true,
    avatarSeed: "editor",
    avatarColor: "#686E72",
  },
};

export const CULT = {
  name: "청림회",
  placeholderName: true, // TODO: 교단 정식명/약칭 확정 필요
  shortName: "청림회",
  domain: "cheonglim.local",
  publicSlogan: "마음이 맑아지는 곳, 청림회",
  publicSloganPlaceholder: true, // TODO: 교리/대표 문구 확정 필요
  leaderTitle: "교주",
  leaderHonorific: "교주님",
  founded: "1998",
  foundedPlaceholder: true, // TODO: 교단 창립일 확정 필요
  hq: "경기도 어딘가 (TBD)",
  hqPlaceholder: true, // TODO: 본부/지부 확정 필요
  colors: {
    primary: "#4e625b",
    secondary: "#ece8dc",
    accent: "#a48c5a",
    ink: "#343733",
  },
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
  };
}

export function getPerson(id) {
  if (id === "SENIOR") return SENIOR;
  if (id === "SENIOR_FAMILY") return SENIOR_FAMILY;
  if (id === "PLAYER") return PLAYER;
  return PEOPLE[id];
}
