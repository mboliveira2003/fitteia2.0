import { FC, useContext } from "react";
import clsx from "clsx";
import { RadioGroup } from "@headlessui/react";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/20/solid";
import useSound from "use-sound";

import Sounds from "../../enums/sounds";
import { SoundContext } from "../../../../templates/Authenticated/Authenticated";
import {
  MultipleChoiceOptions,
  WrittenAnswerOptions,
} from "../../enums/answers";

interface MultipleChoiceRadioGroupProps {
  exerciseId: number;
  options: typeof MultipleChoiceOptions | typeof WrittenAnswerOptions;
  previousAnswer: string;
  registerAnswer: (exerciseId: number, answer: string) => void;
}

const MultipleChoiceRadioGroup: FC<MultipleChoiceRadioGroupProps> = ({
  exerciseId,
  options,
  previousAnswer,
  registerAnswer,
}) => {
  // Style the button based on wether it is selected or not
  function getButtonClassName(checked: boolean): string {
    if (!checked) {
      return "relative flex w-full cursor-pointer ring-inset items-center rounded-lg px-6 py-1 font-medium text-gray-800 shadow-sm ring-1 ring-gray-200 hover:cursor-pointer hover:ring-2 hover:ring-indigo-400 focus:outline-none sm:w-fit sm:px-4 sm:py-2";
    }
    return "relative flex w-full cursor-pointer ring-inset items-center rounded-lg px-6 py-1 font-medium shadow-sm hover:cursor-pointer hover:ring-2 focus:outline-none sm:w-fit sm:px-4 sm:py-2 hover:ring-indigo-400 text-indigo-900 ring-2 ring-indigo-400";
  }

  return (
    <RadioGroup className="w-full">
      <div className="grid w-full grid-cols-2 flex-col items-center gap-x-2 gap-y-2 sm:flex sm:flex-row sm:justify-start sm:gap-y-0 md:gap-x-3     ">
        {options.map((option) => (
          <RadioGroup.Option
            key={option.id}
            value={option.title}
            className={getButtonClassName(previousAnswer === option.title)}
            onClick={() => registerAnswer(exerciseId, option.title)}
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
  registerAnswer: (exerciseId: number, answer: string) => void;
  previousAnswer: string;
  nextExercise: () => void;
  moreThanOneExercise?: boolean;
}

const AnswerSection: FC<AnswerSectionProps> = ({
  isMultipleChoice,
  exerciseId,
  registerAnswer,
  previousAnswer,
  nextExercise,
  moreThanOneExercise,
}) => {
  // Sound Contexts
  const { soundEnabled } = useContext(SoundContext);
  const [soundSubmitted] = useSound(Sounds.EXERCISE_CORRECT, {
    volume: 0.25,
    soundEnabled: soundEnabled,
  });
  // Pick submit button color based on wether the exercise has been answered or not
  let buttonClass = "bg-gray-300 ring-gray-300"; // No answer
  if (previousAnswer !== null) {
    buttonClass =
      "bg-indigo-600 ring-indigo-600 cursor-pointer hover:bg-indigo-700 hover:ring-indigo-700";
  }

  return (
    <div className="flex flex-col gap-y-4 px-6 py-4">
      {/**Tell the student to self evaluate the answer if the exercise is a written one*/}
      {!isMultipleChoice && (
        <div className="sm:text-md text-sm font-medium text-gray-800 ">
          Autoavalia a tua resposta:
        </div>
      )}
      <div className="flex flex-col items-center justify-center gap-y-4 transition duration-200  ease-in-out sm:flex-row sm:justify-between">
        <MultipleChoiceRadioGroup
          key={exerciseId}
          exerciseId={exerciseId}
          options={
            isMultipleChoice ? MultipleChoiceOptions : WrittenAnswerOptions
          }
          previousAnswer={previousAnswer}
          registerAnswer={registerAnswer}
        />
        {moreThanOneExercise !== false && (
          <div className="flex w-full flex-col items-center gap-x-2 gap-y-2 sm:flex-row-reverse">
            <div
              className={clsx(
                "sm:text-md inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent px-2 py-1 text-sm font-semibold text-white shadow-sm ring-2 transition-all duration-150 ease-in-out sm:w-fit sm:px-4 sm:py-2",
                buttonClass,
              )}
              onClick={() => {
                // If the exercise is answered, move to the next exercise
                if (previousAnswer !== null) {
                  nextExercise();
                  soundSubmitted();
                }
              }}
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
