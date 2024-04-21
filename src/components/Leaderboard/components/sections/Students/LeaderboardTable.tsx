import  { FC, RefObject } from "react";
import { RadioGroup } from "@headlessui/react";
import LoadingLeaderboard from "../../../../_common/visuals/loading/LoadingLeaderboard";
import SectionTransition from "../../../../_common/transitions/Transition";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";
import { UserInfo } from "../../../../../api/model";
import userImage from "../../../../../assets/user.png";
import clsx from "clsx";

interface UserOptionProps {
  bestUser: UserInfo;
  userId: number; // Assuming userId is passed as a prop
}

const UserOption: FC<UserOptionProps> = ({ bestUser, userId }) => {
  const isSelectedUser = bestUser.userId === userId;

  return (
    <RadioGroup.Option
      key={bestUser?.username}
      value={bestUser}
      data-userId={bestUser?.userId}
      className={`group flex w-full flex-row items-center justify-around transition duration-300 ease-in-out dark:bg-gray-800 sm:table-row ${isSelectedUser ? " bg-indigo-100 " : "hover:bg-indigo-200 hover:bg-opacity-20 "}`}
      as="tr"
    >
      <td scope="row" className="w-16 whitespace-nowrap pr-4 sm:pl-1">
        <div className="flex font-normal md:pl-5">
          <div
            className={`flex size-8 items-center justify-center rounded-full text-base ${bestUser?.rank === 1 ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white" : bestUser?.rank === 2 ? "bg-gradient-to-r from-gray-500 to-gray-400 text-white" : bestUser?.rank === 3 ? "bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-800  text-white	" : ""}`}
          >
            <p
              className={`${isSelectedUser ? " font-semibold text-indigo-500" : ""}`}
            >
              {" "}
              {bestUser?.rank}
            </p>
          </div>
        </div>
      </td>
      <td className="w-full py-5 pl-3">
        <div className="flex items-center justify-start gap-4">
          <div className="flex flex-row items-start justify-start">
            <img
              src={
                bestUser?.profilePicture ? bestUser.profilePicture : userImage
              }
              alt="Profile"
              className={`size-16  rounded-full border-2  bg-indigo-50 ${isSelectedUser ? " border-indigo-400" : ""}  object-cover`}
            />
          </div>

          <div
            className={`flex justify-start text-xs sm:text-base ${isSelectedUser ? " text-indigo-500 " : ""}`}
          >
            <p>{bestUser?.username}</p>
          </div>
        </div>
      </td>
      <td>
        <div className="flex items-center justify-center">
          <div
            className={`flex   min-w-14 items-center justify-center rounded-full border-2 border-gray-200 px-3 py-2 text-sm font-semibold   text-gray-500 sm:text-base ${isSelectedUser ? " border-indigo-400 text-indigo-500" : ""} `}
          >
            {bestUser?.totalCorrectAnswers}
          </div>
        </div>
      </td>
    </RadioGroup.Option>
  );
};

interface LeaderboardTableProps {
  userId: number;
  bestUsers: { [key: number]: UserInfo[] };
  onDisplayUsers: UserInfo[];
  currentPage: number;
  totalPages: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  tableRef: RefObject<HTMLTableElement>;
}

const LeaderboardTable: FC<LeaderboardTableProps> = ({
  userId,
  bestUsers,
  onDisplayUsers,
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
  tableRef,
}) => {
  if (!bestUsers[currentPage] || bestUsers[currentPage].length === 0) {
    return <LoadingLeaderboard />;
  }
  return (
    <SectionTransition show={true}>
      <RadioGroup className="duration-250 flex w-full flex-col items-center justify-center ease-in-out animate-in fade-in slide-in-from-left-10">
        <table
          ref={tableRef}
          className="w-full divide-gray-200 text-left text-xs text-gray-500 sm:mt-6 sm:divide-y md:w-full lg:text-sm rtl:text-right"
        >
          <thead className="">
            <tr className="flex flex-row items-center justify-between sm:table-row">
              <th scope="col" className="hidden px-4 py-1 sm:table-cell">
                <div className="flex flex-row items-center gap-x-1.5 font-medium text-gray-600">
                  <p className="hidden md:block">Ranking</p>
                </div>
              </th>
              <th scope="col" className="hidden px-4 py-1 pl-6 sm:table-cell">
                <div className="flex flex-row items-center gap-x-1.5 font-medium text-gray-600">
                  <p className="hidden md:block">Aluno</p>
                </div>
              </th>
              <th scope="col" className="hidden px-4 sm:px-6 md:table-cell">
                <div className="flex flex-row items-center gap-x-1.5 truncate font-medium text-gray-600">
                  Respostas Corretas
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {onDisplayUsers.map((bestUser) => (
              <UserOption
                bestUser={bestUser}
                key={bestUser?.userId}
                userId={userId}
              />
            ))}
          </tbody>
        </table>
        <div className="my-4 flex w-full items-center justify-center">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
          <ArrowLongLeftIcon className={clsx("font-small duration:100 h-5 w-5 sm:h-7 sm:w-7 cursor-default text-gray-400 transition-all", currentPage > 1 && "hover:text-gray-600 cursor-pointer")}/>
          </button>
          <p className="mx-4 text-gray-500 font-semibold">
            {currentPage}/{totalPages}
          </p>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
          <ArrowLongRightIcon className={clsx("font-small duration:100 h-5 w-5 sm:h-7 sm:w-7 cursor-default text-gray-400 transition-all", currentPage < totalPages && "hover:text-gray-600 cursor-pointer")}/>
          </button>
        </div>
      </RadioGroup>
    </SectionTransition>
  );
};

export default LeaderboardTable;
