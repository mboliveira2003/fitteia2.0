import { FC, useEffect, useContext, useState, useMemo } from "react";
import {
  XMarkIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  NewspaperIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

import ReviewExamExerciseComponent from "../../../_common/exercises/ReviewExercise";
import { SoundContext } from "../../../../templates/Authenticated/Authenticated";
import { ExamModalContext } from "./ExamModal";
import { Exam } from "../../../../api/model";
import ExamSessionNavigation from "./ExamSessionNavigation";
import LoadingExercise from "../../../_common/visuals/loading/LoadingExercise";

const ExamReviewSession: FC = () => {
  // Get the answers and examInfo from the session storage
  const answers = useMemo(
    () => JSON.parse(sessionStorage.getItem("answers") || "null") as string[],
    [],
  );

  const examInfo = useMemo(
    () => JSON.parse(sessionStorage.getItem("examInfo") || "null") as Exam,
    [],
  );

  // Modal context to scroll to the top of the page
  const { onExamExerciseCompleted } = useContext(ExamModalContext);
  // State to keep track of the current exercise
  const [currentExamExerciseIndex, setCurrentExamExerciseIndex] =
    useState<number>(0);
  // Sound context to enable or disable sound
  const { soundEnabled, setSoundEnabled } = useContext(SoundContext);

  // When the Review Exercise changes, call the modal callback to scroll to the top of the page
  useEffect(() => {
    onExamExerciseCompleted();
  }, [currentExamExerciseIndex]);

  // Function to move to the next exercise
  const nextReviewExercise = () => {
    // Move to the next exercise
    if (currentExamExerciseIndex !== examInfo.exercises.length - 1) {
      setCurrentExamExerciseIndex((prev) => prev! + 1);
    } else {
      // If we've reached the end of the exercises, return to the first one
      setCurrentExamExerciseIndex(0);
    }
  };

  // While parsing the examInfo and answers, show a loading screen
  if (!examInfo || !answers) {
    return <LoadingExercise />;
  }

  return (
    <div className="flex w-full max-w-screen-2xl flex-col items-center gap-y-6 duration-300 animate-in fade-in slide-in-from-left-40">
      <div className="flex w-full flex-row items-center justify-start gap-x-4 duration-300 animate-in fade-in slide-in-from-left-20 sm:justify-between">
        <div className="flex flex-row items-center text-start text-gray-400 transition-all duration-200 ease-in-out">
          <Link to={`/examMode/exam/${examInfo.examId}/menu`}>
            <XMarkIcon className=" h-7 w-7 cursor-pointer hover:text-gray-600" />
          </Link>
        </div>
        <div className="hidden sm:block">
          <ExamSessionNavigation
            examExercises={examInfo.exercises}
            currentExamExerciseIndex={currentExamExerciseIndex}
            setCurrentExamExerciseIndex={setCurrentExamExerciseIndex}
            isExerciseAnswered={() => true}
          />
        </div>
        <div className="flex flex-row items-center text-end text-gray-400 transition-all duration-200 ease-in-out">
          {soundEnabled ? (
            <SpeakerWaveIcon
              className="h-6 w-6 shrink-0 cursor-pointer  hover:text-gray-600"
              aria-hidden="true"
              onClick={() => setSoundEnabled(false)}
            />
          ) : (
            <SpeakerXMarkIcon
              className="h-6 w-6 shrink-0  cursor-pointer hover:text-gray-600"
              aria-hidden="true"
              onClick={() => setSoundEnabled(true)}
            />
          )}
        </div>
      </div>

      <ReviewExamExerciseComponent
        exerciseId={examInfo.exercises[currentExamExerciseIndex].exerciseId}
        answer={answers[currentExamExerciseIndex]}
        nextReviewExercise={nextReviewExercise}
      />

      <div className="block w-full sm:hidden">
        <ExamSessionNavigation
          examExercises={examInfo.exercises}
          currentExamExerciseIndex={currentExamExerciseIndex}
          setCurrentExamExerciseIndex={setCurrentExamExerciseIndex}
          isExerciseAnswered={() => true}
        />
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-x-3 gap-y-2 pb-20 sm:flex-row">
        <div className="w-full sm:w-fit">
          <div className="sm:text-md inline-flex w-full items-center justify-center gap-x-1 rounded-lg border border-transparent bg-indigo-800 px-2 py-1 text-sm text-white shadow-sm ring-1 ring-indigo-800 font-semibold sm:w-fit  sm:gap-x-2 sm:px-4 sm:py-2">
            <DocumentMagnifyingGlassIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            Rever
          </div>
        </div>
        <Link
          to={`/examMode/exam/${examInfo.examId}/results`}
          className="w-full sm:w-fit"
        >
          <div className="sm:text-md inline-flex w-full items-center justify-center gap-x-1 rounded-lg border border-transparent bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm ring-1 ring-indigo-600 transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-indigo-700 hover:ring-indigo-700 sm:w-fit  sm:gap-x-2 sm:px-4 sm:py-2">
            <NewspaperIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            Relatório
          </div>
        </Link>
        <Link
          to={`/examMode/exam/${examInfo.examId}/menu`}
          className="w-full sm:w-fit"
        >
          <div className="sm:text-md inline-flex w-full items-center justify-center gap-x-1 rounded-lg border border-transparent bg-white px-2 py-1 text-sm font-semibold text-indigo-700 shadow-sm ring-1 ring-indigo-700 transition-all duration-200 ease-in-out hover:cursor-pointer  hover:bg-indigo-50 hover:text-indigo-700 sm:w-fit sm:gap-x-2 sm:px-4 sm:py-2">
            <ArrowLeftEndOnRectangleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            Voltar
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ExamReviewSession;
