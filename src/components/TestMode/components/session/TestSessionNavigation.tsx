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

interface TestSessionNavigationProps {
  testExercises: ExerciseBasicInfo[];
  currentTestExerciseIndex: number;
  setCurrentTestExerciseIndex: (currentTestExerciseIndex: number) => void;
  isExerciseAnswered: (exerciseId: number) => boolean;
}

const TestSessionNavigation: FC<TestSessionNavigationProps> = ({
  testExercises,
  currentTestExerciseIndex,
  setCurrentTestExerciseIndex,
  isExerciseAnswered,
}) => {
  // Decides if a testExercise should be hidden or not
  const isExerciseHidden = (index: number) => {

    // If the current exercise is the first one, show the first 5 exercises
    if (
      currentTestExerciseIndex === 0 &&
      index <= currentTestExerciseIndex + 4
    ) {
      return false;
    }

    // If the current exercise is the last one, show the last 5 exercises
    if (
      currentTestExerciseIndex === testExercises.length - 1 &&
      currentTestExerciseIndex - 4 <= index
    ) {
      return false;
    }

    // If the current exercise is the second one, show the first 4 exercises
    if (
      currentTestExerciseIndex === 1 &&
      (index <= currentTestExerciseIndex + 3 || index === 0)
    ) {
      return false;
    }

    // If the current exercise is the penultimate one, show the last 4 exercises
    if (
      currentTestExerciseIndex === testExercises.length - 2 &&
      (currentTestExerciseIndex - 3 <= index ||
        index === testExercises.length - 1)
    ) {
      return false;
    }

    // If the current exercise is none of the above, show the current exercise and the two exercises before and after
    if (
      currentTestExerciseIndex - 2 <= index &&
      index <= currentTestExerciseIndex + 2
    ) {
      return false;
    }
    return true;
  };

  return (
    <RadioGroup
      value={currentTestExerciseIndex}
      className="flex w-full flex-row items-center justify-center gap-x-2 divide-gray-200 rounded-lg bg-white px-2 shadow-md ring-1 ring-gray-200 sm:w-fit sm:rounded-md sm:shadow-sm"
    >
      {/*If the current exercise is the first one, don't show the fast backward icon*/}
      {currentTestExerciseIndex !== 0 && (
        <div className="flex cursor-pointer flex-row items-center justify-center text-gray-400 transition-all duration-200 ease-in-out hover:text-gray-600">
          <ChevronDoubleLeftIcon
            className="h-4 w-4 sm:h-5 sm:w-5"
            onClick={() => {
              setCurrentTestExerciseIndex(0);
            }}
          />
        </div>
      )}

      {/*If there is no previous exercise, don't show the previous icon*/}
      {currentTestExerciseIndex! - 1 >= 0 && (
        <div className="flex cursor-pointer flex-row items-center justify-center text-gray-400 transition-all duration-200 ease-in-out hover:text-gray-600">
          <ChevronLeftIcon
            className="h-4 w-4 sm:h-5 sm:w-5"
            onClick={() => {
              setCurrentTestExerciseIndex(currentTestExerciseIndex! - 1);
            }}
          />
        </div>
      )}

      {testExercises.map((testExercise, index) => (
        <RadioGroup.Option
          value={index}
          key={testExercise.exerciseId}
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
                isExerciseAnswered(testExercise.exerciseId) && "text-gray-700",
              )}
              onClick={() => {
                setCurrentTestExerciseIndex(index);
              }}
            >
              <p className="text-md flex h-4 w-4 items-center justify-center font-semibold sm:h-5 sm:w-5">
                {index + 1}
              </p>
            </div>
          )}
        </RadioGroup.Option>
      ))}

      {/*If there is no next exercise, don't show the next icon*/}
      {currentTestExerciseIndex! + 1 <= testExercises.length - 1 && (
        <div className="flex cursor-pointer flex-row items-center justify-center text-gray-400 transition-all duration-200 ease-in-out hover:text-gray-600">
          <ChevronRightIcon
            className="h-4 w-4 sm:h-5 sm:w-5"
            onClick={() => {
              setCurrentTestExerciseIndex(currentTestExerciseIndex! + 1);
            }}
          />
        </div>
      )}

      {/*If the current exercise is the last one, don't show the fast forward icon*/}
      {currentTestExerciseIndex !== testExercises.length - 1 && (
        <div className="flex cursor-pointer flex-row items-center justify-center text-gray-400 transition-all duration-200 ease-in-out hover:text-gray-600">
          <ChevronDoubleRightIcon
            className="h-4 w-4 sm:h-5 sm:w-5"
            onClick={() => {
              setCurrentTestExerciseIndex(testExercises.length - 1);
            }}
          />
        </div>
      )}
    </RadioGroup>
  );
};

export default TestSessionNavigation;
