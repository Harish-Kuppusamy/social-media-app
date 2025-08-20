"use client";
import React from "react";
import Image from "next/image";
import { Modal } from "@mui/material";
import { openLogoutModal, closeLogoutModal } from "@/redux/slices/ModalSlice";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/Store";
import { closeLoginModal, closeSignupModal } from "@/redux/slices/ModalSlice";
import { signOut } from "firebase/auth";
import { auth } from "@/Firebase";

import { signOutUser } from "@/redux/slices/UserSlice";

export default function LogoutModal() {
  const isOpen = useSelector((state: RootState) => state.modal.LogoutModalOpen);
  console.log("logout:", isOpen);

  const dispatch: AppDispatch = useDispatch();

  function handleBoth() {
    dispatch(closeLogoutModal());
    handleSignOut();
  }

  async function handleSignOut() {
    await signOut(auth);

    dispatch(signOutUser());
    dispatch(closeLoginModal());
    dispatch(closeSignupModal());
  }

  const { name, username, email, uid } = useSelector(
    (state: RootState) => state.user
  );
  console.log("user details:", name, username, email, uid);
  return (
    <>
      <div
        className="absolute bottom-3 flex items-center justify-start space-x-2 hover:bg-gray-500 hover:bg-opacity-10 cursor-pointer xl:p-3 xl:pr-6  rounded-full transition
        w-fit xl:w-[240px]
        
        "
        onClick={() => dispatch(openLogoutModal())}
      >
        <Image
          src={"/profile.png"}
          width={16}
          height={16}
          alt="logo"
          className="w-9 h-9"
        />
        <div className=" hidden xl:flex  flex-col text-sm max-w-40">
          <span className="whitespace-nowrap text-ellipsis overflow-hidden font-bold">
            {name}
          </span>
          <span className="whitespace-nowrap text-ellipsis overflow-hidden text-gray-500">
            {username}
          </span>
        </div>
      </div>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLogoutModal())}
        className="flex justify-center items-center"
      >
        <div className="bg-white flex justify-center  space-x-3 p-8">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
            onClick={() => dispatch(closeLogoutModal())}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            onClick={() => handleBoth()}
          >
            Logout
          </button>
        </div>
      </Modal>
    </>
  );
}
