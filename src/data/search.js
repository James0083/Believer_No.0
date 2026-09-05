export const SEARCH_GROUPS = [
  {
    id: "cult_name",
    aliases: ["{{CULT_NAME}}", "청림회", "cheonglim"],
    resultId: "SR-CULT-HOME",
  },
  {
    id: "leader",
    aliases: ["{{LEADER}}", "이정호", "이정호 {{CULT_LEADER_TITLE}}"],
    resultId: "SR-LEADER",
  },
  {
    id: "staff_domain",
    aliases: ["staff.{{CULT_DOMAIN}}", "간부시스템", "{{CULT_NAME}} 관리자"],
    resultId: "SR-STAFF-LOGIN",
    requires: ["FOUND_STAFF_URL"],
  },
  {
    id: "member_000",
    aliases: ["회원번호 000", "000번", "신도 0번", "0번 신도"],
    resultId: "SR-000-RUMOR",
    requires: ["FOUND_TRACE_000"],
  },
];

export const SEARCH_RESULTS = {
  "SR-CULT-HOME": {
    title: "{{CULT_NAME}} 공식 홈페이지",
    url: "{{CULT_DOMAIN}}",
    desc: "마음이 맑아지는 곳, {{CULT_NAME}}에 오신 것을 환영합니다.",
    navigateTo: "cult:/home",
  },
  "SR-LEADER": {
    title: "{{LEADER}} {{CULT_LEADER_TITLE}} 소개 | {{CULT_NAME}}",
    url: "{{CULT_DOMAIN}}/leader",
    desc: "{{CULT_NAME}}를 이끌어온 {{LEADER}} {{CULT_LEADER_TITLE}}를 소개합니다.",
    navigateTo: "cult:/leader",
  },
  "SR-STAFF-LOGIN": {
    title: "업무시스템 로그인",
    url: "staff.{{CULT_DOMAIN}}",
    desc: "임직원 전용 페이지입니다.",
    navigateTo: "staff:/login",
  },
  "SR-000-RUMOR": {
    title: "[커뮤니티 캐시] ...번호가 이상하다는 얘기...",
    url: "cache.search.local/old-thread-2231",
    desc: "삭제된 게시글의 검색엔진 캐시입니다. 본문을 불러올 수 없습니다.",
    navigateTo: null,
  },
};

import { renderText } from "../text.js";

export function findResultForQuery(query) {
  const normalized = query.trim().toLowerCase().replace(/\s+/g, "");
  for (const group of SEARCH_GROUPS) {
    for (const alias of group.aliases) {
      const rendered = renderText(alias);
      const a = rendered.trim().toLowerCase().replace(/\s+/g, "");
      if (a && normalized.includes(a)) {
        return group;
      }
    }
  }
  return null;
}
