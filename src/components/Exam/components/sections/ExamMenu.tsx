import { FC, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { RadioGroup } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/16/solid";

import { ExamSubmission } from "../../../../api/model";
import LoadingGridList from "../../../_common/visuals/loading/LoadingGridList";
import { useGetExamHistory } from "../../../../api/exams/exams";
import Badge from "../../../_common/visuals/badges/Badge";
import COLORS from "../../../_common/enums/colors";
import ExamFileMenu from "./ExamFileMenu";

interface PreviousSubmissionOptionProps {
  submission: ExamSubmission;
}

const PreviousSubmissionOption: FC<PreviousSubmissionOptionProps> = ({
  submission,
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

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

  return (
    <Link
      // Link to the review session
      to={`/examMode/exam/${submission.examId}/review`}
      // Store the answers and grade in the session storage
      onClick={() => {
        sessionStorage.setItem(
          "answers",
          JSON.stringify(submission.userAnswers),
        ),
          sessionStorage.setItem("grade", JSON.stringify(submission.grade)),
          sessionStorage.setItem(
            "gradeDistribution",
            JSON.stringify(submission.gradeDistribution),
          );
      }}
    >
      <RadioGroup.Option
        value={submission}
        className="flex flex-row items-center justify-between divide-x divide-gray-200 overflow-hidden rounded-lg bg-gray-100 shadow-md ring-1 ring-gray-200  hover:cursor-pointer hover:ring-2 hover:ring-indigo-400 focus:outline-none"
      >
        <div className="flex flex-grow flex-row-reverse justify-between gap-y-2 bg-white px-5 py-3 sm:flex-col sm:justify-normal">
          <div className="flex flex-row items-center justify-between gap-x-3 text-gray-600">
            <div className="text-md flex flex-row items-center gap-x-1">
              <CalendarDaysIcon className="h-4 w-4" />
              {new Date(submission.createdAt!).toLocaleDateString()}
            </div>
            <div className=" text-md hidden flex-row items-center gap-x-1 sm:flex">
              <ClockIcon className="h-4 w-4" />
              {formatTime(submission.timeElaped!)}
            </div>
          </div>
          <Badge
            big={true}
            color={getGradeColor((submission.grade! / 100) * 20)}
            text={`Nota: ${((submission.grade! / 100) * 20).toFixed(1)}`}
          />
        </div>
      </RadioGroup.Option>
    </Link>
  );
};

interface PreviousSubmissionsRadioGroupProps {
  examId: number;
}

const PreviousSubmissionsRadioGroup: FC<PreviousSubmissionsRadioGroupProps> = ({
  examId,
}) => {
  // State to store previous submissions
  const [previousSubmisions, setPreviousSubmissions] = useState<
    ExamSubmission[]
  >([]);

  // Function to get the previous submissions
  const { refetch: getExamHistory, isLoading } = useGetExamHistory(
    {
      examId: examId,
    },
    {
      query: {
        enabled: false,
        refetchOnWindowFocus: false,
        cacheTime: 1000, // 1 second
        staleTime: 1000, // 1 second

        onSuccess: (data) => {
          setPreviousSubmissions(data.data!);
        },
      },
    },
  );

  // On mount get the previous submissions
  useEffect(() => {
    getExamHistory();
  }, []);

  // While loading, show the loading grid list
  if (isLoading) {
    return <LoadingGridList />;
  }

  return (
    <RadioGroup className="delay-15 transition duration-300 animate-in fade-in slide-in-from-left-6">
      <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {/**Button to start a new exam session*/}
        <Link
          to={`/examMode/exam/${examId}/session`}
          className="group z-10 flex h-full w-full items-center justify-center gap-x-1.5 rounded-lg border-2 border-dashed border-gray-200 px-5 py-3 font-semibold transition hover:cursor-pointer focus:z-10 sm:py-7"
        >
          <div className="w-0" />
          <PlusCircleIcon className="z-10 h-6 w-6 rounded-full text-indigo-600 sm:h-10 sm:w-10 sm:group-hover:animate-in sm:group-hover:slide-in-from-right-10" />
          <div className="w-fit justify-start text-sm text-indigo-600 transition-all  duration-300 ease-in-out sm:max-w-0 sm:truncate sm:text-lg sm:opacity-0 sm:group-hover:w-fit sm:group-hover:max-w-[7rem] sm:group-hover:opacity-100">
            Nova Prova
          </div>
        </Link>
        {/**Buttons to start review sessions of previous exams */}
        {previousSubmisions.map((submission, index) => (
          <PreviousSubmissionOption key={index} submission={submission} />
        ))}
      </div>
    </RadioGroup>
  );
};

const ExamMenu: FC = ({}) => {
  // Get the exam information from the session storage
  const exam = useMemo(
    () => JSON.parse(sessionStorage.getItem("examInfo") || "null"),
    [],
  );

  // If parsing the exam, return a loading grid list
  if (exam === null || exam === undefined) {
    return <LoadingGridList />;
  }

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
        {/**Displays a menu to select relevant documents */}
        <div className="relative flex flex-row items-center justify-center gap-x-1 sm:gap-x-2">
          <ExamFileMenu
            examLink={exam.examPdf}
            resolutionLink={exam.solutionPdf}
            criteriaLink={exam.criteriaPdf}
          />
        </div>
      </div>
      <PreviousSubmissionsRadioGroup examId={exam.examId} />
    </div>
  );
};

export default ExamMenu;
