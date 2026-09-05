// 이 대화는 플레이어(선배)의 메신저 안 대화가 아니라, 제보자가 넘겨준
// "캡처본"이다. 그래서 실시간 채팅 UI가 아니라 이미지(스크린샷)와
// 텍스트 파일(추가로 확보한 로그)로만 존재한다.

export const CAPTURE_FRAGMENT_LINES = [
  { from: "LEADER", day: "2016-05-19", time: "01:32", text: "아직 안 자요." },
  { from: "FOLLOWER", day: "2016-05-19", time: "01:33", text: "저도요. 오늘 설교 준비하시는 거 봤어요." },
  { from: "LEADER", day: "2016-05-19", time: "01:40", text: "{{FOLLOWER_GIVEN}}씨 아니면 이 얘기 할 사람이 없네." },
];

export const CAPTURE_EXTENDED_LINES = [
  { from: "FOLLOWER", day: "2015-11-02", time: "23:58", text: "저 오늘 처음으로 {{CULT_LEADER_HONORIFIC}}이랑 단둘이 얘기해서 떨렸어요." },
  { from: "LEADER", day: "2015-11-02", time: "23:59", text: "나도 {{FOLLOWER_GIVEN}}씨랑 얘기하는 시간이 제일 편해요." },
  { from: "FOLLOWER", day: "2016-01-14", time: "22:05", text: "선희 선생님한테는 비밀로 해주세요. 아시면 걱정하실 거예요." },
  { from: "LEADER", day: "2016-01-14", time: "22:07", text: "선희 누님은 어차피 다 아실걸요. 모르는 게 없으신 분이라.", clueIds: ["CLUE-FOLLOWER-CHAT-FULL"] },
];
