import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="p-3 px-5 flex items-center justify-between shadow-sm">
      <div className="flex items-center justify-center gap-3">
        <img src="/plane.svg" alt="logo" className="w-10 h-10" />
        <span className="text-lg font-bold">AI Trip</span>
      </div>
      <div>
        <Button>로그인</Button>
      </div>
    </div>
  );
};

export default Header;
