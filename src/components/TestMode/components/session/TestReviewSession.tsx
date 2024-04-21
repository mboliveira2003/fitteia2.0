import { FC, useEffect, useContext, useState, useMemo } from "react";
import {
  XMarkIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  NewspaperIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/20/solid";
import { Link, useParams } from "react-router-dom";

import ReviewTestExerciseComponent from "../../../_common/exercises/ReviewExercise";
import { SoundContext } from "../../../../templates/Authenticated/Authenticated";
import { TestModalContext } from "./TestModal";
import {
  ExerciseBasicInfo,
  TestFeedback,
  TestInfo,
} from "../../../../api/model";
import TestSessionNavigation from "./TestSessionNavigation";
import LoadingExercise from "../../../_common/visuals/loading/LoadingExercise";

const TestReviewSession: FC = () => {
  // Get the testId from the URL
  const { testId } = useParams();

  // Get test info and feedback from the session storage
  const testInfo = useMemo(
    () => JSON.parse(sessionStorage.getItem("testInfo") || "null") as TestInfo,
    [],
  );
  const testFeedback = useMemo(
    () =>
      JSON.parse(
        sessionStorage.getItem("testFeedback") || "null",
      ) as TestFeedback,
    [],
  );

  // Check if there is more than one exercise in the test
  const moreThanOneExercise = testInfo.exercises!.length > 1;

  // Modal context to scroll to the top of the page
  const { onTestExerciseCompleted } = useContext(TestModalContext);

  // State to keep track of the current exercise
  const [currentTestExerciseIndex, setCurrentTestExerciseIndex] =
    useState<number>(0);

  // Sound context to enable or disable sound
  const { soundEnabled, setSoundEnabled } = useContext(SoundContext);

  // When the Review Exercise changes, call the modal callback to scroll to the top of the page
  useEffect(() => {
    onTestExerciseCompleted();
  }, [currentTestExerciseIndex]);

  // Function to move to the next exercise
  const nextReviewExercise = () => {
    // Move to the next exercise
    if (currentTestExerciseIndex !== testInfo.exercises!.length - 1) {
      setCurrentTestExerciseIndex((prev) => prev! + 1);
    } else {
      // If we've reached the end of the exercises, return to the first one
      setCurrentTestExerciseIndex(0);
    }
  };

  // While parsing the testInfo and test feedback, show a loading screen
  if (!testInfo) {
    return <LoadingExercise />;
  }

  return (
    <div className="flex w-full max-w-screen-2xl flex-col items-center gap-y-6 pb-28 duration-300 animate-in fade-in slide-in-from-left-40">
      {/**Header and Navigation*/}
      <div className="flex w-full flex-row items-center justify-start gap-x-4 duration-300 animate-in fade-in slide-in-from-left-20 sm:justify-between">
        <div className="flex flex-row items-center text-start text-gray-400 transition-all duration-200 ease-in-out">
          <Link to={`/test-mode/${testId}/menu`}>
            <XMarkIcon className=" h-7 w-7 cursor-pointer hover:text-gray-600" />
          </Link>
        </div>

        {/**If there's only one exercise don't show the navigation*/}
        {moreThanOneExercise && (
          <div className="hidden sm:block">
            <TestSessionNavigation
              testExercises={testInfo.exercises as ExerciseBasicInfo[]}
              currentTestExerciseIndex={currentTestExerciseIndex}
              setCurrentTestExerciseIndex={setCurrentTestExerciseIndex}
              isExerciseAnswered={() => true}
            />
          </div>
        )}

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

      <ReviewTestExerciseComponent
        exerciseId={testInfo.exercises![currentTestExerciseIndex].exerciseId!}
        answer={testFeedback.userAnswers![currentTestExerciseIndex]!}
        nextReviewExercise={nextReviewExercise}
        moreThanOneExercise={moreThanOneExercise}
      />

      {/**If there's only one exercise don't show the navigation*/}
      {moreThanOneExercise && (
        <div className="block w-full sm:hidden">
          <TestSessionNavigation
            testExercises={testInfo.exercises as ExerciseBasicInfo[]}
            currentTestExerciseIndex={currentTestExerciseIndex}
            setCurrentTestExerciseIndex={setCurrentTestExerciseIndex}
            isExerciseAnswered={() => true}
          />
        </div>
      )}

      {/**Mode Navigation*/}
      <div className="flex w-full flex-col items-center justify-center gap-x-3 gap-y-2 sm:flex-row">
        <div className="w-full sm:w-fit">
          <div className="sm:text-md inline-flex w-full items-center justify-center gap-x-1 rounded-lg border border-transparent bg-indigo-800 px-2 py-1 text-sm font-semibold text-white shadow-sm ring-1 ring-indigo-800 sm:w-fit  sm:gap-x-2 sm:px-4 sm:py-2">
            <DocumentMagnifyingGlassIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            Rever
          </div>
        </div>
        <Link to={`/test-mode/${testId}/results`} className="w-full sm:w-fit">
          <div className="sm:text-md inline-flex w-full items-center justify-center gap-x-1 rounded-lg border border-transparent bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm ring-1 ring-indigo-600 transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-indigo-700 hover:ring-indigo-700 sm:w-fit  sm:gap-x-2 sm:px-4 sm:py-2">
            <NewspaperIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            Relatório
          </div>
        </Link>
        <Link to={`/test-mode/${testId}/menu`} className="w-full sm:w-fit">
          <div className="sm:text-md inline-flex w-full items-center justify-center gap-x-1 rounded-lg border border-transparent bg-white px-2 py-1 text-sm font-semibold text-indigo-700 shadow-sm ring-1 ring-indigo-700 transition-all duration-200 ease-in-out hover:cursor-pointer  hover:bg-indigo-50 hover:text-indigo-700 sm:w-fit sm:gap-x-2 sm:px-4 sm:py-2">
            <ArrowLeftEndOnRectangleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            Voltar
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TestReviewSession;
