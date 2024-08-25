import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("user", user);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserInfo(codeResp),
    onError: (error) => console.log(error),
  });

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
        window.location.reload();
      });
  };

  return (
    <div className="p-3 px-5 flex items-center justify-between shadow-sm">
      <div className="flex items-center justify-center gap-3">
        <img src="/plane.svg" alt="logo" className="w-10 h-10" />
        <Link to="/" className="text-lg font-bold">
          AI Trip
        </Link>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <Link to="/create-trip">
              <Button variant="outline" className="rounded-full">
                + Create Trip
              </Button>
            </Link>
            <Link to="/my-trips">
              <Button variant="outline" className="rounded-full">
                My Trips
              </Button>
            </Link>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  alt=""
                  className="w-[35px] h-[35px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent className="w-[150px] mt-2">
                <h2
                  className="cursor-pointer text-sm text-center"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    navigate("/");
                    window.location.reload();
                  }}
                >
                  로그아웃
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>로그인</Button>
        )}
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className="flex items-center gap-3">
                <img src="/plane.svg" alt="logo" className="w-10 h-10" />
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
  );
};

export default Header;
