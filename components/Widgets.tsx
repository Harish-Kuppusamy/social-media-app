import {
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/16/solid";
import Image from "next/image";

const Widgets = () => {
  return (
    <div className="p-3 w-[400px] hidden lg:flex flex-col space-y-4 ps-10">
      <div className="flex bg-[#EFF3F4] text-[#89959D] h-[44px] items-center space-x-3 rounded-full pl-5 ">
        <MagnifyingGlassIcon className="w-[20px] h-[20px]" />
        <input
          type="text"
          placeholder="Search Busy Bee"
          className="bg-transparent outline-none"
        />
      </div>

      <div className=" bg-[#EFF3F4] rounded-xl p-3 ">
        <h1 className="text-xl font-bold mb-2">What's Happenning!!!?</h1>

        <div className="flex flex-col py-3 space-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-[#536471] text-[13px]">
              Trending In Australlia
            </span>
            <EllipsisHorizontalIcon className="w-[20px]" />
          </div>

          <span className="font-bold text-sm">#ReactJS</span>
          <span className="text-[#536471] text-xs">240K Bumbles</span>
        </div>

        <div className="flex flex-col py-3 space-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-[#536471] text-[13px]">
              Trending In Australlia
            </span>
            <EllipsisHorizontalIcon className="w-[20px]" />
          </div>

          <span className="font-bold text-sm">#ReactJS</span>
          <span className="text-[#536471] text-xs">240K Bumbles</span>
        </div>

        <div className="flex flex-col py-3 space-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-[#536471] text-[13px]">
              Trending In Australlia
            </span>
            <EllipsisHorizontalIcon className="w-[20px]" />
          </div>

          <span className="font-bold text-sm">#ReactJS</span>
          <span className="text-[#536471] text-xs">240K Bumbles</span>
        </div>

        <div className="flex flex-col py-3 space-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-[#536471] text-[13px]">
              Trending In Australlia
            </span>
            <EllipsisHorizontalIcon className="w-[20px]" />
          </div>

          <span className="font-bold text-sm">#ReactJS</span>
          <span className="text-[#536471] text-xs">240K Bumbles</span>
        </div>
      </div>

      <div className=" bg-[#EFF3F4] rounded-xl p-3 ">
        <h1 className="text-xl font-bold mb-2">Who To Follow : </h1>
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-3">
            <Image
              src={"/profile.png"}
              width={44}
              height={44}
              alt="profile"
              className="w-11 h-11"
            />

            <div className="flex flex-col text-sm">
              <span className="font-bold">Elon Musk</span>
              <span>@elonkmusk</span>
            </div>
          </div>

          <button className="bg-[#0F1419]  text-white w-[72px] h-[40px] text-sm rounded-xl">
            Follow
          </button>
        </div>

        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-3">
            <Image
              src={"/profile.png"}
              width={44}
              height={44}
              alt="profile"
              className="w-11 h-11"
            />

            <div className="flex flex-col text-sm">
              <span className="font-bold">Mark Zuckerburg</span>
              <span>@meta</span>
            </div>
          </div>

          <button className="bg-[#0F1419]  text-white w-[72px] h-[40px] text-sm rounded-xl">
            Follow
          </button>
        </div>

        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-3">
            <Image
              src={"/profile.png"}
              width={44}
              height={44}
              alt="profile"
              className="w-11 h-11"
            />

            <div className="flex flex-col text-sm">
              <span className="font-bold">Ronaldo</span>
              <span>@cristiano</span>
            </div>
          </div>

          <button className="bg-[#0F1419]  text-white w-[72px] h-[40px] text-sm rounded-xl">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default Widgets;
