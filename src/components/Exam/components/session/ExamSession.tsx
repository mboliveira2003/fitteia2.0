import { FC, useEffect, useContext, useState, useMemo } from "react";
import {
  XMarkIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";

import ExamExerciseComponent from "../../../_common/exercises/ExamExercise";
import { SoundContext } from "../../../../templates/Authenticated/Authenticated";
import { ExamModalContext } from "./ExamModal";
import { submitExam as submitExamAPI } from "../../../../api/exams/exams";
import { Exam, SubmitExamBody } from "../../../../api/model";
import Timer from "../../../_common/visuals/Timer";
import LoadingCircle from "../../../_common/visuals/loading/LoadingCircle";
import LoadingExercise from "../../../_common/visuals/loading/LoadingExercise";
import ExamSessionNavigation from "./ExamSessionNavigation";

const ExamSession: FC = () => {
  // Get the exam info from the session storage
  const examInfo = useMemo(
    () => JSON.parse(sessionStorage.getItem("examInfo") || "null") as Exam,
    [],
  );

  // Function to go to a new page
  const navigateTo = useNavigate();

  // Function to scroll to top of the page
  const { onExamExerciseCompleted } = useContext(ExamModalContext);

  // State to store the current exercise
  const [currentExamExerciseIndex, setCurrentExamExerciseIndex] =
    useState<number>(0);
  // State to store the user answers
  const [answers, setAnswers] = useState<Map<number, string | null>>(() => {
    const initialAnswers = new Map<number, string | null>();
    examInfo.exercises.forEach((exercise) => {
      initialAnswers.set(exercise.exerciseId, null);
    });
    return initialAnswers;
  });

  // State to store the exam completion
  const [examCompleted, setExamCompleted] = useState<boolean>(false);

  // When a examExercise is completed, call the modal callback to scroll to the top of the page
  useEffect(() => {
    onExamExerciseCompleted();
  }, [currentExamExerciseIndex]);

  // Keeps track of wether all exercises have been answered or not
  useEffect(() => {
    const allAnswersNotNull = Array.from(answers.values()).every(
      (answer) => answer !== null,
    );
    if (allAnswersNotNull) {
      setExamCompleted(true);
    }
  }, [answers]);

  // Function to register a new answer
  const registerAnswer = (exerciseId: number, answer: string) => {
    // Register the new answer or update the existing one
    setAnswers((prev) => new Map(prev).set(exerciseId, answer));
  };

  // Function to move to the next exercise
  const nextExercise = () => {
    // Move to the next exercise
    if (currentExamExerciseIndex !== examInfo.exercises.length! - 1) {
      setCurrentExamExerciseIndex((prev) => prev! + 1);
    } else {
      setCurrentExamExerciseIndex(0);
    }
  };

  // Function to check if a exercise has been answered
  const isExerciseAnswered = (exerciseId: number) => {
    return answers.get(exerciseId) !== null;
  };

  // State to mimic isLoading
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);

  // Submit the exam and store the feedback on the session storage
  async function submitExam() {
    // Store the ending time on the session storage
    const endingTime = Date.now();
    sessionStorage.setItem("endingTime", JSON.stringify(endingTime));
    setWaitingResponse(true);

    const submitExamBody: SubmitExamBody = {
      examId: examInfo.examId!,
      answers: Array.from(answers.entries())
        .sort((a, b) => a[0] - b[0])
        .map(([, answer]) => answer!),
      timeElaped: endingTime - startingTime,
    };
      

    try {
      const examFeedback = await submitExamAPI(submitExamBody);

      // Store the feedback on the session storage
      sessionStorage.setItem("grade", JSON.stringify(examFeedback.data?.grade));
      sessionStorage.setItem(
        "gradeDistribution",
        JSON.stringify(examFeedback.data?.gradeDistribution),
      );
      const answersArray = Array.from(answers.values());
      sessionStorage.setItem("answers", JSON.stringify(answersArray));
    } catch (error) {
      console.log(error);
    }

    setWaitingResponse(false);
    // Navigate to the exam completed page
    navigateTo(`/examMode/exam/${examInfo.examId}/session/completed`);
  }

  // Sound context to enable or disable sound
  const { soundEnabled, setSoundEnabled } = useContext(SoundContext);

  // Store the starting time on the session storage
  const startingTime = useMemo(() => Date.now(), []);
  sessionStorage.setItem("startingTime", JSON.stringify(startingTime));
  // State to store the current time
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  // Update the current time every second
  useEffect(() => {
    setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
  }, []);

  if (!examInfo) {
    return <LoadingExercise />;
  }

  return (
    <div className="flex w-full max-w-screen-2xl flex-col items-center gap-y-6 ">
      <div className="flex w-full flex-row items-center justify-between gap-x-4 duration-300 animate-in fade-in slide-in-from-left-20">
        <div className="flex w-20 flex-row items-center gap-x-2 text-start text-gray-400 transition-all duration-200 ease-in-out">
          <Link to={`/examMode/exam/${examInfo.examId}/menu`}>
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
        <div className="hidden sm:block">
          <ExamSessionNavigation
            examExercises={examInfo.exercises}
            currentExamExerciseIndex={currentExamExerciseIndex}
            setCurrentExamExerciseIndex={setCurrentExamExerciseIndex}
            isExerciseAnswered={isExerciseAnswered}
          />
        </div>
        <div className="flex w-20 flex-row items-center justify-end text-end text-gray-400 transition-all duration-200 ease-in-out">
          <Timer startingTime={startingTime} currentTime={currentTime} />
        </div>
      </div>

      <ExamExerciseComponent
        exerciseId={examInfo.exercises[currentExamExerciseIndex].exerciseId}
        registerAnswer={registerAnswer}
        previousAnswer={
          answers.get(examInfo.exercises[currentExamExerciseIndex].exerciseId)!
        }
        nextExercise={nextExercise}
      />

      <div className="block w-full sm:hidden">
        <ExamSessionNavigation
          examExercises={examInfo.exercises}
          currentExamExerciseIndex={currentExamExerciseIndex}
          setCurrentExamExerciseIndex={setCurrentExamExerciseIndex}
          isExerciseAnswered={isExerciseAnswered}
        />
      </div>

      <div
        className={clsx(
          "sm:text-md inline-flex w-fit items-center justify-center gap-x-2 rounded-lg px-4 py-1 text-sm font-semibold text-white ring transition-all duration-200 ease-in-out sm:px-4 sm:py-2",
          examCompleted
            ? "bg-indigo-600 shadow-sm ring-indigo-600 hover:cursor-pointer hover:bg-indigo-700 hover:ring-indigo-700"
            : "bg-gray-300 ring-gray-300",
        )}
        onClick={() => {
          examCompleted && submitExam();
        }}
      >
        {waitingResponse ? (
          <LoadingCircle />
        ) : (
          <>
            Terminar Exame
            <ArrowRightStartOnRectangleIcon className=" h-5 w-5" />
          </>
        )}
      </div>
    </div>
  );
};

export default ExamSession;
