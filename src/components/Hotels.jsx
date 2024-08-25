import React from "react";
import HotelCard from "./custom/HotelCard";

const Hotels = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-lg my-5">추천 호텔</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {trip?.tripData?.trip?.hotels?.map((hotel, index) => (
          <HotelCard index={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default Hotels;
