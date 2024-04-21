import { FC, useEffect, useContext, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import useSound from "use-sound";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/20/solid";

import Sounds from "../../../_common/enums/sounds";
import { SoundContext } from "../../../../templates/Authenticated/Authenticated";
import ProgressBar from "../../../_common/visuals/progress_bars/big_progress_bar";
import starImage from "/src/assets/star_1.png";

const ExerciseSessionCompleted: FC = () => {
  // Sound values
  const { soundEnabled } = useContext(SoundContext);
  const [soundCompleted] = useSound(Sounds.EXERCISE_COMPLETE, {
    volume: 0.25,
    soundEnabled: soundEnabled,
  });
  // Url params
  const { year, topic, subtopic } = useParams();

  // On render play the sound
  useEffect(() => {
    soundCompleted();
  }, [soundCompleted]);

  // Get the maximum streak from the session storage
  const maxStreak = useMemo(() => Number(sessionStorage.getItem("maxStreak") || 0), []);

  return (
    <div className="flex w-full flex-col items-center gap-y-8 duration-300 animate-in fade-in slide-in-from-left-40">
      <img
        className="h-auto w-80 rotate-180 px-20 py-10 delay-300 duration-500 animate-in"
        aria-hidden="true"
        src={starImage}
      />

      <div className="flex w-full flex-col items-center gap-y-4">
        <div className="flex w-full flex-col items-center gap-y-2">
          <h1 className="hidden text-4xl font-semibold text-indigo-600 sm:block">
            100%
          </h1>
          <ProgressBar percentage={100} />
        </div>

        <h1 className="text-center text-xl font-medium tracking-tight text-gray-500 ">
          Completaste todos os exercícios desta sessão!
        </h1>

        <p className="text-gray-400 text-center text-md -mt-3 tracking-tight">Acertaste <span className="text-indigo-700 font-medium">{maxStreak}</span> exercícios seguidos.</p>
      </div>

      <Link to={`/exercises/${year}/${topic}/${subtopic}`} replace>
        <div className="sm:text-md inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm ring-2 ring-indigo-600 transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-indigo-700 hover:ring-indigo-700  sm:w-fit sm:px-4 sm:py-2">
          <ArrowLeftEndOnRectangleIcon className=" h-5 w-5" />
          Voltar
        </div>
      </Link>
    </div>
  );
};

export default ExerciseSessionCompleted;
