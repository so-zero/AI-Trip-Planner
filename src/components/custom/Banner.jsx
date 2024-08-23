import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="mt-12 text-[50px] font-bold">
        AI Trip Planner와 함께 다음 여행지를 찾아보세요! 동선 고민 없이 손쉽게
        여행일정을 짤 수 있습니다.
      </h1>
      <div className="text-xl text-gray-500 text-center flex flex-col gap-3">
        <p>빅데이터 기반 도시/지역 별 대표 가이드</p>
        <p>지도로 보는 테마별 여행지 추천</p>
        <p>지도기반 AI여행일정 플래너</p>
      </div>
      <Link to="/create-trip">
        <Button>시작하기</Button>
      </Link>
    </div>
  );
};

export default Banner;
