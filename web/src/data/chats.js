export const CHAT_THREADS = [
  {
    id: "CHAT-SOURCE-K",
    name: "취재원 K",
    avatarSeed: "sourcek",
    avatarColor: "#686E72",
    alwaysVisible: true,
    messages: [
      { id: "m1", from: "K", mine: false, day: "2016-04-28", time: "22:10", text: "기자님, 그 얘기는 전화로 하지 마요." },
      { id: "m2", from: "SENIOR", mine: true, day: "2016-04-28", time: "22:12", text: "네 알겠습니다. 여기다 정리해서 남겨주세요." },
      { id: "m3", from: "K", mine: false, day: "2016-04-28", time: "22:14", text: "안쪽에서는 다들 그분한테 먼저 확인받아요. 직책도 없는 분인데." },
      { id: "m4", from: "SENIOR", mine: true, day: "2016-04-28", time: "22:15", text: "그분이 누구죠?" },
      { id: "m5", from: "K", mine: false, day: "2016-04-28", time: "22:20", text: "...나중에요. 캡처 하나 구해지면 메일로 보낼게요." },
    ],
  },
];

// {{LEADER}}/{{FOLLOWER}} 사이의 심야 대화는 선배 본인의 메신저 대화가
// 아니라 제3자에게서 넘겨받은 "캡처본"이므로, 실시간 채팅 스레드가 아니라
// 이미지 파일(스크린샷)로 존재한다. -> data/capturedChat.js 참고,
// 표시는 Files/Mail 첨부의 이미지 뷰어에서 이루어진다.

export function getThread(id) {
  return CHAT_THREADS.find((t) => t.id === id);
}
