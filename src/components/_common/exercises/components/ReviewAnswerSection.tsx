import { FC } from "react";

import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/20/solid";
import {
  MultipleChoiceOptions,
  WrittenAnswerOptions,
} from "../../enums/answers";

interface MultipleChoiceRadioGroupProps {
  options: typeof MultipleChoiceOptions | typeof WrittenAnswerOptions;
  answer: string;
  correctAnswer: string;
}

const MultipleChoiceRadioGroup: FC<MultipleChoiceRadioGroupProps> = ({
  options,
  answer,
  correctAnswer,
}) => {
  // Pick button styling based on the answer
  function getButtonClassName(
    option: string,
    answer: string,
    correctAnswer: string,
  ) {
    // Correct Option wasn´t selected
    if (option !== answer && option === correctAnswer) {
      return "relative flex w-full items-center bg-green-100 rounded-lg px-6 py-1 font-medium shadow-sm ring-inset focus:outline-none sm:w-fit sm:px-4 sm:py-2  text-green-900 ring-2 ring-green-400";
    }

    // Selected Option is correct
    if (
      option === answer &&
      (answer === "Correta" ||
        answer === "Suficiente" ||
        option === correctAnswer)
    ) {
      return "relative flex w-full items-center bg-green-100 rounded-lg px-6 py-1 font-medium shadow-sm ring-inset focus:outline-none sm:w-fit sm:px-4 sm:py-2  text-green-900 ring-2 ring-green-400";
    }

    // Selected Option is incorrect
    if (
      option === answer &&
      (option !== correctAnswer ||
        answer === "Errada" ||
        answer === "Incompleta")
    ) {
      return "relative flex w-full items-center rounded-lg px-6 py-1 font-medium shadow-sm ring-inset bg-red-100  focus:outline-none sm:w-fit sm:px-4 sm:py-2 text-red-900 ring-2 ring-red-400";
    }

    // Unselected Option
    if (option !== answer) {
      return "relative flex w-full items-center rounded-lg px-6 py-1 font-medium text-gray-800 shadow-sm ring-inset ring-1 ring-gray-200 focus:outline-none sm:w-fit sm:px-4 sm:py-2";
    }
  }

  return (
    <div className="w-full">
      <div className="grid w-full grid-cols-2 flex-col items-center gap-x-2 gap-y-2 sm:flex sm:flex-row sm:justify-start sm:gap-y-0 md:gap-x-3 ">
        {options.map((option) => (
          <div
            key={option.id}
            className={getButtonClassName(option.title, answer, correctAnswer)}
          >
            <div className="flex w-full items-center justify-center sm:justify-between">
              <div className="flex items-center">
                <div className="text-md w-full sm:w-fit sm:text-lg md:text-xl ">
                  <p className="w-full sm:w-fit">{option.title}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface AnswerSectionProps {
  isMultipleChoice: boolean;
  exerciseId: number;
  answer: string;
  correctAnswer: string;
  nextReviewExercise: () => void;
  moreThanOneExercise?: boolean;
}

const AnswerSection: FC<AnswerSectionProps> = ({
  isMultipleChoice,
  exerciseId,
  answer,
  correctAnswer,
  nextReviewExercise,
  moreThanOneExercise,
}) => {
  return (
    <div className="flex flex-col gap-y-4 px-6 py-4 ">
      {/**If the exercise is a written one inform the student of the self evaluation */}
      {!isMultipleChoice && (
        <div className="sm:text-md text-sm font-medium text-gray-800 ">
          Autoavalia a tua resposta:
        </div>
      )}
      <div className="flex flex-col items-center justify-center gap-y-4 transition duration-200  ease-in-out sm:flex-row sm:justify-between">
        <MultipleChoiceRadioGroup
          key={exerciseId}
          answer={answer}
          correctAnswer={correctAnswer}
          options={
            isMultipleChoice ? MultipleChoiceOptions : WrittenAnswerOptions
          }
        />
        {moreThanOneExercise !== false && (
          <div className="flex w-full flex-col items-center gap-x-2 gap-y-2 sm:flex-row-reverse">
            <div
              className="sm:text-md inline-flex w-full cursor-pointer items-center justify-center gap-x-2 rounded-lg border border-transparent bg-white px-2 py-1 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-300 transition-all duration-150 ease-in-out hover:bg-gray-50 hover:text-gray-800 sm:w-fit sm:px-4 sm:py-2"
              onClick={() => nextReviewExercise()}
            >
              Próximo Exercício
              <ArrowRightEndOnRectangleIcon className="mt-0.5 h-5 w-5" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnswerSection;
