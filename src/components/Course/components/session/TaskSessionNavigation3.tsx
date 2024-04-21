import { FC, useState } from "react";
import { PencilSquareIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { Transition } from "@headlessui/react";
import clsx from "clsx";

import { Task } from "../../../../api/model";

interface TaskSessionRadioGroupProps {
  sessionTasks: Task[];
  currentTaskIndex: number | null;
  setCurrentTaskIndex: (index: number) => void;
  firstIncompleteTaskIndex: number;
}

const TaskSessionRadioGroup2: FC<TaskSessionRadioGroupProps> = ({
  sessionTasks,
  currentTaskIndex,
  setCurrentTaskIndex,
  firstIncompleteTaskIndex,
}) => {
  // State to store if the navigation is open or not
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  // Decides if a task should be clickable or not
  const isTaskClickable = (index: number) => {
    // If all tasks are done, all tasks are clickable
    if (
      firstIncompleteTaskIndex === -1 &&
      index > -1 &&
      index < sessionTasks.length
    ) {
      return true;
    }
    // If the index is out of bounds, it is not clickable
    if (index < 0 || index >= sessionTasks.length) {
      return false;
    }
    // If the index is the first incomplete task, it is clickable
    if (index === firstIncompleteTaskIndex) {
      return true;
    }
    // If the task is done and the index is smaller than the first incomplete task, it is clickable
    if (sessionTasks[index].isDone && index < firstIncompleteTaskIndex) {
      return true;
    }
    return false;
  };

  return (
    <div className="relative flex flex-row items-center divide-x divide-gray-200 rounded-lg bg-white shadow-sm shadow-indigo-400/70 ring-1 ring-gray-200 transition-all duration-200 ease-in-out hover:shadow-indigo-400">
      <div className="flex flex-row items-center justify-center gap-x-2 rounded-lg px-3 py-1.5">
        {sessionTasks[currentTaskIndex!].contentType === 1 ? (
          <VideoCameraIcon className="h-4 w-4 text-indigo-700 sm:h-5 sm:w-5 " />
        ) : (
          <PencilSquareIcon className="h-4 w-4 text-gray-600 sm:h-5 sm:w-5" />
        )}
        <h1 className="sm:text-md text-sm font-medium whitespace-nowrap text-gray-600 sm:hidden">
          {sessionTasks[currentTaskIndex!].taskName.length > 20
            ? `${sessionTasks[currentTaskIndex!].taskName.slice(0, 16)}...`
            : sessionTasks[currentTaskIndex!].taskName} ({currentTaskIndex! + 1}/{sessionTasks.length})
        </h1>
        <h1 className="sm:text-md text-sm font-medium whitespace-nowrap text-gray-600 sm:block hidden">
          {sessionTasks[currentTaskIndex!].taskName} ({currentTaskIndex! + 1}/{sessionTasks.length})
        </h1>
      </div>
      <div
        onClick={() => setIsNavigationOpen(!isNavigationOpen)}
        className="flex cursor-pointer flex-row items-center justify-center gap-x-2 p-1.5 text-gray-600 transition-all duration-200 ease-in-out hover:text-gray-600 sm:p-2 sm:text-gray-400"
      >
        {!isNavigationOpen ? (
          <ChevronDownIcon className=" h-5 w-5" />
        ) : (
          <ChevronUpIcon className=" h-5 w-5" />
        )}
      </div>
      <Transition
        as="div"
        className="absolute left-0 right-0 top-full z-30 mt-4 h-fit max-h-44 min-w-fit overflow-y-auto rounded-lg bg-white p-2 shadow shadow-indigo-400/70 ring-1 ring-gray-200 sm:max-h-96"
        show={isNavigationOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <div className="flex flex-col gap-y-3">
          <div className="flex w-full flex-col items-center justify-center gap-y-3">
            {sessionTasks.map((task, index) => (
              <div
                key={task.taskId}
                className={clsx(
                  " flex w-full flex-row items-center justify-center rounded-lg px-2 py-1 text-gray-400 transition-all duration-300 ease-in-out",
                  index === currentTaskIndex &&
                    "bg-indigo-50 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-700",
                  task.isDone &&
                    "cursor-pointer text-gray-700 hover:bg-gray-50 hover:text-indigo-700",
                  isTaskClickable(index) &&
                    " cursor-pointer text-gray-700 hover:bg-gray-50 hover:text-indigo-700",
                )}
                onClick={() => {
                  isTaskClickable(index) && setCurrentTaskIndex(index);
                }}
              >
                <div className="flex w-full text-center flex-row items-center justify-start gap-x-4 px-1 sm:px-2">
                  <p className=" flex flex-row items-center justify-center text-center font-semibold">
                    {task.contentType === 1 ? (
                      <VideoCameraIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <PencilSquareIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </p>
                  <p className="sm:text-md flex flex-row items-center justify-center text-start text-sm font-semibold">
                    {task.taskName} ({index+1}/{sessionTasks.length})
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default TaskSessionRadioGroup2;
