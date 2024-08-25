import { getPlaceDetails, PHOTO_REF_URL } from "@/config/globalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserTripCard = ({ trip }) => {
  const [photo, setPhoto] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
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
    <Link to={`/view-trip/${trip?.id}`}>
      <img
        src={photo ? photo : '"/airplane.jpg"'}
        alt=""
        className="w-full h-[200px] object-cover rounded-lg hover:scale-105 transition-all"
      />
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-base mt-3">
          {trip?.userSelection?.location?.label}
        </h2>
        <h2 className="text-sm text-gray-600">
          📅 {trip.userSelection?.days}일 💰 {trip.userSelection?.budget}
        </h2>
      </div>
    </Link>
  );
};

export default UserTripCard;
