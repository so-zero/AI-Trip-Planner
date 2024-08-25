import React from "react";
import PlaceCard from "./custom/PlaceCard";

const Places = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-lg my-5">추천 여행 코스</h2>
      <div>
        {trip?.tripData?.trip?.itinerary.map((item, index) => (
          <div key={index} className="mt-5">
            <h2 className="font-medium text-base">🛫 {item.day}일차</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {item?.places.map((place, index) => (
                <div key={index}>
                  <PlaceCard place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Places;
