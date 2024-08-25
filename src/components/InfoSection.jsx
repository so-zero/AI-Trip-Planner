import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { IoIosSend } from "react-icons/io";
import { getPlaceDetails, PHOTO_REF_URL } from "@/config/globalApi";

const InfoSection = ({ trip }) => {
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
    <div>
      <img
        src={photo ? photo : "/airplane.jpg"}
        alt="airplane"
        className="w-full h-[350px] object-cover rounded-lg"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-xl mb-3">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base">
              📅 {trip?.userSelection?.days}일
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base">
              💰 예산: {trip?.userSelection?.budget}
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base">
              🥂 인원: {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>
        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
};

export default InfoSection;
