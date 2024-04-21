import { FC } from "react";
import crownFirst from "../../../../../assets/crownFirst.png";
import crownSecond from "../../../../../assets/crownSecond.png";
import crownThird from "../../../../../assets/crownThird.png";
import { School } from "api/model";
import firstSchoolImage from "../../../../../assets/schoolFirst.png";
import secondSchoolImage from "../../../../../assets/schoolSecond.png";
import thirdSchoolImage from "../../../../../assets/schoolThird.png";

interface PodiumProps {
  firstSchool: School | null;
  secondSchool: School | null;
  thirdSchool: School | null;
}

const Podium: FC<PodiumProps> = ({
  firstSchool,
  secondSchool,
  thirdSchool,
}) => {
  return (
    <div className="mt-1 flex w-full items-end justify-center sm:mb-4 ease-in-out animate-in fade-in slide-in-from-left-10 duration-250">
    <div className="flex-basis-0 mb-3 flex min-h-44 w-full max-w-44 flex-grow flex-col items-center justify-center gap-2 rounded-lg py-3 sm:mr-14 sm:gap-4">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className=" animate-fade animate-delay-[1.3s]">
          <img
            src={crownSecond}
            alt="Profile"
            className="-mb-5 size-14 object-cover sm:-mb-7 sm:size-24 "
          />
        </div>
        <div className="animate-rotate-y animate-delay-[0.7s] animate-duration-[1.5s]">
          <img
            src={secondSchoolImage}
            alt="Profile"
            className="size-16 animate-fade rounded-full border-2 bg-indigo-50 object-cover animate-delay-[0.7s]  sm:size-36"
          />
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <div className="mb-1 line-clamp-3 w-full animate-fade text-center text-xs text-gray-700 animate-delay-[0.9s] sm:text-base">
          {secondSchool?.schoolName || "N/A"}
        </div>
        <div className="mb-3 min-w-fit w-14 sm:w-1/2 animate-jump-in truncate rounded-full border  bg-gradient-to-r from-gray-500 to-gray-400 px-3 py-1 text-center text-sm text-white animate-delay-[0.5s] sm:text-xl">
            {secondSchool?.totalCorrectAnswers || 0}
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
        <div className=" animate-fade-down animate-delay-[0.5s]">
          <img
            src={firstSchoolImage}
            alt="Profile"
            className="size-20 animate-rotate-y rounded-full border-2 bg-indigo-50 object-cover animate-delay-[0.5s] animate-duration-[2s]  sm:size-44"
          />
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <div className="mb-2 line-clamp-3 w-full animate-fade text-center text-xs text-gray-700 animate-delay-[1.3s]  sm:text-base">
          {firstSchool?.schoolName || "N/A"}
        </div>
        <div className=" mb-3 min-w-fit w-14 sm:w-1/2 animate-jump-in truncate rounded-full border bg-gradient-to-r from-yellow-300 to-yellow-500 px-3 py-1 text-center text-base text-white animate-delay-[1.5s] sm:text-2xl ">
          {firstSchool?.totalCorrectAnswers || 0}
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
            src={thirdSchoolImage}
            alt="Profile"
            className=" size-14 animate-rotate-y rounded-full border-2 bg-indigo-50 object-cover animate-delay-[0.3s]  sm:size-32"
          />
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <div className="mb-1 line-clamp-3 w-full animate-fade text-center text-xs text-gray-700 animate-delay-[0.5s]  sm:text-base">
          {thirdSchool?.schoolName || "N/A"}
        </div>
        <div className="mb-3 min-w-fit w-14 md:w-1/2 animate-jump-in truncate rounded-full border bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-800 px-3 py-1 text-center text-xs  text-white sm:text-lg ">
          {thirdSchool?.totalCorrectAnswers || 0}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Podium;
