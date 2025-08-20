"use client";

import { Modal } from "@mui/material";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/Store";
import { closeCommandModal } from "@/redux/slices/ModalSlice";
import { PostHeader } from "../Post";
import PostInput from "../PostInput";
import { XMarkIcon } from "@heroicons/react/16/solid";
export default function CommandModal() {
  const isOpen = useSelector(
    (state: RootState) => state.modal.CommandModalOpen
  );
  const commands = useSelector(
    (state: RootState) => state.modal.CommentPostDetails
  );
  const dispatch: AppDispatch = useDispatch();

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeCommandModal())}
        className="flex justify-center items-center"
      >
        <div className="bg-white w-full h-full sm:w-[600px] sm:h-fit sm:rounded-xl outline-none relative">
          <XMarkIcon
            className="w-7 mt-5 ms-5 cursor-pointer"
            onClick={() => dispatch(closeCommandModal())}
          />

          <div className="pt-5 pb-10 px-0 sm:px-5 flex flex-col ">
            <PostHeader
              username={commands.username}
              name={commands.name}
              text={commands.text}
              replyTo={commands.username}
            />

            <div className="mt-4">
              <PostInput insideModal={true} />
            </div>

            <div className="absolute w-0.5 h-32 bg-gray-200 left-[33px] sm:left-[53px] top-20 z-0"></div>
          </div>
        </div>
      </Modal>
    </>
  );
}
