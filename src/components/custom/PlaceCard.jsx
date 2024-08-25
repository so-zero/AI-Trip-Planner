import React from "react";
import { Link } from "react-router-dom";

const PlaceCard = ({ place }) => {
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`}
      target="_blank"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:shadow-md transition-all cursor-pointer">
        <img
          src="/airplane.jpg"
          alt=""
          className="w-[130px] h-[130px] rounded-xl my-auto"
        />
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-sm">{place?.placeName}</h2>
          <div className="flex gap-2">
            <p className="text-xs">⭐ {place?.placeRating}점</p>
            <p className="text-xs">🎫 {place?.ticketPrice}</p>
          </div>
          <p className="text-sm text-gray-600">{place?.placeDetails}</p>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCard;
