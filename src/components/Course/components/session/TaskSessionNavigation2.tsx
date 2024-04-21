import { FC, useState } from "react";
import { PencilSquareIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";

import { Task } from "../../../../api/model";

// Crate some test sessiontasks
const sessionTasks2: Task[] = [
  {
    taskId: 1,
    contentType: 1,
    isDone: false,
    taskName: "Vídeo 1",
    content: "https://www.youtube.com/watch?v=9bZkp7q19f0",
  },
  {
    taskId: 2,
    contentType: 2,
    isDone: false,
    taskName: "Exercício 2",
    content: "https://www.youtube.com/watch?v=9bZkp7q19f0",
  },
  {
    taskId: 3,
    contentType: 1,
    isDone: false,
    taskName: "Vídeo 3",
    content: "https://www.youtube.com/watch?v=9bZkp7q19f0",
  },
  {
    taskId: 4,
    contentType: 2,
    isDone: false,
    taskName: "Exercício 4",
    content: "https://www.youtube.com/watch?v=9bZkp7q19f0",
  },
];

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

  // Create a state to keep track of when the menu is open or not
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-0 left-0 top-0 z-50 w-fit">
        <div className="relative w-full">
        <Menu>
          {({ open }: { open: boolean }) => (
            setIsMenuOpen(open),
            <div className="flex h-full flex-col items-center justify-center">
              <>
                {open ? (
                  <Menu.Button className="absolute left-full ml-2 rounded-full bg-white p-0.5 text-gray-400 shadow-md shadow-black/50 hover:text-gray-600 hover:bg-gray-100 ring-1 ring-gray-400/10 hover:ring-gray-400/20">
                    <ChevronLeftIcon className="h-6 w-6 cursor-pointer hover:cursor-pointer" />
                  </Menu.Button>
                ) : (
                  <Menu.Button className="absolute left-full ml-2 rounded-full bg-indigo-50 p-0.5 text-indigo-600 shadow-md shadow-indigo-800/20 transition-all delay-100 duration-200 ease-in-out animate-in fade-in slide-in-from-right-44 hover:text-indigo-700 ring-1  ring-indigo-400/10 hover:cursor-pointer hover:bg-indigo-100 hover:ring-indigo-400/20">
                    <ChevronRightIcon className="h-6 w-6 cursor-pointer " />
                  </Menu.Button>
                )}
              </>

              <Transition
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="opacity-100 -translate-x-20"
                enterTo="opacity-100 translate-x-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 -translate-x-20"
                className="h-full w-full"
              >
                <Menu.Items className="flex h-full flex-col gap-y-2 overflow-y-auto bg-white p-4 shadow-2xl ring-1 ring-gray-200">
                  {sessionTasks2.map((task, index) => (
                    <Menu.Item key={task.taskId}>
                      <div
                        className={clsx(
                          " w-full rounded-lg px-8 py-2 text-gray-400 transition-all duration-300 ease-in-out",
                          index === currentTaskIndex &&
                            "bg-indigo-50 text-indigo-700 ring-2 ring-indigo-400   ",
                          task.isDone &&
                            "cursor-pointer text-gray-700 hover:text-indigo-700",
                          isTaskClickable(index) &&
                            " cursor-pointer text-gray-700 hover:bg-indigo-50 hover:text-indigo-700",
                        )}
                        onClick={() => {
                          isTaskClickable(index) && setCurrentTaskIndex(index);
                        }}
                      >
                        <div className="flex w-full flex-row items-center gap-x-2">
                          <p className="text-md flex flex-row items-center justify-center text-center font-semibold">
                            {task.contentType === 1 ? (
                              <VideoCameraIcon className="h-5 w-5" />
                            ) : (
                              <PencilSquareIcon className="h-5 w-5" />
                            )}
                          </p>
                          <p className="text-md flex flex-row items-center justify-center text-center font-semibold">
                            {task.taskName}
                          </p>
                        </div>
                      </div>
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </div>
          )}
        </Menu>
        </div>
      </div>
      <div className={clsx(!isMenuOpen && "bg-transparent -z-30", isMenuOpen && "bg-indigo-700/50 backdrop-blur-sm", "fixed bottom-0 top-0 left-0 right-0 z-40 h-full w-full transition-all ease-in-out duration-500")} />
    </>
  );
};

export default TaskSessionRadioGroup2;
