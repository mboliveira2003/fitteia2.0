import { FC, useEffect, useContext } from "react";
import {
  DocumentMagnifyingGlassIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/20/solid";
import { Link, useParams } from "react-router-dom";
import useSound from "use-sound";

import Timer from "../../../_common/visuals/Timer";
import Sounds from "../../../_common/enums/sounds";
import { SoundContext } from "../../../../templates/Authenticated/Authenticated";
import starImage from "/src/assets/star_1.png";

const TestSessionCompleted: FC = () => {
  // Get the testId from the URL
  const { testId } = useParams();
  // Get the starting and ending time from the session storage
  const startingTime = JSON.parse(
    sessionStorage.getItem("startingTime") || "null",
  ) as number;
  const endingTime = JSON.parse(
    sessionStorage.getItem("endingTime") || "null",
  ) as number;

  // Sound state
  const { soundEnabled } = useContext(SoundContext);
  const [soundCompleted] = useSound(Sounds.EXERCISE_COMPLETE, {
    volume: 0.25,
    soundEnabled: soundEnabled,
  });

  // Play the sound when the component mounts
  useEffect(() => {
    soundCompleted();
  }, [soundCompleted]);

  return (
    <div className="flex w-full flex-col items-center gap-y-8 duration-300 animate-in fade-in slide-in-from-left-40 sm:gap-y-10">
      
      {/**Star Image*/}
      <img
        className="h-auto w-80 rotate-180 px-20 py-10 delay-300 duration-500 animate-in"
        aria-hidden="true"
        src={starImage}
      />

      <div className="flex w-full flex-col items-center gap-y-4">
        <h1 className="text-center text-3xl font-medium tracking-tight text-gray-700 ">
          Teste concluído!
        </h1>
        <div className="flex flex-col items-center justify-center gap-x-1 text-center text-xl font-medium tracking-tight text-gray-500 ">
          <p>Acabaste o teste em</p>
          <Timer startingTime={startingTime} currentTime={endingTime} />
        </div>
      </div>

      {/**Navigation Options*/}
      <div className="flex w-full flex-col items-center gap-x-3 gap-y-2 pb-20 sm:w-fit sm:flex-row">
        <Link
          to={`/test-mode/${testId}/review`}
          className="w-full sm:w-fit"
          replace
        >
          <div className="sm:text-md inline-flex w-full items-center justify-center gap-x-1 rounded-lg border border-transparent bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm ring-1 ring-indigo-600 transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-indigo-700 hover:ring-indigo-700 sm:w-fit  sm:gap-x-2 sm:px-4 sm:py-2">
            <DocumentMagnifyingGlassIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            Rever
          </div>
        </Link>

        <Link
          to={`/test-mode/${testId}/results`}
          className="w-full sm:w-fit"
          replace
        >
          <div className="sm:text-md inline-flex w-full items-center justify-center gap-x-1 rounded-lg border border-transparent bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm ring-1 ring-indigo-600 transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-indigo-700 hover:ring-indigo-700 sm:w-fit  sm:gap-x-2 sm:px-4 sm:py-2">
            <NewspaperIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            Relatório
          </div>
        </Link>

        <Link
          to={`/test-mode/${testId}/menu`}
          className="w-full sm:w-fit"
          replace
        >
          <div className="sm:text-md inline-flex w-full items-center justify-center gap-x-1 rounded-lg border border-transparent bg-white px-2 py-1 text-sm font-semibold text-indigo-700 shadow-sm ring-1 ring-indigo-700 transition-all duration-200 ease-in-out hover:cursor-pointer  hover:bg-indigo-50 hover:text-indigo-700 sm:w-fit sm:gap-x-2 sm:px-4 sm:py-2">
            <ArrowLeftEndOnRectangleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            Voltar
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TestSessionCompleted;
