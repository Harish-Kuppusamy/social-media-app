"use client";
import {
  PhotoIcon,
  ChartBarIcon,
  FaceSmileIcon,
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/react/16/solid";
import {
  addDoc,
  arrayUnion,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/Firebase";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { doc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/Store";
import { closeCommandModal } from "@/redux/slices/ModalSlice";
import { openLoginModal } from "@/redux/slices/ModalSlice";

interface PostProps {
  insideModal?: boolean;
}
const PostInput = ({ insideModal }: PostProps) => {
  const user = useSelector((state: RootState) => state.user);
  const Comments = useSelector(
    (state: RootState) => state.modal.CommentPostDetails
  );
  const [text, setText] = useState("");
  const dispatch: AppDispatch = useDispatch();

  async function sendPost() {
    if (!user.username) {
      dispatch(openLoginModal());
      setText("");
      return;
    }
    await addDoc(collection(db, "posts"), {
      text: text,
      name: user.name,
      username: user.username,
      timestamp: serverTimestamp(),
      likes: [],
      comments: [],
    });
    setText("");
    alert("Post sent successfully!");
  }

  async function sendComment() {
    const PostRef = doc(db, "posts", Comments.id);
    await updateDoc(PostRef, {
      comments: arrayUnion({
        name: user.name,
        username: user.username,
        text: text,
      }),
    });
    setText("");
    alert("Comment sent successfully!");
    dispatch(closeCommandModal());
  }

  return (
    <div className="flex space-x-5 p-3 items-start border-b border-gray-200">
      <Image
        src={insideModal ? "/profile.png" : "/hockey.png"}
        width={44}
        height={44}
        alt={insideModal ? "profile" : "logo"}
        className="w-11 h-11 z-10 "
      />

      <div className="w-full">
        <textarea
          className="resize-none outline-none w-full min-h-[50px] text-lg"
          placeholder={
            insideModal ? "Share your thoughts..." : "What's Happening?"
          }
          onChange={(e) => setText(e.target.value)}
          value={text}
        ></textarea>

        <div className="flex justify-between items-center pt-5 border-t border-gray-200">
          <div className="flex space-x-1.5 cursor-pointer">
            <PhotoIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
            <ChartBarIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
            <FaceSmileIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
            <CalendarIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
            <MapPinIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
          </div>
          <button
            className="bg-[#F4AF01] rounded-full w-[80px] h-[32px] text-white text-sm cursor-pointer shadow-md disabled:bg-opacity-60"
            onClick={() => (insideModal ? sendComment() : sendPost())}
            disabled={!text}
          >
            Bumble
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostInput;
