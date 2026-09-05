export const CALLS = [
  {
    id: "CALL-001",
    dateLabel: "2016-04-30",
    time: "21:14",
    durationLabel: "00:52",
    contactName: "취재원 K",
    avatarSeed: "sourcek",
    avatarColor: "#686E72",
    direction: "incoming",
    lines: [
      { speaker: "K", delayMs: 600, text: "여보세요." },
      { speaker: "SENIOR", delayMs: 900, text: "네, 접니다. 통화 괜찮으세요?" },
      { speaker: "K", delayMs: 1000, text: "짧게만요. 저번에 보내드린 이름, 검색은 해보셨어요?" },
      { speaker: "SENIOR", delayMs: 900, text: "네. {{CULT_NAME}} 맞더라고요." },
      { speaker: "K", delayMs: 1200, text: "겉보기엔 멀쩡해요. 그게 문제죠." },
      { speaker: "SENIOR", delayMs: 1000, text: "안에서는 어떤데요?" },
      { speaker: "K", delayMs: 1400, text: "그건... 다음에요. 끊을게요." },
    ],
    onCompleteFlags: [],
  },
  {
    id: "CALL-002",
    dateLabel: "2016-06-14",
    time: "23:02",
    durationLabel: "01:10",
    contactName: "취재원 K",
    avatarSeed: "sourcek",
    avatarColor: "#686E72",
    direction: "incoming",
    requiresFlag: "FOUND_LEADER_HEALTH_LOG",
    lines: [
      { speaker: "K", delayMs: 600, text: "그 식단표, 어디서 났어요?" },
      { speaker: "SENIOR", delayMs: 900, text: "내부 자료함에서요. 왜, 문제 있어요?" },
      { speaker: "K", delayMs: 1200, text: "그거 선희 선생님이 직접 쓰신 거예요. 몇 년째." },
      { speaker: "SENIOR", delayMs: 1000, text: "그냥 돌봄 담당 아니었어요?" },
      { speaker: "K", delayMs: 1500, text: "그렇게들 알고 있죠. 근데 {{CULT_LEADER_HONORIFIC}} 일정도, 컨디션도 다 그분 통해서 정해져요." },
      { speaker: "SENIOR", delayMs: 1300, text: "직책도 없는 분이 왜..." },
      { speaker: "K", delayMs: 1500, text: "그러니까요. 예전 사이트 한번 찾아보세요. 지금 홈페이지 말고, 옛날 거." },
      { speaker: "SENIOR", delayMs: 900, text: "옛날 사이트가 남아있어요?" },
      { speaker: "K", delayMs: 1100, text: "찾으면요." },
    ],
    onCompleteFlags: [],
  },
];

export function getCall(id) {
  return CALLS.find((c) => c.id === id);
}
