import { FC } from "react";
import clsx from "clsx";
import { RadioGroup, Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ArrowRightEndOnRectangleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";

import {
  MultipleChoiceOptions,
  WrittenAnswerOptions,
} from "../../enums/answers";
import AnswerFeedbackState from "../../enums/feedback";

interface MultipleChoiceRadioGroupProps {
  options: typeof MultipleChoiceOptions | typeof WrittenAnswerOptions;
  setAnswer: (answer: string) => void;
  answer: string;
  feedback: AnswerFeedbackState;
}

const MultipleChoiceRadioGroup: FC<MultipleChoiceRadioGroupProps> = ({
  options,
  answer,
  setAnswer,
  feedback,
}) => {
  // Conditionally style the radiogroup buttons
  function getButtonClassName(checked: boolean): string {
    // If the button is not selected, return the base class
    let baseClass =
      "relative flex w-full cursor-pointer items-center rounded-lg px-6 py-1 font-medium text-gray-800 shadow-sm ring-inset ring-1 ring-gray-200 hover:cursor-pointer hover:ring-2 hover:ring-indigo-400 focus:outline-none sm:w-fit sm:px-4 sm:py-2";
    if (!checked) return baseClass;
    // Style the button according to the feedback
    switch (feedback) {
      case AnswerFeedbackState.CORRECT:
        return "relative flex w-full cursor-pointer items-center rounded-lg px-6 py-1 font-medium shadow-sm ring-inset hover:cursor-pointer hover:ring-2 focus:outline-none sm:w-fit sm:px-4 sm:py-2 hover:ring-green-400 text-green-900 ring-2 ring-green-400";
      case AnswerFeedbackState.WRONG:
        return "relative flex w-full cursor-pointer items-center rounded-lg px-6 py-1 font-medium shadow-sm ring-inset hover:cursor-pointer hover:ring-2 focus:outline-none sm:w-fit sm:px-4 sm:py-2 hover:ring-red-400 text-red-900 ring-2 ring-red-400";
      case AnswerFeedbackState.NONE:
        return "relative flex w-full cursor-pointer items-center rounded-lg px-6 py-1 font-medium shadow-sm ring-inset hover:cursor-pointer hover:ring-2 focus:outline-none sm:w-fit sm:px-4 sm:py-2 hover:ring-indigo-400 text-indigo-900 ring-2 ring-indigo-400";
    }
  }

  return (
    <RadioGroup className="w-full">
      <div className="grid w-full grid-cols-2 flex-col items-center gap-x-2 gap-y-2 sm:flex sm:flex-row sm:justify-start sm:gap-y-0 md:gap-x-3 ">
        {options.map((option) => (
          <RadioGroup.Option
            key={option.id}
            value={option.title}
            className={getButtonClassName(answer === option.title)}
            onClick={() => setAnswer(option.title)}
          >
            <div className="flex w-full items-center justify-center sm:justify-between">
              <div className="flex items-center">
                <div className="text-md w-full sm:w-fit sm:text-lg md:text-xl ">
                  <p className="w-full sm:w-fit">{option.title}</p>
                </div>
              </div>
            </div>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

interface AnswerSectionProps {
  isMultipleChoice: boolean;
  exerciseId: number;
  answer: string;
  setAnswer: (answer: string) => void;
  feedbackState: AnswerFeedbackState;
  submitAnswer: (answer: string) => void;
}

const AnswerSection: FC<AnswerSectionProps> = ({
  isMultipleChoice,
  exerciseId,
  answer,
  setAnswer,
  feedbackState,
  submitAnswer,
}) => {
  // Conditionaly style the submit button
  let buttonClass = "bg-gray-300 ring-gray-300"; // No answer
  if (answer != "") {
    // Style the button according to the feedback
    switch (feedbackState) {
      case AnswerFeedbackState.CORRECT:
        buttonClass = "bg-green-400 ring-green-400";
        break;
      case AnswerFeedbackState.WRONG:
        buttonClass = "bg-red-400 ring-red-400";
        break;
      case AnswerFeedbackState.NONE:
        buttonClass =
          "bg-indigo-600 ring-indigo-600 cursor-pointer hover:bg-indigo-700 hover:ring-indigo-700";
        break;
    }
  }

  return (
    <div
      className={clsx(
        "flex flex-col gap-y-4 px-6 py-4",
        // Style the background of the answer section according to the feedback
        feedbackState === AnswerFeedbackState.CORRECT && "bg-green-50",
        feedbackState === AnswerFeedbackState.WRONG && "bg-red-50",
      )}
    >
      {/**If the exercise is a written exercise, tell the user to evaluate themselves*/}
      {!isMultipleChoice && (
        <div className="sm:text-md text-sm font-medium text-gray-800 ">
          Autoavalia a tua resposta:
        </div>
      )}
      <div className="flex flex-col items-center justify-center gap-y-4 transition duration-200  ease-in-out sm:flex-row sm:justify-between">
        <MultipleChoiceRadioGroup
          key={exerciseId}
          answer={answer}
          feedback={feedbackState}
          options={
            isMultipleChoice ? MultipleChoiceOptions : WrittenAnswerOptions
          }
          setAnswer={setAnswer}
        />
        <div className="flex w-full flex-col items-center gap-x-2 gap-y-2 sm:flex-row-reverse">
          <div
            className={clsx(
              "sm:text-md inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent px-2 py-1 text-sm font-semibold text-white shadow-sm ring-2 transition-all duration-150 ease-in-out sm:w-fit sm:px-4 sm:py-2",
              buttonClass,
            )}
            onClick={() => submitAnswer(answer)}
          >
            Submeter
            <ArrowRightEndOnRectangleIcon className="mt-0.5 h-5 w-5" />
          </div>

          <Transition
            className="hidden lg:block"
            appear={true}
            show={feedbackState !== AnswerFeedbackState.NONE}
            enter="transition-all duration-400"
            enterFrom="opacity-0 scale-0 rotate-0"
            enterTo="opacity-100 scale-100 rotate-360"
            leave="transition-all duration-150"
            leaveFrom="opacity-100 hidden"
            leaveTo="opacity-0"
          >
            {/**Display different animations depending on the feedback */}
            {feedbackState === AnswerFeedbackState.CORRECT && (
              <CheckCircleIcon className="h-11 w-11 text-green-400" />
            )}
            {feedbackState === AnswerFeedbackState.WRONG && (
              <XCircleIcon className="h-11 w-11 text-red-400" />
            )}
          </Transition>
        </div>
      </div>
    </div>
  );
};

export default AnswerSection;
