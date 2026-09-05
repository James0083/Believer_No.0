// 나중에 실제 아이콘/캐릭터 이미지로 교체될 수 있는 SVG 파일들의 경로 모음.
// 실제 파일은 assets/images/ 폴더에 있다.
// 교체 방법: 아래 값은 그대로 두고 assets/images/ 안의 같은 파일명을
// 실제 이미지로 덮어쓰면 된다 (.svg를 .png 등으로 바꾸려면 아래 경로도 같이 수정).

export const ICON_ASSET_PATHS = {
  mail: "assets/images/icon-mail.svg",
  browser: "assets/images/icon-browser.svg",
  messenger: "assets/images/icon-messenger.svg",
  files: "assets/images/icon-files.svg",
  photos: "assets/images/icon-photos.svg",
  phone: "assets/images/icon-phone.svg",
  notes: "assets/images/icon-notes.svg",
  trash: "assets/images/icon-trash.svg",
  computer: "assets/images/icon-computer.svg",
};

// 키는 각 인물의 config.js avatarSeed 값과 맞춘다.
// leader/follower/sunhee는 실제 생성된 원화(IMG-*.png)가 있어 그쪽을 사용하고,
// 아직 원화가 없는 인물은 SVG placeholder를 그대로 쓴다.
export const PORTRAIT_ASSET_PATHS = {
  leader: "assets/images/IMG-JEONGHO-01.png",
  follower: "assets/images/IMG-EUNSEO-01.png",
  sunhee: "assets/images/IMG-SUNHEE-01.png",
  senior: "assets/images/portrait-senior.svg",
  editor: "assets/images/portrait-editor.svg",
  sourcek: "assets/images/portrait-sourcek.svg",
};

// 신도_0번_시즌1_이미지_생성_명세서.md 의 이미지 ID <-> 실제 파일 경로.
// scenePlaceholderDataUri 대신 실제 사진을 쓰고 싶은 곳에서 이 맵을 참조한다.
export const IMAGE_MANIFEST = {
  "IMG-JEONGHO-01": "assets/images/IMG-JEONGHO-01.png",
  "IMG-JEONGHO-SPEECH-01": "assets/images/IMG-JEONGHO-SPEECH-01.png",
  "IMG-EUNSEO-01": "assets/images/IMG-EUNSEO-01.png",
  "IMG-SUNHEE-01": "assets/images/IMG-SUNHEE-01.png",
  "IMG-SUNHEE-EVENT-01": "assets/images/IMG-SUNHEE-EVENT-01.png",
  "IMG-CULT-HQ-01": "assets/images/IMG-CULT-HQ-01.png",
  "IMG-CULT-HALL-01": "assets/images/IMG-CULT-HALL-01.png",
  "IMG-EVENT-GROUP-01": "assets/images/IMG-EVENT-GROUP-01.png",
  "IMG-EARLY-GROUP-01": "assets/images/IMG-EARLY-GROUP-01.png",
  "IMG-E01-SCAN": "assets/images/IMG-E01-SCAN.png",
  "IMG-E02-DESK": "assets/images/IMG-E02-DESK.png",
  "IMG-REPORTER-DESK-01": "assets/images/IMG-REPORTER-DESK-01.png",
};
