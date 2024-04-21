import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RadioGroup } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/16/solid";

import { TestInfo } from "../../../../api/model";
import LoadingGridList from "../../../_common/visuals/loading/LoadingGridList";
import { useGetTestEvents } from "../../../../api/tests/tests";
import Badge from "../../../_common/visuals/badges/Badge";
import COLORS from "../../../_common/enums/colors";

interface PreviousSubmissionOptionProps {
  test: TestInfo;
}

const PreviousSubmissionOption: FC<PreviousSubmissionOptionProps> = ({
  test,
}) => {
  // Function to get the color of the grade badge
  const getGradeColor = (grade: number): COLORS => {
    if (grade < 9.5) {
      return COLORS.Red;
    }
    if (9.5 <= grade && grade < 15) {
      return COLORS.Yellow;
    }
    if (15 <= grade && grade <= 20) {
      return COLORS.Green;
    }
    return COLORS.Gray;
  };

  // Functio  to format the time to HH:MM
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  };

  // Function to build the link based on wether the test has been done before or not
  const buildLink = (test: TestInfo) => {
    if (test.testResult === null) {
      return `/test-mode/${test.testEventId}/session`;
    } else {
      return `/test-mode/${test.testEventId}/review`;
    }
  };

  return (
    <Link
      to={buildLink(test)}
      // Save the test results and teste info in the session storage
      onClick={() => {
        sessionStorage.setItem("testFeedback", JSON.stringify(test.testResult)),
          sessionStorage.setItem("testInfo", JSON.stringify(test));
      }}
    >
      <RadioGroup.Option
        value={test}
        className="flex flex-row items-center justify-between divide-x divide-gray-200 overflow-hidden rounded-lg bg-gray-100 shadow-md ring-1 ring-gray-200  hover:cursor-pointer hover:ring-2 hover:ring-indigo-400 focus:outline-none"
      >
        <div className="flex flex-grow flex-row-reverse justify-between gap-y-2 bg-white px-5 py-3 sm:flex-col sm:justify-normal">
          <div className="flex flex-row items-center justify-between gap-x-3 text-gray-600">
            <div className="text-md flex flex-row items-center gap-x-1">
              <CalendarDaysIcon className="h-4 w-4" />
              {new Date(test.createdAt!).toLocaleDateString()}
            </div>
            <div className=" text-md hidden flex-row items-center gap-x-1 sm:flex">
              <ClockIcon className="h-4 w-4" />
              {test.testResult === null ? "--:--" : formatTime(test.testResult!.timeElapsed!)}
            </div>
          </div>
          <Badge
            big={true}
            color={test.testResult === null ? COLORS.Purple : getGradeColor((test.testResult!.grade! / 100) * 20)}
            text={ test.testResult === null ? "Sem Nota" : `Nota: ${((test.testResult!.grade! / 100) * 20).toFixed(1)}`}
          />
        </div>
      </RadioGroup.Option>
    </Link>
  );
};

const PreviousSubmissionsRadioGroup: FC = () => {
  // Fetch the testId from the URL
  const { testId } = useParams();

  // State to store the tests
  const [tests, setTests] = useState<TestInfo[]>([]);

  // Get the tests from the API
  const { refetch: getTests, isLoading } = useGetTestEvents(
    {
      testEventId: Number(testId),
    },
    {
      query: {
        enabled: false,
        refetchOnWindowFocus: false,
        cacheTime: 1000, // 1 second
        staleTime: 1000, // 1 second

        onSuccess: (data) => {
          setTests(data.data!);
        },
      },
    },
  );

  // Get the tests on mount
  useEffect(() => {
    getTests();
  }, []);

  // While loading, show the loading grid list
  if (isLoading) {
    return <LoadingGridList />;
  }

  return (
    <RadioGroup className="delay-15 transition duration-300 animate-in fade-in slide-in-from-left-6">
      <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {/**Button to start a new test session*/}
        <Link
          to={`/test-mode/${testId}/create-test`}
          className="group z-10 flex h-full w-full items-center justify-center gap-x-1.5 rounded-lg border-2 border-dashed border-gray-200 px-5 py-3 font-semibold transition hover:cursor-pointer focus:z-10 sm:py-7"
        >
          <div className="w-0" />
          <PlusCircleIcon className="z-10 h-6 w-6 rounded-full text-indigo-600 sm:h-10 sm:w-10 sm:group-hover:animate-in sm:group-hover:slide-in-from-right-10" />
          <div className="w-fit justify-start text-sm text-indigo-600 transition-all  duration-300 ease-in-out sm:max-w-0 sm:truncate sm:text-lg sm:opacity-0 sm:group-hover:w-fit sm:group-hover:max-w-[7rem] sm:group-hover:opacity-100">
            Novo Teste
          </div>
        </Link>

        {/*Shows all previous submissions and their basic info*/}
        {tests
          .filter((test) => test.testResult === null && test.exercises!.length > 0)
          .map((test, index) => (
            <PreviousSubmissionOption key={index} test={test} />
          ))}
        {tests
          .filter((test) => test.testResult !== null && test.exercises!.length > 0)
          .map((test, index) => (
            <PreviousSubmissionOption key={index} test={test} />
          ))}
      </div>
    </RadioGroup>
  );
};

const TestMenu: FC = ({}) => {
  return (
    <div className="duration-250 m-auto flex min-h-full w-full flex-col gap-y-6 ease-in-out animate-in fade-in slide-in-from-left-10">
      <div className="flex flex-row items-end justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-gray-800 ">
            Histórico
          </h1>
          <p className="text-md hidden text-gray-500 sm:block">
            Consulta as tuas submissões anteriores
          </p>
        </div>
      </div>
      <PreviousSubmissionsRadioGroup />
    </div>
  );
};

export default TestMenu;
