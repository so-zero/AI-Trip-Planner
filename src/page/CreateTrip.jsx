import React, { useEffect, useState } from "react";
import Header from "@/components/custom/Header";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import {
  selectBudgetOptions,
  selectTravelList,
} from "@/components/constants/options";
import { Button } from "@/components/ui/button";

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const onGenerateTrip = () => {
    if (formData?.days > 5) {
      return;
    }
    console.log(formData);
  };

  return (
    <>
      <Header />
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-16">
        <h2 className="font-bold text-2xl">
          🛬 선호하는 여행 스타일을 알려주세요.
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          몇 가지 기본 정보만 제공하면 AI를 활용한 AI Trip Planner가 귀하의
          선호도에 따라 맞춤형 여행 일정을 만들어 드립니다.
        </p>
        <div className="mt-20 flex flex-col gap-10">
          <div>
            <h2 className="text-lg my-3 font-medium">
              🏝️ 여행지를 선택해주세요.
            </h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (value) => {
                  setPlace(value);
                  handleInputChange(location, value);
                },
              }}
            />
          </div>
          <div>
            <h2 className="text-lg my-3 font-medium">
              🚀 여행일정을 선택해주세요.
            </h2>
            <Input
              placeholder="ex.3"
              type="number"
              onChange={(e) => handleInputChange("days", e.target.value)}
            />
          </div>
          <div>
            <h2 className="text-lg my-3 font-medium">
              💳 예산을 선택해주세요.
            </h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {selectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange("budget", item.title)}
                  className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${
                    formData?.budget === item.title && "border-black"
                  }`}
                >
                  <h2 className="text-3xl">{item.icon}</h2>
                  <h2 className="text-lg font-bold mt-2">{item.title}</h2>
                  <h2 className="text-sm text-gray-500 mt-2">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg my-3 font-medium">
              🧑🏻 인원을 선택해주세요.
            </h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {selectTravelList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange("traveler", item.people)}
                  className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg ${
                    formData?.traveler === item.people && "border-black"
                  }`}
                >
                  <h2 className="text-3xl">{item.icon}</h2>
                  <h2 className="text-lg font-bold mt-2">{item.title}</h2>
                  <h2 className="text-sm text-gray-500 mt-2">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="my-10 flex justify-end">
          <Button onClick={onGenerateTrip}>여행 스타일 검색하기</Button>
        </div>
      </div>
    </>
  );
};

export default CreateTrip;
