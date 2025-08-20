"use client";
import React from "react";
import { Modal } from "@mui/material";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/Store";
import { closeLoginModal, openLoginModal } from "@/redux/slices/ModalSlice";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/Firebase";

export default function LoginModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isOpen = useSelector((state: RootState) => state.modal.LoginModalOpen);
  console.log("isOpen", isOpen);
  const dispatch: AppDispatch = useDispatch();

  async function handleLogin() {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function handleGuestLogin() {
    await signInWithEmailAndPassword(auth, "guest404@gmail.com", "guest123");
  }

  return (
    <>
      <button
        className=" w-full h-[40px] md:w-[88px] md:h-[40px] text-md md:text-sm  border-2 border-gray-100 rounded-full text-white  font-bold hover:bg-white hover:bg-opacity-25 transition"
        onClick={() => dispatch(openLoginModal())}
      >
        Log In
      </button>

      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLoginModal())}
        className=" flex justify-center items-center"
      >
        <div className=" w-full h-full sm:w-[600px] sm:h-fit bg-white sm:rounded-xl">
          <XMarkIcon
            className="w-7 mt-5 ms-5 cursor-pointer"
            onClick={() => dispatch(closeLoginModal())}
          />

          <div className="pt-10 pb-20 px-4 sm:px-20">
            <h1 className="text-3xl font-bold mb-10">Login To Busy Bee</h1>
            <div className="w-full space-y-6 mb-10">
              <input
                className="w-full h-[54px] border border-gray-200 outline-none ps-3 rounded-[4px] focus:border-[#F4AF01] transition"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <div className="w-full h-[54px] border border-gray-200 outline-none  rounded-[4px] focus-within:border-[#F4AF01] transition flex justify-between items-center overflow-hidden pr-3">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="ps-3 w-full h-full outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="w-7 h-7 text-gray-400 cursor-pointer"
                >
                  {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                </div>
              </div>
            </div>

            <button
              className="bg-[#F4AF01] text-white h-[40px] rounded-full shadow-md mb-5 w-full"
              onClick={() => handleLogin()}
            >
              Login
            </button>
            <span className="mb-5 text-sm text-center block">or</span>
            <button
              className="bg-[#F4AF01] text-white h-[40px] rounded-full shadow-md  w-full"
              onClick={() => handleGuestLogin()}
            >
              Login as Guest
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
