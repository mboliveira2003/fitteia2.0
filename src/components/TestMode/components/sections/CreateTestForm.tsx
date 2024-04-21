import { FC, ReactElement, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreateTestBody } from "../../../../api/model";
import { Switch } from "@headlessui/react";
import clsx from "clsx";

import { createTest } from "../../../../api/tests/tests";

const CreateTestForm: FC = (): ReactElement => {
  // Get the testId from the URL
  const { testId } = useParams();

  // Function to navigate to a new page
  const navigateTo = useNavigate();
  // State to store the difficulty
  const [difficulty, setDifficulty] = useState<number | null>(null);
  // State to store the question type
  const [questionType, setQuestionType] = useState<number | null>(null);
  // State to store the number of exercises
  const [numberOfExercises, setNumberOfExercises] = useState<number>(10);

  // If true, only exam exercises will be included
  const [ExamExercisesEnabled, setExamExercisesEnabled] = useState(false);

  // State to store the percentage alert popup visibility
  const [percentageAlertVisible, setPercentageAlertVisible] = useState(false);
  // State to store the subtopics alert popup visibility
  const [subtopicsAlertVisible, setSubtopicsAlertVisible] = useState(false);

  useEffect(() => {
    // Wait 3 seconds before hiding the alert
    const timer = setTimeout(() => {
      setPercentageAlertVisible(false);
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, [percentageAlertVisible]);

  useEffect(() => {
    // Wait 3 seconds before hiding the alert
    const timer = setTimeout(() => {
      setSubtopicsAlertVisible(false);
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, [subtopicsAlertVisible]);

  // Function to handle the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const createTestBody: CreateTestBody = {
      testEventId: Number(testId),
      difficulty: difficulty!,
      questionType: questionType!,
      numberOfExercises: numberOfExercises,
      isExam: ExamExercisesEnabled,
    };

    try {
      const response = await createTest(createTestBody);
      console.log(response);
      if (response.data.exercises!.length === 0) {
        setSubtopicsAlertVisible(true);
        return;
      }
      sessionStorage.setItem("testInfo", JSON.stringify(response.data));
      navigateTo(`/test-mode/${testId}/session`, { replace: true });
    } catch (error) {
      console.log(error);
      setSubtopicsAlertVisible(true);
    }
  };

  return (
    <div className=" mb-10 min-h-screen w-full duration-300 animate-in fade-in slide-in-from-left-10 sm:mx-auto lg:max-w-2xl">
      <form
        className="relative mt-4 space-y-4 md:space-y-5 lg:mt-5"
        onSubmit={handleSubmit}
      >
        {/**Dificulty selection */}
        <div>
          <label
            htmlFor="Dificuldade"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Dificuldade
          </label>
          <ul className="divide-x-gray-200 flex w-full items-center divide-x rounded-lg bg-white text-sm font-medium text-gray-900 ring-1 ring-gray-200 ">
            <li className="w-full ">
              <div className="flex items-center gap-x-3 ps-3">
                <input
                  type="radio"
                  value=""
                  name="difficulty"
                  onChange={() => setDifficulty(1)}
                  required
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                />
                <label
                  htmlFor="10º Ano"
                  className="text-md w-full py-3 font-medium text-gray-900 "
                >
                  Fácil
                </label>
              </div>
            </li>
            <li className="w-full ">
              <div className="flex items-center gap-x-3 ps-3">
                <input
                  type="radio"
                  value=""
                  required
                  name="difficulty"
                  onChange={() => setDifficulty(2)}
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                />
                <label
                  htmlFor="11º Ano"
                  className="text-md w-full py-3 font-medium text-gray-900"
                >
                  Médio
                </label>
              </div>
            </li>
            <li className="w-full ">
              <div className="flex items-center gap-x-3 ps-3">
                <input
                  type="radio"
                  value=""
                  name="difficulty"
                  onChange={() => setDifficulty(3)}
                  required
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                />
                <label
                  htmlFor="12º Ano"
                  className="text-md w-full py-3 font-medium text-gray-900"
                >
                  Difícil
                </label>
              </div>
            </li>
          </ul>
        </div>

        {/*Exercise Number Selection*/}
        <div className="relative">
          <label
            htmlFor="Número de Exercícios"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Número de Exercícios
          </label>
          <div className="flex flex-row items-center gap-x-2">
            <input
              type="range"
              min="1"
              max="20"
              value={numberOfExercises}
              onChange={(event) =>
                setNumberOfExercises(Number(event.target.value))
              }
              required
              step="1"
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-indigo-600  dark:bg-gray-700"
            />
            <span className="w-4 text-end text-sm text-gray-500 dark:text-gray-400">
              {numberOfExercises}
            </span>
          </div>
        </div>

        {/*Question type selection */}
        <div>
          <label
            htmlFor="Tipo de Exercício"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Tipo de Exercício
          </label>
          <ul className="divide-x-gray-200 flex w-full flex-col items-center gap-x-0 rounded-lg text-sm font-medium text-gray-900 ring-gray-200 sm:flex-row sm:divide-x sm:bg-white sm:ring-1 ">
            <li className="w-full ">
              <div className="flex items-center gap-x-3 ps-3">
                <input
                  type="radio"
                  value=""
                  name="exercise-type"
                  onChange={() => setQuestionType(0)}
                  required
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                />
                <label
                  htmlFor="Resposta Aberta"
                  className="text-md w-full py-3 font-medium text-gray-900 "
                >
                  Resposta Aberta
                </label>
              </div>
            </li>
            <li className="w-full ">
              <div className="flex items-center gap-x-3 ps-3">
                <input
                  type="radio"
                  value=""
                  required
                  name="exercise-type"
                  onChange={() => setQuestionType(1)}
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                />
                <label
                  htmlFor="Escolha Múltipla"
                  className="text-md w-full py-3 font-medium text-gray-900"
                >
                  Escolha Múltipla
                </label>
              </div>
            </li>
            <li className="h-full w-full">
              <div className="flex items-center gap-x-3 ps-3">
                <input
                  type="radio"
                  value=""
                  name="exercise-type"
                  onChange={() => setQuestionType(2)}
                  required
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                />
                <label
                  htmlFor="Todos"
                  className="text-md w-full py-3 font-medium text-gray-900"
                >
                  Todos
                </label>
              </div>
            </li>
          </ul>
        </div>

        {/*Exam Exercises Only Switch*/}
        <Switch.Group
          as="div"
          className="pt- flex flex-row items-center justify-center pb-5 sm:py-4"
        >
          <Switch
            checked={ExamExercisesEnabled}
            onChange={setExamExercisesEnabled}
            className={clsx(
              ExamExercisesEnabled ? "bg-indigo-600" : "bg-gray-200",
              "relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 sm:h-6 sm:w-11",
            )}
          >
            <span
              aria-hidden="true"
              className={clsx(
                ExamExercisesEnabled
                  ? "translate-x-4 sm:translate-x-5"
                  : "translate-x-0",
                "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out sm:h-5 sm:w-5",
              )}
            />
          </Switch>
          <Switch.Label as="span" className="ml-3 text-sm ">
            <span className="hidden font-medium text-gray-900 sm:block">
              Incluir apenas exercícos de Exame
            </span>
            <span className="font-medium text-gray-900 sm:hidden">
              Apenas exercícos de Exame
            </span>
          </Switch.Label>
        </Switch.Group>

        {/*Submit Button*/}
        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-indigo-700 dark:hover:bg-indigo-600 dark:focus:ring-indigo-800"
        >
          Criar Teste
        </button>

        {/**Alerts */}
        {subtopicsAlertVisible && (
          <div className="absolute bottom-14 left-0 right-0 mx-auto flex w-fit flex-col items-center justify-center gap-y-1 rounded-md bg-indigo-50 px-4 py-2 text-center text-indigo-700 shadow-lg ring-1 ring-indigo-200 duration-300 animate-in fade-in slide-in-from-bottom-10">
            <p className="hidden font-medium sm:block">
              Não há exercícios suficientes para criar um teste!
            </p>
            <p className="font-medium sm:hidden">Exercícios insuficientes!</p>
            <p className="text-sm text-indigo-600">
              Modifica os parâmetros e tenta novamente.
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateTestForm;
