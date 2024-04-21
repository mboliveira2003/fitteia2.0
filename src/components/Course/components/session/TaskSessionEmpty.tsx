import { FC } from "react";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/20/solid";
import { Link, useParams} from "react-router-dom";

import frownFace from "../../../../assets/frown_3.png";

const TaskSessionEmpty: FC = () => {
  // Url params
  const { courseTopic } = useParams();
  // Function to navigate to a new page
  return (
    <div className="flex w-full flex-col items-center gap-y-4 duration-300 animate-in fade-in slide-in-from-left-40">
      <img
        className="h-auto w-80 px-20 py-10"
        aria-hidden="true"
        src={frownFace}
      />

      <h1 className="text-center text-xl font-medium tracking-tight text-gray-500 ">
        Ainda não existem tarefas neste subtópico...
      </h1>

      <Link to={`/examMode/course/${courseTopic}`} replace>
        <div className="sm:text-md inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm ring-2 ring-indigo-600 transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-indigo-700 hover:ring-indigo-700  sm:w-fit sm:px-4 sm:py-2">
          <ArrowLeftEndOnRectangleIcon className=" h-5 w-5" />
          Voltar
        </div>
      </Link>
    </div>
  );
};

export default TaskSessionEmpty;
