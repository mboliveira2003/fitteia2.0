import { FC, useEffect, useRef, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import {
  getUserRank,
  useGetUsersLeaderboardCorrect,
} from "../../../../../api/leaderboard/leaderboard";
import { UserInfo } from "../../../../../api/model";
import LoadingLeaderboard from "../../../../_common/visuals/loading/LoadingLeaderboard";
import SectionTransition from "../../../../_common/transitions/Transition";
import { getUserProfile } from "api/settings/settings";
import Podium from "./Podium";
import LeaderboardTable from "./LeaderboardTable";
import LoadingPodium from "components/_common/visuals/loading/LoadingPodium";

const UserRadioGroup: FC = () => {
  const [bestUsers, setBestUsers] = useState<{ [key: number]: UserInfo[] }>({});
  const [firstUser, setFirstUser] = useState<UserInfo | null>(null);
  const [secondUser, setSecondUser] = useState<UserInfo | null>(null);
  const [thirdUser, setThirdUser] = useState<UserInfo | null>(null);

  const [onDisplayUsers, setonDisplayUsers] = useState<UserInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(50); // Assuming a default page size of 50
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  const [currentUserRank, setCurrentUserRank] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const tableRef = useRef<HTMLTableElement>(null);

  const scrollToCurrentUser = () => {
    const pageNumber = Math.ceil(currentUserRank / pageSize);
    setCurrentPage(pageNumber);

    setTimeout(() => {
      const row = tableRef.current!.querySelector(
        `[data-userid="${currentUser?.userId}"]`,
      ) as HTMLElement;
      if (row) {
        row.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 200); // Adjust the delay as needed
  };

  // On component load, fetch the leaderboard data
  const { refetch: getBestUsers, isLoading } = useGetUsersLeaderboardCorrect(
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
          setBestUsers((prevBestUsers) => ({
            ...prevBestUsers,
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
    getBestUsers();
  }, []);

  useEffect(() => {
    if (
      bestUsers[1] &&
      firstUser == null &&
      secondUser == null &&
      thirdUser == null
    ) {
      const [first, second, third] = bestUsers[1]?.slice(0, 3);
      setFirstUser(first);
      setSecondUser(second);
      setThirdUser(third);
    }
  }, [bestUsers]);

  const getUser = async () => {
    setCurrentUser((await getUserProfile()).data);
    setCurrentUserRank(await getUserRank());
  };

  useEffect(() => {
    if (!currentUser) {
      getUser();
    }
  }, []);

  useEffect(() => {
    if (bestUsers[currentPage]) {
      setonDisplayUsers(bestUsers[currentPage]);
    }
  }, [currentPage, bestUsers]);

  useEffect(() => {
    if (!bestUsers[currentPage]) {
      getBestUsers();
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
      <RadioGroup className="duration-250 flex w-full flex-col items-center justify-center ease-in-out animate-in fade-in slide-in-from-left-10">
        {!firstUser && !secondUser && !thirdUser && !currentUser ? (
          <LoadingPodium />
        ) : (
          <Podium
            firstUser={firstUser}
            secondUser={secondUser}
            thirdUser={thirdUser}
            currentUser={currentUser}
            currentUserRank={currentUserRank}
            scrollToCurrentUser={scrollToCurrentUser}
          />
        )}

        {isLoading ||
        !bestUsers[currentPage] ||
        bestUsers[currentPage].length === 0 ? (
          <LoadingLeaderboard />
        ) : (
          <LeaderboardTable
            userId={currentUser?.userId ?? 0}
            bestUsers={bestUsers}
            onDisplayUsers={onDisplayUsers}
            currentPage={currentPage}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
            totalPages={totalPages}
            tableRef={tableRef}
          />
        )}
      </RadioGroup>
    </SectionTransition>
  );
};

const UserSection: FC = () => {
  return (
    <div className="m-auto flex min-h-full w-full flex-col sm:gap-y-6">
      <UserRadioGroup />
    </div>
  );
};

export default UserSection;
