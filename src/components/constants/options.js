export const selectTravelList = [
  {
    id: 1,
    title: "Just Me",
    desc: "혼자 떠나는 여행",
    icon: "🏄🏻",
    people: "1명",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "둘이서 떠나는 여행",
    icon: "🥂",
    people: "2명",
  },
  {
    id: 3,
    title: "Family",
    desc: "가족들과 떠나는 여행",
    icon: "🏘️",
    people: "3~5명",
  },
  {
    id: 4,
    title: "Friend",
    desc: "친구들과 떠나는 여행",
    icon: "✈️",
    people: "5~10명",
  },
];

export const selectBudgetOptions = [
  {
    id: "1",
    title: "Cheap",
    desc: "저렴하게 여행",
    icon: "💵",
  },
  {
    id: "2",
    title: "Mid-range",
    desc: "평범하게 여행",
    icon: "💰",
  },
  {
    id: "3",
    title: "Luxury",
    desc: "럭셔리하게 여행",
    icon: "💸",
  },
];

export const AI_PROMPT =
  "{budget} 예산으로 {traveler}을 위한 {totalDays}동안 {location}에 대한 여행 계획을 생성하세요. 호텔 이름, 호텔 주소, 가격 호텔 이미지 URL, 지리 좌표, 평가, 설명이 포함된 호텔 옵션 목록을 제공하고 장소 이름, 장소 세부 정보, 장소 이미지 URL, 지리 좌표, 티켓 가격, 평가가 포함된 여행 일정을 제안하세요. 방문하기 가장 좋은 시간과 함께 각 데이터 계획을 사용하여 {totalDays}일 동안 갈 수 있는 여러 곳의 각 위치의 시간 여행을 제공하는 JSON 형식의 데이터를 제공해주세요.";
