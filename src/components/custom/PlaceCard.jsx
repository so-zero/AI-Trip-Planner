import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlaceDetails, PHOTO_REF_URL } from "@/config/globalApi";

const PlaceCard = ({ place }) => {
  const [photo, setPhoto] = useState();

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place?.placeName,
    };

    const result = await getPlaceDetails(data).then((response) => {
      console.log(response.data);

      const photoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        response.data.places[0].photos[1].name
      );
      setPhoto(photoUrl);
    });
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`}
      target="_blank"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:shadow-md transition-all cursor-pointer">
        <img
          src={photo ? photo : "/airplane.jpg"}
          alt=""
          className="w-[130px] h-[130px] rounded-xl my-auto object-cover"
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
