import { FC, useState, useEffect } from "react";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

import { Exercise } from "../../../api/model";
import { useGetExercise } from "../../../api/exercise-completion/exercise-completion";
import DifficultyBadge from "../visuals/badges/DifficultyBadge";
import LoadingExercise from "../visuals/loading/LoadingExercise";
import TipsRadioGroup from "./components/TipsRadioGroup";
import ImageZoomContainer from "./components/ImageZoomContainer";
import AnswerSection from "./components/ExamAnswerSection";

interface ExamExerciseProps {
  exerciseId: number;
  registerAnswer: (exerciseId: number, answer: string) => void;
  previousAnswer: string;
  nextExercise: () => void;
  moreThanOneExercise?: boolean;
}

const ExamExerciseComponent: FC<ExamExerciseProps> = ({
  exerciseId,
  registerAnswer,
  previousAnswer,
  nextExercise,
  moreThanOneExercise
}) => {
  // State to store the number of revealed tips
  const [revealedTips, setRevealedTips] = useState<number>(0);
  // State to store the exercise info from the API
  const [exerciseInfo, setThisExercise] = useState<Exercise | null>(null);

  // Call API to know all exercise info
  const { refetch: getExercise, isLoading } = useGetExercise(
    {
      exerciseId,
    },
    {
      query: {
        enabled: false,
        refetchOnWindowFocus: false,
        cacheTime: 1000, // 1 second
        staleTime: 1000, // 1 second

        onSuccess: (data) => {
          setThisExercise(data.data);
        },
      },
    },
  );

  // When the exerciseId changes, call the API to get the new exercise info and reset the other states
  useEffect(() => {
    getExercise();
    setRevealedTips(0);
  }, [exerciseId]);

  // Function to copy the exercise id to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(String(exerciseId) ?? "");
  };

  // If the exercise is loading show the loading animation
  if (isLoading || exerciseInfo === null) {
    return (
      <div
        id="exercise-animation"
        className="flex w-full flex-col divide-y overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-gray-200 duration-300 animate-in fade-in slide-in-from-left-10"
      >
        <LoadingExercise />
      </div>
    );
  }

  return (
    <div
      id="exercise-animation"
      className="flex w-full flex-col divide-y overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-gray-200 duration-300 animate-in fade-in slide-in-from-left-10"
    >
      {/* Exercise Header */}
      <div className="flex  w-full flex-row items-center justify-between px-6 py-4">
        <div className="flex flex-row items-center gap-x-3">
          {/**If the exercise has been answered show a check sign*/}
          {previousAnswer !== null && (
            <div className="flex flex-row items-center duration-300 animate-in fade-in slide-in-from-left-6">
              <CheckCircleIcon className="h-5 w-5 text-indigo-600" />
            </div>
          )}
          {/**Different conditions to display animation when check icon appears*/}
          {previousAnswer === null && (
            <div className="items flex flex-row items-center gap-x-2 rounded-md px-2 py-1 ring-1 ring-gray-200">
              <h1 className="text-md font-semibold text-indigo-700  md:block">
                {exerciseInfo?.exerciseId}
              </h1>

              <ClipboardDocumentIcon
                className="h-5 w-5 text-gray-300 hover:cursor-pointer hover:text-gray-400 md:block"
                onClick={copyToClipboard}
              ></ClipboardDocumentIcon>
            </div>
          )}
          {previousAnswer !== null && (
            <div className="items flex items-center flex-row gap-x-2 duration-300 animate-in slide-in-from-left-6 rounded-md px-2 py-1 ring-1 ring-gray-200">
              <h1 className="text-md font-semibold text-indigo-700  md:block">
                {exerciseInfo?.exerciseId}
              </h1>

              <ClipboardDocumentIcon
                className="h-5 w-5 text-gray-300 hover:cursor-pointer hover:text-gray-400 md:block"
                onClick={copyToClipboard}
              ></ClipboardDocumentIcon>
            </div>
          )}
        </div>
        <div className="flex flex-row items-center gap-x-1">
          <DifficultyBadge difficulty={exerciseInfo?.difficulty!} />
        </div>
      </div>

      {/* Exercise Image */}
      <div className="relative">
        <ImageZoomContainer>
          <img
            src={exerciseInfo?.image}
            className="mx-auto min-h-28 w-full px-4 py-20 sm:px-10 sm:py-8"
          />
        </ImageZoomContainer>
      </div>

      {/*Tips will only be shown in written exercises */}
      {!exerciseInfo?.isMultipleChoice && (
        <TipsRadioGroup
          tips={exerciseInfo?.tips ?? []}
          revealedTips={revealedTips}
          setRevealedTips={setRevealedTips}
        />
      )}

      {/* Answer Section */}
      <AnswerSection
        isMultipleChoice={exerciseInfo?.isMultipleChoice!}
        exerciseId={exerciseId}
        registerAnswer={registerAnswer}
        previousAnswer={previousAnswer}
        nextExercise={nextExercise}
        moreThanOneExercise={moreThanOneExercise}
      />
    </div>
  );
};

export default ExamExerciseComponent;
export type { ExamExerciseProps };
