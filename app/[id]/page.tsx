import React from "react";
import Sidebar from "@/components/Sidebar";

import Widgets from "@/components/Widgets";
import SignupPrompt from "@/components/SignupPrompt";
import {
  ArrowLeftCircleIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalCircleIcon,
  HeartIcon,
  ChartBarIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import Image from "next/image";
import { PostHeader } from "@/components/Post";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/Firebase";

const fetchPost = async (id: string) => {
  const PostRef = doc(db, "posts", id);
  const docSnap = await getDoc(PostRef);
  return docSnap.data();
};

interface pageProps {
  params: { id: string };
}

interface Comment{
  name: string;
  username: string;
  text: string;
}
export default async function page({ params }: pageProps) {
  const { id } = params;
  const post = await fetchPost(id);
  console.log(post?.likes);
  console.log(post?.comments);

  return (
    <>
      <div className="text-[#0F1419] min-h-screen max-w-[1400px] mx-auto flex justify-center">
        <Sidebar />
        <div className="flex-grow  max-w-2xl px-3 border-x border-gray-200">
          <div className="py-4 px-3 text-lg md:text-xl sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm font-bold border-b border-gray-200 flex items-center">
            <Link href="/">
              <ArrowLeftCircleIcon className="w-5 h-5 mr-4 cursor-pointer" />
            </Link>
            Bumble
          </div>

          <div className=" flex flex-col space-y-5 p-3 border-b border-gray-200">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center space-x-3">
                <Image
                  src="/profile.png"
                  className="w-11 h-11"
                  width={44}
                  height={44}
                  alt=" profile"
                />
                <div className="flex flex-col text-[15px]">
                  <span className="font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px] sm:max-w-[160px] inline-block">
                    {post?.name}
                  </span>
                  <span className="text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px] sm:max-w-[160px] inline-block">
                    {post?.username}
                  </span>
                </div>
              </div>
              <EllipsisHorizontalCircleIcon className="w-5 h-5" />
            </div>
            <span className="text-[15px]">{post?.text}</span>
          </div>
          <div>
            <div className="border-b border-gray-200 p-3 text-[15px]">
              <span className="font-bold">{post?.likes.length}</span> Likes
            </div>
          </div>

          <div className="border-b border-gray-200 p-3 text-[15px]  flex items-center justify-around space-x-4">
            <ChatBubbleOvalLeftEllipsisIcon className="w-[22px] h-[22px] cursor-not-allowed" />
            <HeartIcon className="w-[22px] h-[22px] cursor-not-allowed" />
            <ChartBarIcon className="w-[22px] h-[22px] cursor-not-allowed" />
            <ArrowUpTrayIcon className="w-[22px] h-[22px] cursor-not-allowed" />
          </div>

          {post?.comments?.map(
            (comment: Comment ) => (
              <Comments name={comment.name} username={comment.username} text={comment.text} />
            )
          )}
        </div>
        <Widgets />
      </div>

      <SignupPrompt />
    </>
  );
}

export function Comments({name,username, text  }: Comment) {
  return (
    <div className="border-b border-gray-200">
      <PostHeader name={name} username={username} text={text} />
      <div className="flex items-center  space-x-14 p-3 ms-16">
        <ChatBubbleOvalLeftEllipsisIcon className="w-[22px] h-[22px] cursor-not-allowed" />
        <HeartIcon className="w-[22px] h-[22px] cursor-not-allowed" />
        <ChartBarIcon className="w-[22px] h-[22px] cursor-not-allowed" />
        <ArrowUpTrayIcon className="w-[22px] h-[22px] cursor-not-allowed" />
      </div>
    </div>
  );
}
