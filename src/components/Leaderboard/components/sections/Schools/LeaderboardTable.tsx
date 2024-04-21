import  { FC } from "react";
import { RadioGroup } from "@headlessui/react";
import LoadingLeaderboard from "../../../../_common/visuals/loading/LoadingLeaderboard";
import SectionTransition from "../../../../_common/transitions/Transition";
import { School } from "../../../../../api/model";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";



interface SchoolOption {
  bestSchool: School;
}

const SchoolOption: FC<SchoolOption> = ({ bestSchool }) => {
  return (
    <RadioGroup.Option
      key={bestSchool?.schoolId}
      value={bestSchool}
      className="group flex w-full flex-row items-center justify-around transition duration-300 ease-in-out hover:bg-indigo-200 hover:bg-opacity-20 dark:bg-gray-800 sm:table-row"
      as="tr"
    >
      <td scope="row" className="w-16 whitespace-nowrap sm:pl-1 sm:pr-4">
        <div className="flex justify-center font-normal md:pl-4">
          <div
            className={`flex size-8 items-center justify-center rounded-full text-base ${bestSchool?.rank === 1 ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white" : bestSchool?.rank === 2 ? "bg-gradient-to-r from-gray-500 to-gray-400 text-white" : bestSchool?.rank === 3 ? "bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-800  text-white	" : ""}`}
          >
            <p>{bestSchool?.rank}</p>
          </div>
        </div>
      </td>
      <td scope="row" className="w-full max-w-48 py-10">
        <div className="flex flex-col justify-start text-xs font-normal sm:text-base">
          <p className="truncate">{bestSchool?.schoolName}</p>
        </div>
      </td>
      <td className="hidden px-4 py-3 text-lg font-medium sm:px-9 lg:table-cell">
        <div className="flex items-center justify-center">
          {bestSchool?.totalUsers}
        </div>
      </td>
      <td className="hidden px-4 py-3 text-lg md:table-cell md:px-12">
        <div className="flex items-center justify-center">
          {bestSchool?.totalQuestionsAnswered}
        </div>
      </td>
      <td>
        <div className="flex items-center justify-center">
          <div
            className={`flex min-w-14 items-center justify-center rounded-xl border-2 border-gray-200 px-3 py-1 text-sm  font-normal text-gray-500 sm:text-lg`}
          >
            {bestSchool?.totalCorrectAnswers}
          </div>
        </div>
      </td>
    </RadioGroup.Option>
  );
};

interface LeaderboardTableProps {
  bestSchools: { [key: number]: School[] };
  onDisplaySchools: School[];
  currentPage: number;
  totalPages: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}

const LeaderboardTable: FC<LeaderboardTableProps> = ({
  bestSchools,
  onDisplaySchools,
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
}) => {

  if (!bestSchools[currentPage] || bestSchools[currentPage].length === 0) {
    return <LoadingLeaderboard />;
  }
  return (
    <SectionTransition show={true}>
      <RadioGroup className="duration-250 flex w-full flex-col items-center justify-center ease-in-out animate-in fade-in slide-in-from-left-10">
      <table className="w-full divide-gray-200 text-left text-xs text-gray-500 sm:mt-14 sm:w-full sm:divide-y lg:text-sm rtl:text-right">
          <thead className="">
            <tr className="table-row flex-row items-center justify-between">
              <th
                scope="col"
                className="hidden px-4 py-1 sm:table-cell sm:px-6"
              >
                <div className="flex flex-row items-center gap-x-1.5 font-medium text-gray-600">
                  <p className="hidden sm:block">Ranking </p>
                </div>
              </th>
              <th scope="col" className="hidden py-1 sm:table-cell">
                <div className="flex flex-row items-center gap-x-1.5 font-medium text-gray-600">
                  <p className="hidden sm:block">Escola</p>
                </div>
              </th>
              <th
                scope="col"
                className="hidden px-4 py-1 sm:px-6 lg:table-cell"
              >
                <div className="flex flex-row items-center justify-center gap-x-1.5 font-medium text-gray-600">
                  <p className="hidden lg:block">Estudantes</p>
                </div>
              </th>
              <th
                scope="col"
                className="hidden px-4 py-1 sm:px-6 md:table-cell"
              >
                <div className="flex flex-row items-center justify-center gap-x-1.5 text-center font-medium text-gray-600">
                  Questões Respondidas
                </div>
              </th>
              <th
                scope="col"
                className="hidden px-4 py-1 sm:table-cell sm:px-6"
              >
                <div className="flex flex-row items-center justify-center  gap-x-1.5 text-center font-medium text-gray-600">
                  Respostas Corretas
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {onDisplaySchools.map((school) => (
              <SchoolOption bestSchool={school} key={school?.schoolName} />
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
        </div>{" "}
      </RadioGroup>
    </SectionTransition>
  );
};

export default LeaderboardTable;