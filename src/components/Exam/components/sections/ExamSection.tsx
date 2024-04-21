import { FC, useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import {
  TrophyIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import { Exam } from "../../../../api/model";
import { useGetExams, useGetExamProfile } from "../../../../api/exams/exams";
import LoadingTable from "../../../_common/visuals/loading/LoadingTable";
import ProgressBar from "../../../_common/visuals/progress_bars/progress_bar";

interface ExamOption {
  exam: Exam;
}

const ExamOption: FC<ExamOption> = ({ exam }) => {
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
      key={exam.examId}
      value={exam}
      // Navigate to the exam menu and store the exam info in the session storage
      onClick={() => {
        navigateTo(`/examMode/exam/${exam.examId}/menu`),
          sessionStorage.setItem("examInfo", JSON.stringify(exam)),
          sessionStorage.setItem("examName", exam.examName);
      }}
      className="group table-row items-center  transition duration-300 ease-in-out odd:bg-indigo-200 odd:bg-opacity-20 hover:cursor-pointer hover:bg-indigo-200 hover:bg-opacity-20 dark:bg-gray-800 sm:odd:bg-transparent sm:hover:odd:bg-indigo-200 sm:hover:odd:bg-opacity-20"
      as="tr"
    >
      <th scope="row" className="px-4 py-3 sm:px-6">
        <div className="flex flex-col font-normal">
          <p className="whitespace-nowrap ">{exam.examName.slice(0, 12)}</p>
          <p className="whitespace-nowrap ">{exam.examName.slice(12)}</p>
        </div>
      </th>

      <td
        className={clsx(
          " px-4 py-3 font-medium sm:px-6",
          getGradeColor((exam.bestGrade / 100) * 20),
        )}
      >
        {exam.bestGrade !== null
          ? ((exam.bestGrade / 100) * 20).toFixed(1)
          : "-"}
      </td>
      <td className="hidden px-4 py-3 sm:table-cell sm:px-6">
        {exam.bestSubTopic !== null ? exam.bestSubTopic : "-"}
      </td>
      <td className="hidden px-4 py-3 sm:px-6 lg:table-cell">
        {exam.worstSubTopic !== null ? exam.worstSubTopic : "-"}
      </td>
    </RadioGroup.Option>
  );
};

const ExamRadioGroup: FC = ({}) => {
  // State to store the selected exam
  const [exams, setExams] = useState<Exam[]>([]);

  // Function to fetch the exams from the API
  const { refetch: getExams, isLoading } = useGetExams({
    query: {
      enabled: false,
      refetchOnWindowFocus: false,
      cacheTime: 1000, // 1 second
      staleTime: 1000, // 1 second

      onSuccess: (data) => {
        setExams(data.data!);
      },
    },
  });

  // Get the exams on mount
  useEffect(() => {
    getExams();
  }, []);

  // While loading, show the loading table
  if (isLoading || exams.length === 0) {
    return <LoadingTable />;
  }

  return (
    <RadioGroup className="duration-250 ease-in-out animate-in fade-in slide-in-from-left-10">
      <table className="w-full divide-y divide-gray-200 overflow-hidden rounded-lg text-left text-xs text-gray-500 lg:text-sm rtl:text-right">
        {/* Table Header */}
        <thead className="">
          <tr className="table-row items-center">
            <th scope="col" className="px-4 py-3 sm:px-6 "></th>
            <th scope="col" className="table-cell px-4 py-3 sm:px-6">
              <div className="flex flex-row items-center gap-x-1.5 font-medium text-gray-600">
                <TrophyIcon className="h-4 w-4 text-yellow-400 " />
                <p className="hidden md:block">Recorde</p>
              </div>
            </th>
            <th scope="col" className="hidden px-4 sm:table-cell sm:px-6">
              <div className="flex flex-row items-center gap-x-1.5 whitespace-nowrap font-medium text-gray-600">
                <HandThumbUpIcon className="h-4 w-4 text-green-400" />
                Melhor Tópico
              </div>
            </th>
            <th scope="col" className="hidden px-4 sm:px-6 lg:table-cell">
              <div className="flex flex-row items-center gap-x-1.5 whitespace-nowrap font-medium text-gray-600">
                <HandThumbDownIcon className="h-4 w-4 text-red-400" />
                Pior Tópico
              </div>
            </th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody className="divide-y divide-gray-200">
          {exams.map((exam) => (
            <ExamOption exam={exam} key={exam.examId} />
          ))}
        </tbody>
      </table>
    </RadioGroup>
  );
};

const ExamSection: FC = ({}) => {
  // State to store the percentage of exams submitted
  const [examsPercentage, setExamsPercentage] = useState<number>(0);

  // Function to fetch the exam profile
  const { refetch: getExamProfile, isLoading } = useGetExamProfile({
    query: {
      enabled: false,
      refetchOnWindowFocus: false,
      cacheTime: 1000, // 1 second
      staleTime: 1000, // 1 second

      onSuccess: (data) => {
        setExamsPercentage(data.data!.percentageExamsSubmited!);
      },
    },
  });

  // On load fetch the exam profile
  useEffect(() => {
    getExamProfile();
  }, []);

  return (
    <div className="m-auto flex min-h-full w-full flex-col gap-y-6">
      <div className="flex flex-row items-center justify-between xl:gap-x-48 gap-x-24">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-gray-800 whitespace-nowrap">
            Exames Nacionais
          </h1>
          <p className="text-md hidden whitespace-nowrap text-gray-500 md:block">
            Encontra o exame nacional que pretendes realizar
          </p>
        </div>
        {/* If fetching the exam profile show a loading animation */}
        <div className={clsx("bg-indigo-200 bg-opacity-20 rounded-lg sm:w-full w-fit h-full px-4 py-2 items-center justify-end sm:justify-center flex flex-row", isLoading && "animate-pulse duration-1000 ease-in-out transition-all")}>
          <ProgressBar percentage={examsPercentage} />
        </div>
      </div>
      <ExamRadioGroup />
    </div>
  );
};

export default ExamSection;
