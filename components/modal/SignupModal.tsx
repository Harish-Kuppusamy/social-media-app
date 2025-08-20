"use client";
import React, { useEffect } from "react";
import { Modal } from "@mui/material";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/Store";
import { closeSignupModal, openSignupModal } from "@/redux/slices/ModalSlice";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/16/solid";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/Firebase";
import { signInUser } from "@/redux/slices/UserSlice";

export default function SignupModal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const isOpen = useSelector((state: RootState) => state.modal.SignupModalOpen);
  const dispatch: AppDispatch = useDispatch();

  async function handleSignup() {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User created with email: ", userCredentials);

    await updateProfile(userCredentials.user, {
      displayName: name,
    });
    dispatch(
      signInUser({
        name: userCredentials.user.displayName,
        username: userCredentials.user.email!.split("@")[0],
        email: userCredentials.user.email,
        uid: userCredentials.user.uid,
      })
    );
  }

  async function handleGuestLogin() {
    await signInWithEmailAndPassword(auth, "guest404@gmail.com", "guest123");
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;

      // redux dispatch user details here4mc
      dispatch(
        signInUser({
          name: currentUser.displayName,
          username: currentUser.email!.split("@")[0],
          email: currentUser.email,
          uid: currentUser.uid,
        })
      );
    });

    return () => {
      unSubscribe();
    };
  }, []);
  return (
    <>
      <button
        className="w-full h-[40px] md:w-[88px] md:h-[40px] text-md md:text-sm  font-bold bg-white text-black rounded-full  hover:bg-white hover:bg-opacity-25 transition"
        onClick={() => dispatch(openSignupModal())}
      >
        Sign Up
      </button>

      <Modal
        open={isOpen}
        onClose={() => dispatch(closeSignupModal())}
        className=" flex justify-center items-center"
      >
        <div className=" w-full h-full sm:w-[600px] sm:h-fit bg-white sm:rounded-xl">
          <XMarkIcon
            className="w-7 mt-5 ms-5 cursor-pointer"
            onClick={() => dispatch(closeSignupModal())}
          />

          <div className="pt-10 pb-20 px-4 sm:px-20">
            <h1 className="text-3xl font-bold mb-10">Create Your Account</h1>
            <div className="w-full space-y-6 mb-10">
              <input
                className="w-full h-[54px] border border-gray-200 outline-none ps-3 rounded-[4px] focus:border-[#F4AF01] transition"
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
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
              onClick={() => handleSignup()}
            >
              Sign Up
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
