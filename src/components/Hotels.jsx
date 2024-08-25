import React from "react";
import { Link } from "react-router-dom";

const Hotels = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-lg my-5">추천 호텔</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {trip.tripData?.trip?.hotels?.map((hotel, index) => (
          <Link
            to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName}`}
            target="_blank"
          >
            <div className="cursor-pointer">
              <img
                src="/airplane.jpg"
                alt=""
                className="rounded-xl hover:scale-105 transition-all"
              />
              <div className="my-2 flex flex-col gap-2">
                <h2 className="font-bold">{hotel.hotelName}</h2>
                <h2 className="text-xs text-gray-500">
                  📍 {hotel.hotelAddress}
                </h2>
                <h2 className="text-xs">💰 {hotel.hotelPrice}~</h2>
                <h2 className="text-xs">⭐ {hotel.hotelRating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
