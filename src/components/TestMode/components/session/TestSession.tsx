import { FC, useEffect, useContext, useState, useMemo } from "react";
import {
  XMarkIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";

import TestExerciseComponent from "../../../_common/exercises/ExamExercise";
import { SoundContext } from "../../../../templates/Authenticated/Authenticated";
import { TestModalContext } from "./TestModal";
import { submitTest as submitTestAPI } from "../../../../api/tests/tests";
import {
  TestInfo,
  SubmitTestBody,
  ExerciseBasicInfo,
} from "../../../../api/model";
import Timer from "../../../_common/visuals/Timer";
import LoadingCircle from "../../../_common/visuals/loading/LoadingCircle";
import LoadingExercise from "../../../_common/visuals/loading/LoadingExercise";
import TestSessionNavigation from "./TestSessionNavigation";

const TestSession: FC = () => {
  // Get the test info from the session storage
  const testInfo = useMemo(
    () => JSON.parse(sessionStorage.getItem("testInfo") || "null") as TestInfo,
    [],
  );

  // If there is only one exercise, the navigation bar and the next should not be rendered
  const moreThanOneExercise = testInfo.exercises!.length > 1;

  // Function to go to a new page
  const navigateTo = useNavigate();

  // Function to scroll to top of the page
  const { onTestExerciseCompleted } = useContext(TestModalContext);

  // State to store the current exercise
  const [currentTestExerciseIndex, setCurrentTestExerciseIndex] =
    useState<number>(0);

  // State to store the user answers
  const [answers, setAnswers] = useState<Map<number, string | null>>(() => {
    const initialAnswers = new Map<number, string | null>();
    testInfo.exercises!.forEach((exercise) => {
      initialAnswers.set(exercise.exerciseId!, null);
    });
    return initialAnswers;
  });

  // State to store the test completion
  const [testCompleted, setTestCompleted] = useState<boolean>(false);

  // When a testExercise is completed, call the modal callback to scroll to the top of the page
  useEffect(() => {
    onTestExerciseCompleted();
  }, [currentTestExerciseIndex]);

  // Keeps track of wether all exercises have been answered or not
  useEffect(() => {
    const allAnswersNotNull = Array.from(answers.values()).every(
      (answer) => answer !== null,
    );
    if (allAnswersNotNull) {
      setTestCompleted(true);
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
    if (currentTestExerciseIndex !== testInfo.exercises!.length! - 1) {
      setCurrentTestExerciseIndex((prev) => prev! + 1);
    } else {
      setCurrentTestExerciseIndex(0);
    }
  };

  // Function to check if a exercise has been answered
  const isExerciseAnswered = (exerciseId: number) => {
    return answers.get(exerciseId) !== null;
  };

  // State to mimic isLoading
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);

  // Submit the test and store the feedback on the session storage
  async function submitTest() {
    // Store the ending time on the session storage
    const endingTime = Date.now();
    sessionStorage.setItem("endingTime", JSON.stringify(endingTime));
    setWaitingResponse(true);

    const submitTestBody: SubmitTestBody = {
      testId: testInfo.testId!,
      answers: Array.from(answers.entries())
        .sort((a, b) => a[0] - b[0])
        .map(([, answer]) => answer!),
      timeElapsed: endingTime - startingTime,
    };

    try {
      const testFeedback = await submitTestAPI(submitTestBody);

      // Store the feedback on the session storage
      sessionStorage.setItem("testFeedback", JSON.stringify(testFeedback.data));
    } catch (error) {
      console.log(error);
    }

    setWaitingResponse(false);
    // Navigate to the test completed page
    navigateTo(`/test-mode/${testInfo.testEventId}/session/completed`);
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

  if (!testInfo) {
    return <LoadingExercise />;
  }

  return (
    <div className="flex w-full max-w-screen-2xl flex-col items-center gap-y-6 relative ">
      {/**Header*/}
      <div className="flex w-full flex-row items-center justify-between gap-x-4 duration-300 animate-in fade-in slide-in-from-left-20">
        <div className="flex w-20 flex-row items-center gap-x-2 text-start text-gray-400 transition-all duration-200 ease-in-out">
          <Link to={`/test-mode/${testInfo.testEventId}/menu`}>
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

        {/**If there's only one exercise don't show the navigation*/}
        {moreThanOneExercise && (
          <div className="hidden sm:block">
            <TestSessionNavigation
              testExercises={testInfo.exercises as ExerciseBasicInfo[]}
              currentTestExerciseIndex={currentTestExerciseIndex}
              setCurrentTestExerciseIndex={setCurrentTestExerciseIndex}
              isExerciseAnswered={isExerciseAnswered}
            />
          </div>
        )}
        <div className="flex w-20 flex-row items-center justify-end text-end text-gray-400 transition-all duration-200 ease-in-out">
          <Timer startingTime={startingTime} currentTime={currentTime} />
        </div>
      </div>

      <TestExerciseComponent
        exerciseId={testInfo.exercises![currentTestExerciseIndex].exerciseId!}
        registerAnswer={registerAnswer}
        previousAnswer={
          answers.get(
            testInfo.exercises![currentTestExerciseIndex].exerciseId!,
          )!
        }
        nextExercise={nextExercise}
        moreThanOneExercise={moreThanOneExercise}
      />

      {/**If there's only one exercise don't show the navigation*/}
      {moreThanOneExercise && (
        <div className="block w-full sm:hidden">
          <TestSessionNavigation
            testExercises={testInfo.exercises as ExerciseBasicInfo[]}
            currentTestExerciseIndex={currentTestExerciseIndex}
            setCurrentTestExerciseIndex={setCurrentTestExerciseIndex}
            isExerciseAnswered={isExerciseAnswered}
          />
        </div>
      )}

      {/*Test Submission Button*/}
      <div
        className={clsx(
          "sm:text-md inline-flex rounded-lg w-fit items-center justify-center gap-x-2 px-4 py-1 text-sm font-semibold text-white ring transition-all duration-200 ease-in-out sm:px-4 sm:py-2",
          testCompleted
            ? "bg-indigo-600 shadow-sm ring-indigo-600 hover:cursor-pointer hover:bg-indigo-700 hover:ring-indigo-700"
            : "bg-gray-300 ring-gray-300",
        )}
        onClick={() => {
          testCompleted && submitTest();
        }}
      >
        {waitingResponse ? (
          <LoadingCircle />
        ) : (
          <>
            Submeter
            <ArrowRightStartOnRectangleIcon className=" h-5 w-5" />
          </>
        )}
      </div>
    </div>
  );
};

export default TestSession;
