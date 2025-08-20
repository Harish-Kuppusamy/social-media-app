"use client";

import React from "react";
import Image from "next/image";
import { RootState } from "@/redux/Store";
import { useSelector } from "react-redux";

export default function LoadingScreen() {
  const isOpen = useSelector(
    (state: RootState) => state.loading.LoadingScreenOpen
  );

  return (
    <div
      className={`fixed top-0 left-0 bottom-0 right-0 bg-white   flex items-center justify-center transition ${
        isOpen ? "opacity-100 z-50" : "opacity-0 -z-50"
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/hockey.png"
          alt="loading"
          width={120}
          height={120}
          className="mb-5"
        />
        <h1 className="text-xl font-bold mb-10">
          Busy <span className=" text-[#F4AF01]">Bee</span>
        </h1>

        <div className="relative flex w-64 animate-pulse gap-2 p-4">
          <div className="h-12 w-12 rounded-full bg-slate-400"></div>
          <div className="flex-1">
            <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
            <div className="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
          </div>
          <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
        </div>
      </div>
    </div>
  );
}
