import { FC } from "react";
import userImage from "../../../../../assets/user.png";
import crownFirst from "../../../../../assets/crownFirst.png";
import crownSecond from "../../../../../assets/crownSecond.png";
import crownThird from "../../../../../assets/crownThird.png";
import { UserInfo } from "api/model";

interface PodiumProps {
  firstUser: UserInfo | null;
  secondUser: UserInfo | null;
  thirdUser: UserInfo | null;
  currentUser: UserInfo | null;
  currentUserRank: number | null;

  scrollToCurrentUser: () => void;
}

const Podium: FC<PodiumProps> = ({
  firstUser,
  secondUser,
  thirdUser,
  currentUser,
  currentUserRank,
  scrollToCurrentUser,
}) => {
  return (
    <div className="mb-4 mt-14  flex w-full items-end justify-center sm:mb-4 sm:mt-0">
    <div className="flex-basis-0 absolute -right-8 top-36 flex min-h-44 w-full max-w-44  flex-grow flex-col items-center justify-center gap-2 rounded-lg sm:top-36 md:-right-2 md:top-0 ">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="relative animate-jump-in rounded-full animate-delay-[0.7s] animate-duration-[0.7s]">
          <img
            src={
              currentUser?.profilePicture
                ? currentUser?.profilePicture
                : userImage
            }
            alt="Profile"
            className="animate size-16 animate-fade cursor-pointer rounded-full transition duration-200 hover:scale-110 border-2 border-indigo-100 bg-indigo-50 object-cover animate-delay-[0.7s]  sm:size-24 "
            onClick={scrollToCurrentUser}
          />
          <div className=" animate absolute -right-5 -top-5 animate-jump-in animate-delay-[1.5s]">
            <div className=" flex size-12 animate-wiggle-more  items-center  justify-center truncate rounded-full border-2 border-indigo-400 bg-indigo-50 py-1 text-center text-sm font-semibold text-indigo-600 animate-delay-[2.5s] sm:text-sm ">
              #{currentUserRank|| 0}
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full  flex-col items-center justify-center gap-1">
        <div className="mb-1 hidden w-full animate-fade truncate text-center text-xs text-gray-700 animate-delay-[0.9s] sm:text-base lg:inline-block">
          {currentUser?.username || "N/A"}
        </div>
        <div className="mb-3 hidden w-1/3 min-w-fit animate-jump-in truncate rounded-full border-4 border-indigo-200 bg-indigo-500 px-4 py-1 text-center  text-sm font-semibold text-indigo-50 animate-delay-[0.5s] sm:text-base xl:inline-block ">
          {currentUser?.totalCorrectAnswers || 0}
        </div>
      </div>
    </div>

    <div className="flex-basis-0 mb-3  flex  min-h-44 w-full max-w-44 flex-grow flex-col items-center justify-center gap-2 rounded-lg py-3 sm:mr-14 sm:gap-4">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className=" animate-fade animate-delay-[1.3s]">
          <img
            src={crownSecond}
            alt="Profile"
            className="-mb-5 size-14 object-cover sm:-mb-7 sm:size-24 "
          />
        </div>
        <div className="animate-rotate-y rounded-full animate-delay-[0.7s] animate-duration-[1.5s]">
          <img
            src={
              secondUser?.profilePicture
                ? secondUser?.profilePicture
                : userImage
            }
            alt="Profile"
            className="size-16  animate-fade rounded-full border-2  bg-indigo-50 object-cover animate-delay-[0.7s]  sm:size-36 "
          />
        </div>
      </div>
      <div className="flex w-full  flex-col items-center justify-center gap-2">
        <div className="mb-1 w-full animate-fade truncate text-center text-xs text-gray-700 animate-delay-[0.9s] sm:text-lg">
          {secondUser?.username || "N/A"}
        </div>
        <div className="mb-3 w-14 min-w-fit animate-jump-in truncate rounded-full border bg-gradient-to-r  from-gray-500 to-gray-400 px-3 py-1 text-center text-sm text-white animate-delay-[0.5s] sm:w-1/2 sm:text-xl">
          {secondUser?.totalCorrectAnswers || 0}
        </div>
      </div>
    </div>
    <div className="flex-basis-0 mb-8 flex min-h-44 w-full max-w-44 flex-grow flex-col items-center justify-center gap-3 rounded-lg py-3 sm:gap-5">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className=" animate-fade animate-delay-[1.0s]">
          <img
            src={crownFirst}
            alt="Profile"
            className="z-20 -mb-6 size-16 animate-bounce object-cover animate-delay-1000 animate-duration-[3.5s] animate-infinite sm:-mb-8 sm:size-28"
          />
        </div>
        <div className=" animate-fade-down animate-delay-[0.5s] ">
          <img
            src={
              firstUser?.profilePicture
                ? firstUser?.profilePicture
                : userImage
            }
            alt="Profile"
            className="size-20  animate-rotate-y rounded-full border-2  bg-indigo-50 object-cover animate-delay-[0.5s]  animate-duration-[2s] sm:size-44"
          />
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <div className="mb-2 w-full animate-fade truncate text-center text-xs text-gray-700 animate-delay-[1.3s] sm:text-lg">
          {firstUser?.username || "N/A"}
        </div>
        <div className=" mb-3 w-14 min-w-fit animate-jump-in truncate rounded-full border bg-gradient-to-r from-yellow-300 to-yellow-500 px-3 py-1 text-center text-base text-white animate-delay-[1.5s] sm:w-1/2 sm:text-2xl ">
          {firstUser?.totalCorrectAnswers || 0}
        </div>
      </div>
    </div>
    <div className="flex-basis-0 flex min-h-44 w-full max-w-44 flex-grow flex-col items-center justify-center gap-2 rounded-lg py-3 sm:ml-14 sm:gap-4">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className=" animate-fade animate-delay-[1.3s]">
          <img
            src={crownThird}
            alt="Profile"
            className="-mb-3 size-12 object-cover sm:-mb-6 sm:size-20 "
          />
        </div>
        <div className=" animate-fade animate-delay-[0.3s]">
          <img
            src={
              thirdUser?.profilePicture
                ? thirdUser?.profilePicture
                : userImage
            }
            alt="Profile"
            className=" size-14  animate-rotate-y rounded-full border-2  bg-indigo-50 object-cover animate-delay-[0.3s]  sm:size-32"
          />
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <div className="mb-1 w-full animate-fade truncate text-center text-xs text-gray-700 animate-delay-[0.5s] sm:text-lg">
          {thirdUser?.username || "N/A"}
        </div>
        <div className="mb-3 w-14 min-w-fit animate-jump-in truncate rounded-full border bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-800 px-3 py-1 text-center text-xs text-white  sm:text-lg md:w-1/2 ">
          {thirdUser?.totalCorrectAnswers || 0}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Podium;
