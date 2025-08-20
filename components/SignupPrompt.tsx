"use client";

import React from "react";
import SignupModal from "./modal/SignupModal";
import LoginModal from "./modal/LoginModal";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";

export default function SignupPrompt() {
  const name = useSelector((state: RootState) => state.user.name);
  console.log("name", name);

  return (
    !name && (
      <div className="fixed w-full h-[80px] bg-[#F4AF01] bottom-0 flex justify-center items-center md:space-x-5 lg:justify-between lg:px-20 xl:px-40 2xl:px-60 z-40">
        <div className=" hidden md:flex flex-col text-white">
          <span className="text-xl font-bold">
            Dont Miss Out On Our Latest Bumble Posts
          </span>
          <span>People On Busy Bee Journeys</span>
        </div>
        <div className="flex space-x-2 w-full md:w-auto p-3">
          <LoginModal />
          <SignupModal />
        </div>
      </div>
    )
  );
}
