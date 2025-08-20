
import Sidebar from "../components/Sidebar";
import PostFeed from "@/components/PostFeed";
import Widgets from "@/components/Widgets";
import SignupPrompt from "@/components/SignupPrompt";
import CommandModal from "@/components/modal/CommandModal";
import LoadingScreen from "@/components/LoadingScreen";
export default function Home() {
  return (
    <>
      <div className="text-[#0F1419] min-h-screen max-w-[1400px] mx-auto flex justify-center">
        <Sidebar />
        <PostFeed />
        <Widgets />
      </div>
<CommandModal/>
      <SignupPrompt />
      <LoadingScreen/>
    </>
  );
}
