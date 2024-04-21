import { FC, useState, useEffect, useContext, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  XMarkIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";

import { ExerciseBasicInfo } from "../../../../api/model";
import { SoundContext } from "../../../../templates/Authenticated/Authenticated";
import { ExerciseModalContext } from "./ExerciseModal";
import ExerciseComponent from "../../../_common/exercises/Exercise";
import ProgressBar from "../../../_common/visuals/progress_bars/big_progress_bar";
import Fire, { FireAnimation } from "../../../_common/Fire";

const ExerciseSession: FC = () => {
  // Url params
  const { year, topic, subtopic, exercise } = useParams();
  // Function to navigate to a new page
  const navigateTo = useNavigate();
  // Function to scroll to top of the page
  const { onExerciseCompleted } = useContext(ExerciseModalContext);
  // Sound context
  const { soundEnabled, setSoundEnabled } = useContext(SoundContext);
  // Set the initial values based on session storage
  const exerciseList = useMemo(
    () => JSON.parse(sessionStorage.getItem("exercises") || "[]"),
    [],
  );

  // State to store the exercise streak
  const [streak, setStreak] = useState<number>(0);
  // State to store when the streak animation should be shown
  const [showStreak, setShowStreak] = useState<boolean>(false);

  useEffect(() => {
    // If the streak is 3 show the animation
    if (streak === 3 || streak === 5 || streak === 10) {
      setShowStreak(true);
      setTimeout(() => {
        setShowStreak(false);
      }, 2500);
    }
  }, [streak]);

  const increaseStreak = () => {
    setStreak(streak + 1);
  };

  const resetStreak = () => {
    setStreak(0);
  };

  // Keep track od the maximum streak in the session storage
  useEffect(() => {
    const maxStreak = Number(sessionStorage.getItem("maxStreak") || 0);
    if (streak > maxStreak) {
      sessionStorage.setItem("maxStreak", streak.toString());
    }
  }, [streak]);

  const [exercises, setExercises] =
    useState<ExerciseBasicInfo[]>(exerciseList);

  // Show the progress bar if there are more than 1 exercises
  const showProgressBar = useMemo(() => exercises.length > 1, []);

  // Whenever exercises changes, update the current exercise id to the first exercise in the list
  useEffect(() => {
    // Srool to top of the page
    onExerciseCompleted();

    // Navigate to the completed page if there are no exercises left
    if (exercises.length === 0) {
      navigateTo(`/exercises/${year}/${topic}/${subtopic}/session/completed`);
    }

    // Move to the next exercise
    if (exercises.length > 0) {
      navigateTo(
        `/exercises/${year}/${topic}/${subtopic}/session/${exercises[0].exerciseId}`,
      );
    }
  }, [exercises]);

  // Removes the first exercise from the list when the answer is correct
  const nextExercise = () => {
    const newExerciseList = [...exercises];
    newExerciseList.shift();
    setExercises(newExerciseList);

    // update the session storage
    sessionStorage.setItem("exercises", JSON.stringify(newExerciseList));
  };

  return (
    <div className="flex w-full flex-col items-center gap-y-6 ">
      <div className="relative flex w-full flex-row items-center justify-between gap-x-4 duration-300 animate-in fade-in slide-in-from-top-20">
        <div className="flex flex-row items-center gap-x-2 text-start text-gray-400 transition-all duration-200 ease-in-out sm:w-20">
          <Link to={`/exercises/${year}/${topic}/${subtopic}`}>
            <XMarkIcon className=" h-7 w-7 cursor-pointer hover:text-gray-600" />
          </Link>
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

        {/*Progress Section*/}
        {showProgressBar && (
          <>
            <ProgressBar
              key={exercises.length}
              percentage={Math.round(
                100 - (exercises.length / exerciseList.length) * 100,
              )}
            />

            <div className="hidden w-16 text-center sm:block">
              <p className="text-lg font-medium text-indigo-700">
                {Math.round(
                  100 - (exercises.length / exerciseList.length) * 100,
                )}
                %
              </p>
            </div>

            {/*For small and medium screens*/}
            <div className="flex flex-row items-center gap-x-4 xl:hidden">
              {streak >= 3 ? (
                <div className="relative flex h-3 w-3 items-center justify-center">
                  <Fire />
                </div>
              ) : (
                <div className="flex h-3 w-3 rotate-45 transform items-center justify-center rounded bg-gray-300 transition-all ease-in-out "></div>
              )}
              {streak >= 5 ? (
                <div className="relative flex h-4 w-4 items-center justify-center">
                  <Fire />
                </div>
              ) : (
                <div className="flex h-4 w-4 rotate-45 transform items-center justify-center rounded bg-gray-300 transition-all ease-in-out "></div>
              )}
              {streak >= 10 ? (
                <div className="relative flex h-5 w-5 items-center justify-center">
                  <Fire />
                </div>
              ) : (
                <div className="flex h-5 w-5 rotate-45 transform items-center justify-center rounded bg-gray-300 transition-all ease-in-out "></div>
              )}
            </div>

            {/*For large screens*/}
            <div className="absolute left-full ml-8 hidden flex-col gap-y-3 xl:flex">
              {streak >= 3 ? (
                <div className="relative flex h-3 w-3 items-center justify-center">
                  <Fire />
                </div>
              ) : (
                <div className="flex h-3 w-3 rotate-45 transform items-center justify-center rounded bg-gray-300 transition-all ease-in-out "></div>
              )}
              {streak >= 5 ? (
                <div className="relative ml-4 flex h-4 w-4 items-center justify-center">
                  <Fire />
                </div>
              ) : (
                <div className="ml-4 flex h-4 w-4 rotate-45 transform items-center justify-center rounded bg-gray-300 transition-all ease-in-out "></div>
              )}
              {streak >= 10 ? (
                <div className="relative flex h-5 w-5 items-center justify-center">
                  <Fire />
                </div>
              ) : (
                <div className="flex h-5 w-5 rotate-45 transform items-center justify-center rounded bg-gray-300 transition-all ease-in-out "></div>
              )}
            </div>
          </>
        )}
      </div>

      <ExerciseComponent
        exerciseId={Number(exercise)}
        nextExercise={() => nextExercise()}
        increaseStreak={increaseStreak}
        resetStreak={resetStreak}
      />

      {/*Show the stars animation if the streak is 3, 5 or 10*/}
      <FireAnimation show={showStreak} streak={streak} />
    </div>
  );
};

export default ExerciseSession;
