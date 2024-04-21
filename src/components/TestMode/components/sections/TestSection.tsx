import { FC, useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ScaleIcon,
  CalendarDaysIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate, Link } from "react-router-dom";

import { DeleteTestParams, Test } from "../../../../api/model";
import { deleteTest, useGetTests } from "../../../../api/tests/tests";
import LoadingTable from "../../../_common/visuals/loading/LoadingTable";

interface TestOptionProps {
  test: Test;
  index: number;
  deleteTestEvent: (testEventId: number) => void;
}

const TestOption: FC<TestOptionProps> = ({ test, deleteTestEvent }) => {
  // Function to navigate to a new page
  const navigateTo = useNavigate();
  // Function to get the color of the grade
  const getGradeColor = (grade: number | null) => {
    if (grade === null) {
      return "text-gray-500";
    }
    if (grade < 9.5) {
      return "text-red-400";
    }
    if (9.5 <= grade && grade < 15) {
      return "text-yellow-400";
    }
    if (15 <= grade && grade <= 20) {
      return "text-green-400";
    }
  };

  return (
    <RadioGroup.Option
      key={test.testEventId!}
      value={test}
      // Navigate to the test menu and store the test info in the session storage
      onClick={() => {
        navigateTo(`/test-mode/${test.testEventId!}`);
      }}
      className="table-row items-center  transition duration-300 ease-in-out even:bg-indigo-200 even:bg-opacity-20 hover:cursor-pointer hover:bg-indigo-200 hover:bg-opacity-20 dark:bg-gray-800 sm:even:bg-transparent sm:hover:even:bg-indigo-200 sm:hover:even:bg-opacity-20"
      as="tr"
    >
      <th
        scope="row"
        className="px-4 py-3 sm:px-6"
      >
        <div className="flex flex-row w-fit items-center relative group font-normal">
          {" "}
          {test.title!.length > 10
            ? `${test.title!.substring(0, 10)}...`
            : test.title}
          <p className="animate-in absolute ml-2 left-full hidden whitespace-nowrap rounded bg-indigo-300 bg-opacity-100 backdrop:blur-3xl px-1.5 py-0.5 text-xs font-normal text-white fade-in zoom-in-75 group-hover:block">
            {test.title!}
          </p>
        </div>
      </th>

      <td
        className={clsx(
          " px-4 py-3 font-medium sm:px-6",
          getGradeColor((test.bestGrade! / 100) * 20),
        )}
      >
        {test.bestSubTopic !== "Sem informação"
          ? ((test.bestGrade! / 100) * 20).toFixed(1)
          : "-"}
      </td>
      <td className="hidden px-4 py-3 sm:table-cell sm:px-6">
        {test.bestSubTopic !== null ? test.bestSubTopic : "-"}
      </td>
      <td className="hidden px-4 py-3 sm:px-6 xl:table-cell">
        {test.worstSubTopic !== null ? test.worstSubTopic : "-"}
      </td>
      <td className=" table-cell px-4 py-3 sm:px-6">
        {test.date !== null
          ? new Date(test.date!).toLocaleDateString("en-GB")
          : "-"}
      </td>
      <td className=" table-cell px-4 py-3 sm:px-6">
        <XCircleIcon
          onClick={(event) => {
            deleteTestEvent(test.testEventId!), navigateTo("/test-mode");
            event?.stopPropagation();
          }}
          className="h-4 w-4 text-gray-400 hover:text-gray-600 sm:h-5 sm:w-5"
        />
      </td>
    </RadioGroup.Option>
  );
};

const TestRadioGroup: FC = ({}) => {
  // State to store the selected test
  const [tests, setTests] = useState<Test[]>([]);

  // Function to fetch the tests from the API
  const { refetch: getTests, isLoading } = useGetTests({
    query: {
      enabled: false,
      refetchOnWindowFocus: false,
      cacheTime: 1000, // 1 second
      staleTime: 1000, // 1 second

      onSuccess: (data) => {
        setTests(data.data!);
      },
    },
  });

  // Function to delete a test
  const deleteTestEvent = async (testEventId: number) => {
    const deleteTestParams: DeleteTestParams = {
      testEventId: testEventId,
    };

    try {
      const response = await deleteTest(deleteTestParams);
      console.log(response);
      getTests();
    } catch (error) {
      console.log(error);
    }
  };

  // Get the tests on mount
  useEffect(() => {
    getTests();
  }, []);

  // While loading, show the loading table
  if (isLoading) {
    return <LoadingTable />;
  }

  return (
    <RadioGroup className="duration-250 ease-in-out animate-in fade-in slide-in-from-left-10">
      <table className="w-full divide-y divide-gray-200 overflow-hidden rounded-lg text-left text-xs text-gray-500 lg:text-sm rtl:text-right">
        {/* Table Header */}
        <thead className="">
          <tr className="table-row items-center bg-indigo-200 bg-opacity-20 sm:bg-transparent">
            <th scope="col" className="px-4 py-3 sm:px-6 "></th>
            <th scope="col" className="table-cell px-4 py-3 sm:px-6">
              <div className="flex flex-row items-center gap-x-1.5 font-medium text-gray-600">
                <ScaleIcon className="h-4 w-4 text-gray-600" />
                <p className="block">Média</p>
              </div>
            </th>
            <th scope="col" className="hidden px-4 sm:table-cell sm:px-6">
              <div className="flex flex-row items-center gap-x-1.5 whitespace-nowrap font-medium text-gray-600">
                <HandThumbUpIcon className="h-4 w-4 text-green-400" />
                Melhor Tópico
              </div>
            </th>
            <th scope="col" className="hidden px-4 sm:px-6 xl:table-cell">
              <div className="flex flex-row items-center gap-x-1.5 whitespace-nowrap font-medium text-gray-600">
                <HandThumbDownIcon className="h-4 w-4 text-red-400" />
                Pior Tópico
              </div>
            </th>
            <th scope="col" className="table-cell px-4 sm:px-6">
              <div className="flex flex-row items-center gap-x-1.5 whitespace-nowrap font-medium text-gray-600">
                <CalendarDaysIcon className="h-4 w-4 text-gray-600" />
                <p className="block">Data</p>
              </div>
            </th>
            <th scope="col" className="table-cell px-4 sm:px-6">
              <div className="flex flex-row items-center gap-x-1.5 whitespace-nowrap font-medium text-gray-600"></div>
            </th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody className="divide-y divide-gray-200">
          {/* If there are no tests, show a message */}
          {tests.length === 0 && (
            <tr className="table-row items-center">
              <td className="px-4 py-3 sm:px-6" colSpan={5}>
                <p className="text-center text-gray-500">
                  Ainda não criaste nenhum teste
                </p>
              </td>
            </tr>
          )}
          {/* If there are tests, show them */}
          {tests.length !== 0 &&
            tests.map((test, index) => (
              <TestOption
                deleteTestEvent={deleteTestEvent}
                test={test}
                index={index}
                key={test.testEventId}
              />
            ))}
        </tbody>
      </table>
    </RadioGroup>
  );
};

const TestSection: FC = ({}) => {
  return (
    <div className="m-auto flex min-h-full w-full flex-col gap-y-6 ">
      <div className="flex flex-row items-center justify-between gap-x-24 gap-y-6 xl:gap-x-48">
        <div>
          <h1 className="whitespace-nowrap text-xl font-semibold tracking-tight text-gray-800">
            Testes
          </h1>
          <p className="text-md hidden whitespace-nowrap text-gray-500 md:block">
            Prepara-te para avaliações e testa o teu conhecimento
          </p>
        </div>
        {/* Button to create a new test. When clicked displays new test form*/}
        <Link
          to={`/test-mode/new-test`}
          className="group z-10 flex items-center justify-center gap-x-1.5 rounded-lg bg-indigo-50 px-4 py-2 font-semibold shadow-sm ring-1  ring-indigo-400/10 transition hover:cursor-pointer hover:bg-indigo-100 hover:ring-indigo-400/20 focus:z-10"
        >
          <PlusCircleIcon className="z-10 h-5 w-5 rounded-full text-indigo-600 group-hover:animate-jump" />
          <div className="sm:text-md justify-center whitespace-nowrap text-sm text-indigo-600 duration-300 ease-in-out">
            Novo Teste
          </div>
        </Link>
      </div>
      <TestRadioGroup />
    </div>
  );
};

export default TestSection;
