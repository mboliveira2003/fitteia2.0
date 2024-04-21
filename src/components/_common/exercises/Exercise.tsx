import { FC, useState, useEffect, useContext } from "react";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import useSound from "use-sound";
import {
  Exercise,
  SubmitExerciseBody,
  SubmitExerciseParams,
} from "../../../api/model";
import {
  useGetExercise,
  submitExercise as submitExerciseAPI,
} from "../../../api/exercise-completion/exercise-completion";

import ExamBadge from "../visuals/badges/ExamBadge";
import DifficultyBadge from "../visuals/badges/DifficultyBadge";
import Sounds from "../enums/sounds";
import { SoundContext } from "../../../templates/Authenticated/Authenticated";
import LoadingExercise from "../visuals/loading/LoadingExercise";
import AnswerFeedbackState from "../enums/feedback";
import TipsRadioGroup from "./components/TipsRadioGroup";
import ImageZoomContainer from "./components/ImageZoomContainer";
import AnswerSection from "./components/AnswerSection";

interface ExerciseProps {
  exerciseId: number;
  nextExercise: () => void;
  increaseStreak: () => void;
  resetStreak: () => void;
}

const ExerciseComponent: FC<ExerciseProps> = ({ exerciseId, nextExercise, increaseStreak, resetStreak }) => {
  // States to store the curent answer, its feedback state and the number of revealed tips
  const [feedbackState, setFeedbackState] = useState<AnswerFeedbackState>(
    AnswerFeedbackState.NONE,
  );
  const [answer, setAnswer] = useState<string>("");
  const [revealedTips, setRevealedTips] = useState<number>(0);
  // State to store the exercise exetensive info fetched from the API
  const [exerciseInfo, setThisExercise] = useState<Exercise | null>(null);
  // Sound context
  const { soundEnabled } = useContext(SoundContext);

  const [soundCorrect] = useSound(Sounds.EXERCISE_CORRECT, {
    volume: 0.25,
    soundEnabled: soundEnabled,
  });
  const [soundWrong] = useSound(Sounds.EXERCISE_WRONG, {
    volume: 0.25,
    soundEnabled: soundEnabled,
  });

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

  // When the exerciseId changes, fetch the new exercise info and reset all states
  useEffect(() => {
    getExercise();
    setFeedbackState(AnswerFeedbackState.NONE);
    setAnswer("");
    setRevealedTips(0);
  }, [exerciseId]);

  // Function to handle a correct and incorrect answers
  function handleCorrectAnswer() {
    soundCorrect();
    increaseStreak();
    setFeedbackState(AnswerFeedbackState.CORRECT);
    // Wait while the correct animation plays, reset all states and move to the next exercise
    setTimeout(() => {
      setFeedbackState(AnswerFeedbackState.NONE);
      setAnswer("");
      nextExercise();
    }, 1000);
  }
  function handleWrongAnswer() {
    soundWrong();
    resetStreak();
    setFeedbackState(AnswerFeedbackState.WRONG);
    // Wait while the wrong animation plays, reset all states.
    setTimeout(() => {
      setFeedbackState(AnswerFeedbackState.NONE);
      setAnswer("");
      //  Move to the next exercise only if it's a written one
      if (!exerciseInfo?.isMultipleChoice) {
        nextExercise();
      }
    }, 1000);
  }

  // Function to submit the answer to the API and get the feedback
  async function submitAnswer(answer: string) {
    if (answer === "" || feedbackState !== AnswerFeedbackState.NONE) return;

    let isCorrect: boolean = false;
    if (exerciseInfo?.isMultipleChoice!) {
      // If the exercise is multiple choice, check if the answer is correct
      isCorrect = exerciseInfo?.answer === answer;
    }
    if (!exerciseInfo?.isMultipleChoice) {
      // If the exercise is written, check if the answer is correct or sufficient
      isCorrect = answer === "Correta" || answer === "Suficiente";
    }

    const submitExerciseBody: SubmitExerciseBody = {
      answer,
      numberHints: revealedTips,
    };
    const submitExerciseParams: SubmitExerciseParams = {
      exerciseId,
    };

    try {
      const response = await submitExerciseAPI(
        submitExerciseBody,
        submitExerciseParams,
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    // After submitting the answer, handle the feedback
    isCorrect ? handleCorrectAnswer() : handleWrongAnswer();
  }

  // Function to copy the exercise id to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(String(exerciseId) ?? "");
  };

  // If the exercise info is not fetched yet, show the loading animation
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
        <div className="flex flex-row items-center gap-x-2 sm:gap-x-3">
          <div className="items flex flex-row items-center gap-x-2 rounded-md px-2 py-1 ring-1 ring-gray-200">
            <h1 className="text-md font-semibold text-indigo-700 md:block">
              {exerciseInfo?.exerciseId}
            </h1>

            <ClipboardDocumentIcon
              className=" h-5 w-5 text-gray-300 hover:cursor-pointer hover:text-gray-400 md:block"
              onClick={copyToClipboard}
            ></ClipboardDocumentIcon>
          </div>
          {exerciseInfo?.isDone && (
            <div className="flex flex-row items-center rounded-md bg-transparent p-0 sm:gap-x-2 lg:bg-green-50 lg:px-4 lg:py-2">
              <CheckCircleIcon className="h-5 w-5 text-green-400" />
              <p className="hidden text-sm text-green-800 lg:block">
                Já completaste este exercício anteriormente.
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-row items-center gap-x-1">
          <DifficultyBadge difficulty={exerciseInfo?.difficulty!} />
          {/*{exercise?.exam && (*/}
          <ExamBadge />
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

      {/* Exercise Tips */}
      <TipsRadioGroup
        tips={exerciseInfo?.tips ?? []}
        revealedTips={revealedTips}
        setRevealedTips={setRevealedTips}
      />

      {/* Answer Section */}
      <AnswerSection // Multiple Choice
        isMultipleChoice={exerciseInfo?.isMultipleChoice!}
        exerciseId={exerciseId}
        answer={answer}
        setAnswer={setAnswer}
        feedbackState={feedbackState}
        submitAnswer={submitAnswer}
      />
    </div>
  );
};

export default ExerciseComponent;
export type { ExerciseProps };
