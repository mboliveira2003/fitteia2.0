import { FC, useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { School } from "../../../../../api/model"; // Assuming you have a BestSchool model
import { useGetSchoolsLeaderboardCorrect } from "../../../../../api/leaderboard/leaderboard";
import LoadingLeaderboard from "../../../../_common/visuals/loading/LoadingLeaderboard";
import SectionTransition from "../../../../_common/transitions/Transition";
import LoadingPodium from "components/_common/visuals/loading/LoadingPodium";
import Podium from "./Podium";
import LeaderboardTable from "./LeaderboardTable";

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

const SchoolRadioGroup: FC = () => {
  const [bestSchools, setBestSchools] = useState<{ [key: number]: School[] }>({});
  const [onDisplaySchools, setOnDisplaySchools] = useState<School[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [firstSchool, setFirstSchool] = useState<School | null>(null);
  const [secondSchool, setSecondSchool] = useState<School | null>(null);
  const [thirdSchool, setThirdSchool] = useState<School | null>(null);

  const pageSize = 50;


  // On component load, fetch the leaderboard data
  const { refetch: getBestSchools, isLoading } = useGetSchoolsLeaderboardCorrect(
    {
      page: currentPage - 1, // Adjusted page value
      size: pageSize,
      sort: "",
    },
    {
      query: {
        enabled: false,
        refetchOnWindowFocus: false,
        cacheTime: 1000, // 1 second
        staleTime: 1000, // 1 second
        onSuccess: (data) => {
          setBestSchools((prevBestSchools) => ({
            ...prevBestSchools,
            [currentPage]: data.content || [],
          }));

          if (totalPages == 0) {
            setTotalPages(data.totalPages ?? 0);
          }
        },
      },
    },
  );

   // On page load, fetch the school years
   useEffect(() => {
    getBestSchools();
  }, []);

  useEffect(() => {
    if (
      bestSchools[1] &&
      firstSchool == null &&
      secondSchool == null &&
      thirdSchool == null
    ) {
      const [first, second, third] = bestSchools[1]?.slice(0, 3);
      setFirstSchool(first);
      setSecondSchool(second);
      setThirdSchool(third);
    }
  }, [bestSchools]);


  useEffect(() => {
    if (bestSchools[currentPage]) {
      setOnDisplaySchools(bestSchools[currentPage]);
    }
  }, [currentPage, bestSchools]);

  useEffect(() => {
    if (!bestSchools[currentPage]) {
      getBestSchools();
    }
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };


  return (
    <SectionTransition show={true}>
      <RadioGroup className=" w-full">
        {!firstSchool && !secondSchool && !thirdSchool ? (
          <LoadingPodium />
        ) : (
          <Podium
            firstSchool={firstSchool}
            secondSchool={secondSchool}
            thirdSchool={thirdSchool}
          />
        )}
        {isLoading ||
        !bestSchools[currentPage] ||
        bestSchools[currentPage].length === 0 ? (
          <LoadingLeaderboard />
        ) : (
          <LeaderboardTable
            bestSchools={bestSchools}
            onDisplaySchools={onDisplaySchools}
            currentPage={currentPage}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
            totalPages={totalPages}
          />
        )}
      </RadioGroup>
    </SectionTransition>
  );
};

const SchoolSection: FC = ({}) => {
  return (
    <div className="m-auto flex min-h-full w-full flex-col sm:gap-y-6">
      <SchoolRadioGroup />
    </div>
  );
};

export default SchoolSection;
