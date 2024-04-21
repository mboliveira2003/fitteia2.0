import { FC } from "react";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";

import { ExerciseBasicInfo } from "../../../../api/model";

interface ExamSessionNavigationProps {
  examExercises: ExerciseBasicInfo[];
  currentExamExerciseIndex: number;
  setCurrentExamExerciseIndex: (currentExamExerciseIndex: number) => void;
  isExerciseAnswered: (exerciseId: number) => boolean;
}

const ExamSessionNavigation: FC<ExamSessionNavigationProps> = ({
  examExercises,
  currentExamExerciseIndex,
  setCurrentExamExerciseIndex,
  isExerciseAnswered,
}) => {
  // Decides if a examExercise should be hidden or not
  const isExerciseHidden = (index: number) => {
    if (
      currentExamExerciseIndex === 0 &&
      index <= currentExamExerciseIndex + 4
    ) {
      return false;
    }
    if (
      currentExamExerciseIndex === examExercises.length - 1 &&
      currentExamExerciseIndex - 4 <= index
    ) {
      return false;
    }
    if (
      currentExamExerciseIndex === 1 &&
      (index <= currentExamExerciseIndex + 3 || index === 0)
    ) {
      return false;
    }
    if (
      currentExamExerciseIndex === examExercises.length - 2 &&
      (currentExamExerciseIndex - 3 <= index ||
        index === examExercises.length - 1)
    ) {
      return false;
    }
    if (
      currentExamExerciseIndex - 2 <= index &&
      index <= currentExamExerciseIndex + 2
    ) {
      return false;
    }
    return true;
  };

  return (
    <RadioGroup
      value={currentExamExerciseIndex}
      className="flex w-full flex-row items-center justify-center gap-x-2 divide-gray-200 rounded-lg bg-white px-2 shadow-md ring-1 ring-gray-200 sm:w-fit sm:rounded-md sm:shadow-sm"
    >
      {currentExamExerciseIndex !== 0 && (
        <div className="flex cursor-pointer flex-row items-center justify-center text-gray-400 transition-all duration-200 ease-in-out hover:text-gray-600">
          <ChevronDoubleLeftIcon
            className="h-4 w-4 sm:h-5 sm:w-5"
            onClick={() => {
              setCurrentExamExerciseIndex(0);
            }}
          />
        </div>
      )}

      {currentExamExerciseIndex! - 1 >= 0 && (
        <div className="flex cursor-pointer flex-row items-center justify-center text-gray-400 transition-all duration-200 ease-in-out hover:text-gray-600">
          <ChevronLeftIcon
            className="h-4 w-4 sm:h-5 sm:w-5"
            onClick={() => {
              setCurrentExamExerciseIndex(currentExamExerciseIndex! - 1);
            }}
          />
        </div>
      )}
      {examExercises.map((examExercise, index) => (
        <RadioGroup.Option
          value={index}
          key={examExercise.exerciseId}
          className={clsx(
            "inline-flex items-center justify-center py-1",
            isExerciseHidden(index) && "hidden",
          )}
        >
          {({ checked }) => (
            <div
              className={clsx(
                "inline-flex w-full cursor-pointer items-center justify-center rounded-full px-2 py-2 text-gray-400 hover:text-indigo-700",
                checked && "bg-indigo-50 text-indigo-700 ring-indigo-600",
                isExerciseAnswered(examExercise.exerciseId) && "text-gray-700",
              )}
              onClick={() => {
                setCurrentExamExerciseIndex(index);
              }}
            >
              <p className="text-md flex h-4 w-4 items-center justify-center font-semibold sm:h-5 sm:w-5">
                {index + 1}
              </p>
            </div>
          )}
        </RadioGroup.Option>
      ))}
      {currentExamExerciseIndex! + 1 <= examExercises.length - 1 && (
        <div className="flex cursor-pointer flex-row items-center justify-center text-gray-400 transition-all duration-200 ease-in-out hover:text-gray-600">
          <ChevronRightIcon
            className="h-4 w-4 sm:h-5 sm:w-5"
            onClick={() => {
              setCurrentExamExerciseIndex(currentExamExerciseIndex! + 1);
            }}
          />
        </div>
      )}
      {currentExamExerciseIndex !== examExercises.length - 1 && (
        <div className="flex cursor-pointer flex-row items-center justify-center text-gray-400 transition-all duration-200 ease-in-out hover:text-gray-600">
          <ChevronDoubleRightIcon
            className="h-4 w-4 sm:h-5 sm:w-5"
            onClick={() => {
              setCurrentExamExerciseIndex(examExercises.length - 1);
            }}
          />
        </div>
      )}
    </RadioGroup>
  );
};

export default ExamSessionNavigation;
