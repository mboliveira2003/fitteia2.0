import { FC } from "react";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import { Task } from "../../../../api/model";

interface TaskSessionRadioGroupProps {
  sessionTasks: Task[];
  currentTaskIndex: number | null;
  setCurrentTaskIndex: (index: number) => void;
  firstIncompleteTaskIndex: number;
}

const TaskSessionRadioGroup: FC<TaskSessionRadioGroupProps> = ({
  sessionTasks,
  currentTaskIndex,
  setCurrentTaskIndex,
  firstIncompleteTaskIndex,
}) => {
  // Decides if a task should be hidden or not
  const isTaskHidden = (index: number) => {
    // Edge case: if there are no tasks, show nothing
    if (currentTaskIndex === null) {
      return true;
    }
    // If the first or second index is selected, show the first 5 tasks
    if ((currentTaskIndex === 0 || currentTaskIndex === 1) && index <= 4) {
      return false;
    }
    // If the last or first to last index is selected, show the last 5 tasks
    if (
      (currentTaskIndex === sessionTasks.length - 1 ||
        currentTaskIndex === sessionTasks.length - 2) &&
      sessionTasks.length - 5 <= index
    ) {
      return false;
    }
    // If the current index is none of the above, show the 2 tasks before and after it
    if (currentTaskIndex - 2 <= index && index <= currentTaskIndex + 2) {
      return false;
    }
    return true;
  };

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
    <RadioGroup
      value={currentTaskIndex}
      className="flex w-full flex-row items-center justify-center gap-x-2 divide-gray-200 rounded-lg bg-white px-2 shadow-md ring-1 ring-gray-200 sm:w-fit sm:rounded-md sm:shadow-sm"
    >
      {/**If the current task is the first one don't show the jump backward option*/}
      {currentTaskIndex !== 0 && (
        <div
          className={clsx(
            "flex flex-row items-center justify-center text-gray-400 transition-all duration-200 ease-in-out ",
            isTaskClickable(0) && "cursor-pointer hover:text-gray-600",
          )}
        >
          <ChevronDoubleLeftIcon
            className="h-4 w-4 sm:h-5 sm:w-5"
            onClick={() => {
              isTaskClickable(0) && setCurrentTaskIndex(0);
            }}
          />
        </div>
      )}
      {/**Only show if the previous task is clickable*/}
      {isTaskClickable(currentTaskIndex! - 1) && (
        <div
          className={clsx(
            "flex flex-row items-center justify-center text-gray-400 transition-all duration-200 ease-in-out ",
            isTaskClickable(currentTaskIndex! - 1) &&
              "cursor-pointer hover:text-gray-600",
          )}
        >
          <ChevronLeftIcon
            className="h-4 w-4 sm:h-5 sm:w-5"
            onClick={() => {
              isTaskClickable(currentTaskIndex! - 1) &&
                setCurrentTaskIndex(currentTaskIndex! - 1);
            }}
          />
        </div>
      )}
      {/**Show the tasks number*/}
      {sessionTasks.map((task, index) => (
        <RadioGroup.Option
          value={index}
          key={task.taskId}
          className={clsx(
            "flex items-center justify-center py-1",
            isTaskHidden(index) && "hidden",
          )}
        >
            {({ checked }: { checked: boolean }) => (
            <div
              className={clsx(
                "inline-flex w-full cursor-pointer items-center justify-center rounded-full px-2 py-2 text-gray-400",
                checked && "bg-indigo-50 text-indigo-700 ring-indigo-600",
                task.isDone && "text-gray-700",
                isTaskClickable(index) &&
                  " cursor-pointer text-gray-700 hover:text-indigo-700",
              )}
              onClick={() => {
                isTaskClickable(index) && setCurrentTaskIndex(index);
              }}
            >
              <p className="text-md flex h-4 w-4 flex-row items-center justify-center text-center font-semibold sm:h-5 sm:w-5">
                {index + 1}
              </p>
            </div>
          )}
        </RadioGroup.Option>
      ))}
      {/**Only show if the next task is clickable*/}
      {isTaskClickable(currentTaskIndex! + 1) && (
        <div
          className={clsx(
            "flex flex-row items-center justify-center text-gray-400 transition-all duration-200 ease-in-out ",
            isTaskClickable(currentTaskIndex! + 1) &&
              "cursor-pointer hover:text-gray-600",
          )}
        >
          <ChevronRightIcon
            className="h-4 w-4 sm:h-5 sm:w-5"
            onClick={() => {
              isTaskClickable(currentTaskIndex! + 1) &&
                setCurrentTaskIndex(currentTaskIndex! + 1);
            }}
          />
        </div>
      )}
      {/**If there are undone tasks, show jump forward if the first incomplete task is not the current*/}
      {currentTaskIndex !== firstIncompleteTaskIndex &&
        firstIncompleteTaskIndex !== -1 && (
          <div
            className={clsx(
              "flex flex-row items-center justify-center text-gray-400 transition-all duration-200 ease-in-out ",
              isTaskClickable(firstIncompleteTaskIndex) &&
                "cursor-pointer hover:text-gray-600",
            )}
          >
            <ChevronDoubleRightIcon
              className="h-4 w-4 sm:h-5 sm:w-5"
              onClick={() => {
                isTaskClickable(firstIncompleteTaskIndex) &&
                  setCurrentTaskIndex(firstIncompleteTaskIndex);
              }}
            />
          </div>
        )}
      {/**If all tasks are done, only show jump forward if the the currents tasks isn't the first one*/}
      {currentTaskIndex !== sessionTasks.length - 1 &&
        firstIncompleteTaskIndex === -1 && (
          <div className="flex cursor-pointer flex-row items-center justify-center text-gray-400 transition-all duration-200 ease-in-out hover:text-gray-600">
            <ChevronDoubleRightIcon
              className="h-4 w-4 sm:h-5 sm:w-5"
              onClick={() => {
                setCurrentTaskIndex(sessionTasks.length - 1);
              }}
            />
          </div>
        )}
    </RadioGroup>
  );
};

export default TaskSessionRadioGroup;
