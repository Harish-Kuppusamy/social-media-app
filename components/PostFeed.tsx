"use client";
import Post from "./Post";
import PostInput from "./PostInput";
import { useEffect } from "react";
import { db } from "@/Firebase";
import { useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/Store";
import { closeLoadingScreen } from "@/redux/slices/LoadingScreenSlice";

const PostFeed = () => {
  const dispatch: AppDispatch = useDispatch();
  const [posts, setPosts] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[]
  >([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log(snapshot.docs);
      const snapshotDocs = snapshot.docs;
      setPosts(snapshotDocs);
      dispatch(closeLoadingScreen());
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex-grow  max-w-2xl px-3 border-x border-gray-200">
      <div className="py-4 px-3 text-lg md:text-xl sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm font-bold border-b border-gray-200">
        Home
      </div>

      <PostInput />
      {posts.map((post) => (
        <Post key={post.id} data={post.data()} id={post.id} />
      ))}
    </div>
  );
};

export default PostFeed;
