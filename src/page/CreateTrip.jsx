import React, { useEffect, useState } from "react";
import Header from "@/components/custom/Header";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  selectBudgetOptions,
  selectTravelList,
} from "@/components/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/config/AIModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserInfo(codeResp),
    onError: (error) => console.log(error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      (formData?.days > 5 && !formData?.location) ||
      !formData.budget ||
      !formData.traveler
    ) {
      toast("선택사항을 모두 선택해주세요.");
      return;
    }

    const FINAL_PROMPT = AI_PROMPT.replace("{budget}", formData?.budget)
      .replace("{traveler}", formData?.traveler)
      .replace("{totalDays}", formData?.days)
      .replace("{location}", formData?.location?.label)
      .replace("{totalDays}", formData?.days);

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result?.response?.text());
  };

  const getUserInfo = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response.data));
        setOpenDialog(false);
        onGenerateTrip();
      });
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
                  handleInputChange("location", value);
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
        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <div className="flex items-center gap-3">
                  <img src="plane.svg" alt="logo" className="w-10 h-10" />
                  <h1 className="font-bold text-black text-xl">AI Trip</h1>
                </div>
                <h2 className="font-bold text-lg mt-7 mb-2">
                  로그인이 필요합니다.
                </h2>
                <p>Google 인증으로 안전하게 앱에 로그인하세요</p>
                <Button
                  onClick={login}
                  className="w-full mt-5 flex gap-4 items-center"
                >
                  <FcGoogle className="w-5 h-5" /> 구글 로그인
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default CreateTrip;
