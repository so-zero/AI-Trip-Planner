import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "cheap 예산으로 2명을 위한 3일 동안 서울에 대한 여행 계획을 생성하세요. 호텔은 hotelName, hotelAddress, hotelPrice, hotelImgUrl, hotelCoordinates, hotelRating, hotelDescription이 포함된 호텔 옵션 목록을 제공하고 placeName, placeDetails, placeImgUrl, placeCoordinates, ticketPrice, placeRating가 포함된 여행 일정을 제안하세요. 방문하기 가장 좋은 시간과 함께 각 데이터 계획을 사용하여 3일 동안 갈 수 있는 여러 곳의 각 위치의 시간 여행을 제공하는 JSON 형식의 데이터를 제공해주세요.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "trip": {\n    "destination": "서울",\n    "duration": 3,\n    "travelers": 2,\n    "budget": "저렴",\n    "bestTime": "봄(4월-5월) 또는 가을(9월-10월)이 서울을 방문하기에 가장 좋은 시기입니다. 날씨가 온화하고 습도가 낮아 관광과 야외 활동을 즐기기에 좋습니다.",\n    "hotels": [\n      {\n        "hotelName": "호텔 이비스 앰배서더 서울 강남",\n        "hotelAddress": "서울특별시 강남구 논현로 858",\n        "hotelPrice": "100,000원부터",\n        "hotelImgUrl": "https://www.ibis.com/images/hotels/1240/1240_hotel_exterior_day_1.jpg",\n        "hotelCoordinates": "37.5124, 127.0322",\n        "hotelRating": 4.0,\n        "hotelDescription": "강남 지역에 위치한 저렴한 호텔로, 쇼핑과 나이트라이프를 즐기기에 좋은 위치입니다."\n      },\n      {\n        "hotelName": "호텔 낙원",\n        "hotelAddress": "서울특별시 종로구 낙원동 181-1",\n        "hotelPrice": "80,000원부터",\n        "hotelImgUrl": "https://www.hotelnakwon.co.kr/images/main/hotel-nakwon-main-image.jpg",\n        "hotelCoordinates": "37.5708, 126.9866",\n        "hotelRating": 3.5,\n        "hotelDescription": "종로에 위치한 저렴한 호텔로, 인사동과 북촌 한옥마을과 가깝습니다."\n      },\n      {\n        "hotelName": "호텔 그레이스 서울 강남",\n        "hotelAddress": "서울특별시 강남구 논현로 856",\n        "hotelPrice": "90,000원부터",\n        "hotelImgUrl": "https://www.gracehotelseoul.com/images/main/main_visual_01.jpg",\n        "hotelCoordinates": "37.5126, 127.0323",\n        "hotelRating": 4.5,\n        "hotelDescription": "강남 지역에 위치한 저렴한 호텔로, 쇼핑과 나이트라이프를 즐기기에 좋은 위치입니다."\n      }\n    ],\n    "itinerary": [\n      {\n        "day": 1,\n        "title": "역사와 문화 체험",\n        "places": [\n          {\n            "placeName": "경복궁",\n            "placeDetails": "서울의 대표적인 궁궐로, 아름다운 건축물과 전통 정원을 감상할 수 있습니다. 근정전, 교태전, 사정전 등 다양한 건물을 둘러보고 왕궁의 역사와 문화를 느껴보세요.",\n            "placeImgUrl": "https://www.royalpalace.go.kr/portal/main/images/main_visual/01_main_visual_01.jpg",\n            "placeCoordinates": "37.5790, 126.9774",\n            "ticketPrice": "10,000원",\n            "placeRating": 4.5\n          },\n          {\n            "placeName": "북촌 한옥마을",\n            "placeDetails": "전통 한옥이 즐비한 북촌 한옥마을은 서울의 역사와 전통을 느낄 수 있는 곳입니다. 골목길을 거닐며 아름다운 한옥과 전통 공예품을 감상해보세요.",\n            "placeImgUrl": "https://www.visitkorea.or.kr/images/content/common/m_detail_banner_01_img.jpg",\n            "placeCoordinates": "37.5827, 126.9897",\n            "ticketPrice": "무료",\n            "placeRating": 4.0\n          },\n          {\n            "placeName": "인사동",\n            "placeDetails": "전통 공예품과 미술품, 차, 찻집 등 다양한 볼거리와 즐길 거리가 있는 곳입니다. 한국의 전통 문화를 체험하고 기념품을 구매해보세요.",\n            "placeImgUrl": "https://www.visitkorea.or.kr/images/content/common/m_detail_banner_01_img.jpg",\n            "placeCoordinates": "37.5714, 126.9812",\n            "ticketPrice": "무료",\n            "placeRating": 4.0\n          }\n        ]\n      },\n      {\n        "day": 2,\n        "title": "도시 체험",\n        "places": [\n          {\n            "placeName": "롯데월드",\n            "placeDetails": "서울의 대표적인 놀이공원으로, 다양한 놀이기구와 쇼를 즐길 수 있습니다. 자이로드롭, 아트란티스 등 스릴 넘치는 놀이기구를 타고 짜릿한 경험을 해보세요.",\n            "placeImgUrl": "https://www.lotteworld.com/upload/images/common/main/main_visual_01.jpg",\n            "placeCoordinates": "37.5188, 127.0983",\n            "ticketPrice": "50,000원",\n            "placeRating": 4.5\n          },\n          {\n            "placeName": "코엑스 아쿠아리움",\n            "placeDetails": "다양한 해양 생물을 만날 수 있는 곳입니다. 펭귄, 상어, 해파리 등 흥미로운 해양 생물들을 관찰하고 바닷속 세상을 경험해보세요.",\n            "placeImgUrl": "https://www.coexaquarium.com/images/main/main_visual_01.jpg",\n            "placeCoordinates": "37.5132, 127.0543",\n            "ticketPrice": "30,000원",\n            "placeRating": 4.0\n          },\n          {\n            "placeName": "강남",\n            "placeDetails": "서울의 대표적인 번화가로, 쇼핑, 레스토랑, 엔터테인먼트 등 다양한 즐길 거리가 있습니다. 쇼핑을 즐기거나, 맛집을 찾아 식사를 하거나, 밤에는 화려한 나이트라이프를 즐겨보세요.",\n            "placeImgUrl": "https://www.visitkorea.or.kr/images/content/common/m_detail_banner_01_img.jpg",\n            "placeCoordinates": "37.5087, 127.0284",\n            "ticketPrice": "무료",\n            "placeRating": 4.0\n          }\n        ]\n      },\n      {\n        "day": 3,\n        "title": "자연과 휴식",\n        "places": [\n          {\n            "placeName": "올림픽공원",\n            "placeDetails": "넓은 녹지 공간과 다양한 체육 시설이 있는 곳입니다. 산책, 조깅, 자전거를 타며 휴식을 취하거나, 88잔디마당에서 피크닉을 즐겨보세요.",\n            "placeImgUrl": "https://www.visitkorea.or.kr/images/content/common/m_detail_banner_01_img.jp',
        },
      ],
    },
  ],
});
