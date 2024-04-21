import { FC, useEffect, useMemo, useContext } from "react";
import {
  CheckCircleIcon,
  DocumentMagnifyingGlassIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

import LoadingList from "../../../_common/visuals/loading/LoadingList";
import ProgressBar from "../../../_common/visuals/progress_bars/progress_bar";
import GradeBadge from "../../../_common/visuals/badges/GradeBadge";
import { ExamSubmissionGradeDistributionItem } from "../../../../api/model/examSubmissionGradeDistributionItem";
import { Exam } from "../../../../api/model/exam";
import { ExamModalContext } from "./ExamModal";

interface SubtopicResultProps {
  subtopicName: string;
  numberTotalExercises: number;
  numberCorrectExercises: number;
}

const SubtopicResult: FC<SubtopicResultProps> = ({
  subtopicName,
  numberTotalExercises,
  numberCorrectExercises,
}) => {
  return (
    <div className="group flex flex-row items-center justify-between gap-x-10 px-6 py-3 transition duration-300 ease-in-out odd:bg-indigo-200/20 ">
      <h1 className="text-md text-start text-gray-600">{subtopicName}</h1>
      <div className="flex flex-row items-center gap-x-10">
        <div className="sm:w-44">
          <ProgressBar
            percentage={(numberCorrectExercises * 100) / numberTotalExercises}
          />
        </div>
        <p className="text-md flex flex-row items-center gap-x-1 whitespace-nowrap text-start text-gray-500">
          {numberCorrectExercises}/{numberTotalExercises}
          <CheckCircleIcon className="h-4 w-4 group-hover:animate-jump" />
        </p>
      </div>
    </div>
  );
};

const ExamResults: FC = () => {
  // Get the grade, gradeDistribution and examInfo from the session storage
  const grade = useMemo(
    () => JSON.parse(sessionStorage.getItem("grade") || "null") as number,
    [],
  );
  const gradeDistribution = useMemo(
    () =>
      JSON.parse(
        sessionStorage.getItem("gradeDistribution") || "null",
      ) as ExamSubmissionGradeDistributionItem[],
    [],
  );
  const examInfo = useMemo(
    () => JSON.parse(sessionStorage.getItem("examInfo") || "null") as Exam,
    [],
  );

  // On render scroll to the top of the page
  const { onExamExerciseCompleted } = useContext(ExamModalContext);

  useEffect(() => {
    onExamExerciseCompleted();
  }, []);

  // While parsing the grade, gradeDistribution and examInfo, show a loading screen
  if (!grade || !gradeDistribution || !examInfo) {
    return <LoadingList />;
  }
  return (
    <div className="m-auto flex w-full flex-col gap-y-6 duration-300 animate-in fade-in slide-in-from-left-40 sm:gap-y-8">
      <div className="flex flex-col justify-between gap-x-8 gap-y-6 text-gray-500 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-gray-800 ">
            Relatório
          </h1>
          <p className="text-lg">{examInfo.examName}</p>
        </div>

        <GradeBadge percentage={grade} />
      </div>

      <div className="divide-y overflow-hidden rounded-lg">
        {gradeDistribution.map((subtopicFeedback) => (
          <SubtopicResult
            subtopicName={subtopicFeedback.subTopicName!}
            numberTotalExercises={subtopicFeedback.numberTotalExercises!}
            numberCorrectExercises={subtopicFeedback.numberCorrectExercises!}
            key={subtopicFeedback.subTopicId!}
          />
        ))}
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-x-3 gap-y-2 pb-20  sm:flex-row">
        <Link to={`/examMode/exam/${examInfo.examId}/review`} className="w-full sm:w-fit">
          <div className="sm:text-md inline-flex w-full items-center justify-center gap-x-1 rounded-lg border border-transparent bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm ring-1 ring-indigo-600 transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-indigo-700 hover:ring-indigo-700 sm:w-fit  sm:gap-x-2 sm:px-4 sm:py-2">
            <DocumentMagnifyingGlassIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            Rever
          </div>
        </Link>
        <div className="w-full sm:w-fit">
          <div className="sm:text-md inline-flex w-full items-center justify-center gap-x-1 rounded-lg border border-transparent bg-indigo-800 px-2 py-1 text-sm text-white shadow-sm ring-1 ring-indigo-800 font-semibold sm:w-fit  sm:gap-x-2 sm:px-4 sm:py-2">
            <NewspaperIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            Relatório
          </div>
        </div>
        <Link to={`/examMode/exam/${examInfo.examId}/menu`} className="w-full sm:w-fit">
          <div className="sm:text-md inline-flex w-full items-center justify-center gap-x-1 rounded-lg border border-transparent bg-white px-2 py-1 text-sm font-semibold text-indigo-700 shadow-sm ring-1 ring-indigo-700 transition-all duration-200 ease-in-out hover:cursor-pointer  hover:bg-indigo-50 hover:text-indigo-700 sm:w-fit sm:gap-x-2 sm:px-4 sm:py-2">
            <ArrowLeftEndOnRectangleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            Voltar
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ExamResults;
