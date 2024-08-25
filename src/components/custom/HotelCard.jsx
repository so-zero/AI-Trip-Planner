import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlaceDetails, PHOTO_REF_URL } from "@/config/globalApi";

const HotelCard = ({ hotel }) => {
  const [photo, setPhoto] = useState();

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName,
    };

    const result = await getPlaceDetails(data).then((response) => {
      console.log(response.data);

      const photoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        response?.data?.places[0]?.photos[1]?.name
      );
      setPhoto(photoUrl);
    });
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName}`}
      target="_blank"
    >
      <div className="cursor-pointer">
        <img
          src={photo ? photo : "/airplane.jpg"}
          alt=""
          className="h-[180px] w-full object-cover rounded-xl hover:scale-105 transition-all"
        />
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-bold">{hotel?.hotelName}</h2>
          <h2 className="text-xs text-gray-500">📍 {hotel?.hotelAddress}</h2>
          <h2 className="text-xs">💰 {hotel?.hotelPrice}~</h2>
          <h2 className="text-xs">⭐ {hotel?.hotelRating}</h2>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
