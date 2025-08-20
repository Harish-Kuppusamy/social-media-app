"use client";

import {
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
  ChartBarIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/16/solid";
import {
  arrayRemove,
  arrayUnion,
  DocumentData,
  Timestamp,
} from "firebase/firestore";
import Moment from "react-moment";
import Image from "next/image";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

interface PostProps {
  data: DocumentData;
  id: string;
}
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/Store";
import {
  openCommandModal,
  openLoginModal,
  setCommentPostDetails,
} from "@/redux/slices/ModalSlice";
import Link from "next/link";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/Firebase";

const Post = ({ data, id }: PostProps) => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  async function likePost() {
    if (!user.username) {
      alert("You need to be logged in to like a post");
      dispatch(openLoginModal());
      return;
    }
    const PostRef = doc(db, "posts", id);
    if (data.likes.includes(user.uid)) {
      await updateDoc(PostRef, { likes: arrayRemove(user.uid) });
    } else {
      await updateDoc(PostRef, { likes: arrayUnion(user.uid) });
    }
  }

  return (
    <div className="border-b border-gray-200">
      <Link href={"/" + id}>
        <PostHeader
          username={data.username}
          name={data.name}
          timestamp={data.timestamp}
          text={data.text}
        />
      </Link>
      <div className="ml-16 p-3 flex space-x-14">
        <div className="relative">
          <ChatBubbleOvalLeftEllipsisIcon
            className="w-[22px] h-[22px] cursor-pointer hover:text-[#F4AF01] transition"
            onClick={() => {
              if (!user.username) {
                dispatch(openLoginModal());
                return;
              }

              dispatch(
                setCommentPostDetails({
                  name: data.name,
                  username: data.username,
                  id: id,
                  text: data.text,
                })
              );
              dispatch(openCommandModal());
            }}
          />
          {data.comments.length > 0 && (
            <span className="absolute text-xs top-1 -right-3">
              {data.comments.length}
            </span>
          )}
        </div>
        <div className="relative">
          {data.likes.includes(user.uid) ? (
            <HeartSolid
              className="w-[22px] h-[22px] cursor-pointer text-pink-500 transition "
              onClick={() => likePost()}
            />
          ) : (
            <HeartIcon
              className="w-[22px] h-[22px] cursor-pointer hover:text-pink-500 transition"
              onClick={() => likePost()}
            />
          )}
          {data.likes.length > 0 && (
            <span className="absolute text-xs top-1 -right-3">
              {data.likes.length}
            </span>
          )}
        </div>
        <div>
          <ChartBarIcon className="w-[22px] h-[22px] cursor-not-allowed" />
        </div>
        <div>
          <ArrowUpTrayIcon className="w-[22px] h-[22px] cursor-not-allowed" />
        </div>
      </div>
    </div>
  );
};

export default Post;

interface PostHeaderProps {
  username: string;
  name: string;
  timestamp?: Timestamp;
  text: string; // Post content
  replyTo?: string;
}

export function PostHeader({
  username,
  name,
  timestamp,
  text,
  replyTo,
}: PostHeaderProps) {
  console.log(timestamp);
  return (
    <div className="flex p-3 space-x-5">
      <Image
        src={"/profile.png"}
        width={44}
        height={44}
        alt="profile"
        className="w-11 h-11 z-10 bg-white"
      />

      <div className="text-[15px] flex flex-col space-y-1.5 items-start">
        <div className="flex space-x-1.5 text-[15px] text-[#707E89] items-center">
          <span className="inline-block font-bold text-[#0F1419] whitespace-nowrap overflow-hidden text-ellipsis max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px] sm:max-w-[160px]">
            {name}
          </span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px] sm:max-w-[160px]">
            {username}
          </span>

          {timestamp && (
            <>
              <span> - </span>
              <Moment fromNow>{timestamp.toDate()}</Moment>
            </>
          )}
        </div>

        <span>{text}</span>

        {replyTo && (
          <span className="text-[15px] text-[#707E09] ">
            Replying To <span className="text-[#F4AF01]">@{replyTo}</span>
          </span>
        )}
      </div>
    </div>
  );
}
