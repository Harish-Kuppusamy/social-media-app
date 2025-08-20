import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/16/solid";

import Image from "next/image";

import LogoutModal from "./modal/LogoutModal";

const Sidebar = () => {
  return (
    <>
      <nav className="hidden sm:flex flex-col sticky top-0 p-3 h-screen xl:ml-20 xl:mr-10">
        <div className="relative h-full flex flex-col ">
          <div className="py-3 cursor-pointer">
            <Image src={"/hockey.png"} width={48} height={48} alt="logo" />
          </div>

          <ul>
            <SidebarLinks text="Home" Icon={HomeIcon} />
            <SidebarLinks text="Explore" Icon={HashtagIcon} />
            <SidebarLinks text="Notifications" Icon={BellIcon} />
            <SidebarLinks text="Messages" Icon={InboxIcon} />
            <SidebarLinks text="Bookmarks" Icon={BookmarkIcon} />
            <SidebarLinks text="Profile" Icon={UserIcon} />
            <SidebarLinks text="More" Icon={EllipsisHorizontalCircleIcon} />
            <button className=" hidden xl:block bg-[#F4AF01] w-[200px] h-[52px] rounded-full text-white font-medium cursor-pointer shadow-md mt-2">
              Bumble
            </button>
          </ul>
          <LogoutModal />
        </div>
      </nav>
    </>
  );
};

export default Sidebar;

interface sidebarLinkProps {
  text: string;
  Icon: any;
}

const SidebarLinks = ({ text, Icon }: sidebarLinkProps) => {
  return (
    <li className="flex items-center text-xl mb-2 space-x-3 p-2.5 cursor-pointer">
      <Icon className="h-7" />
      <span className="hidden xl:block">{text}</span>
    </li>
  );
};
