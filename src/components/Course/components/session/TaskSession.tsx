import {
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { submitTask as submitTaskAPI, useGetCourseTasks } from "../../../../api/courses-tasks/courses-tasks";
import { Task } from "../../../../api/model";
import { SoundContext } from "../../../../templates/Authenticated/Authenticated";
import LoadingTask from "../../../_common/visuals/loading/LoadingTask";
import TaskPopUpNavigation from "./TaskSessionNavigation3";
import TaskComponent from "./Task";
import { TaskModalContext } from "./TaskModal";

const TaskSession: FC = () => {
  // Url Params
  const { courseTopic, courseSubtopic } = useParams();
  // Function to navigate to a different path
  const navigateTo = useNavigate();
  // Function to scroll to the top of the page
  const { onTaskCompleted } = useContext(TaskModalContext);

  // States to store task information
  const [sessionTasks, setSessionTasks] = useState<Task[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number | null>(null);
  const { firstIncompleteTaskIndex } = useMemo(() => {
    return {
      firstIncompleteTaskIndex: sessionTasks.findIndex((task) => !task.isDone),
    };
  }, [sessionTasks]);

  // If the first incomplete exercise changes we navigate to its index.
  // If all exercises are completed, we navigate to the first one only on mount.
  useEffect(() => {
    if (firstIncompleteTaskIndex === -1) {
      setCurrentTaskIndex(0);
      // Set the current task to the first incomplete task
    } else {
      setCurrentTaskIndex(firstIncompleteTaskIndex);
    }
  }, [firstIncompleteTaskIndex]);

  // Define the query to get the course tasks and fetch them automatically on mount
  const { refetch: getCourseTasks, isLoading } = useGetCourseTasks(
    {
      subTopicId: Number(courseSubtopic),
    },
    {
      query: {
        enabled: false,
        refetchOnWindowFocus: false,
        cacheTime: 1000, // 1 second
        staleTime: 1000, // 1 second

        onSuccess: (data) => {
          setSessionTasks(data.data);

          // If there are no exercises, navigate to the empty screen
          if (data.data.length === 0) {
            navigateTo(
              `/examMode/course/${courseTopic}/${courseSubtopic}/session/empty`,
              { replace: true },
            );
            return;
          }
        },

        // If the user doesn't have access to the course, navigate to the master class payment page
        onError: (err) => {
          console.log(err);
          navigateTo("/settings/master-class", { replace: true });
        },
      },
    },
  );

  // Fetch the tasks on mount
  useEffect(() => {
    getCourseTasks();
  }, []);

  // When a task is completed, call the modal callback and set the current task index to the next one
  useEffect(() => {
    onTaskCompleted();
  }, [currentTaskIndex]);

  // Update the task to be completed
  const handleTaskComplete = useCallback(
    (taskId: number, skip: boolean) => {
      // Notify API of the completed task
      if (!skip) {
        submitTaskAPI({ taskId });
      }

      // If the last task was completed, show the completed screen
      if (currentTaskIndex === sessionTasks.length - 1) {
        navigateTo(
          `/examMode/course/${courseTopic}/${courseSubtopic}/session/completed`,
        );
        return;
      }

      // Set the task to be completed
      setSessionTasks((prev) => {
        return prev.map((task) => {
          if (task.taskId === taskId) {
            return { ...task, isDone: true };
          }
          return task;
        });
      });

      // Set the next task
      setCurrentTaskIndex((prev) => {
        if (prev !== null) {
          return prev + 1;
        }
        return null;
      });
    },
    [sessionTasks, currentTaskIndex],
  );

  // Sound context
  const { soundEnabled, setSoundEnabled } = useContext(SoundContext);

  if (
    isLoading ||
    currentTaskIndex === null ||
    sessionTasks.length === 0 ||
    firstIncompleteTaskIndex === null
  ) {
    return <LoadingTask />;
  }

  return (
    <div className="flex w-full flex-col items-center gap-y-6 ">
      <div className="flex w-full flex-row items-center justify-between gap-x-4 duration-300 animate-in fade-in slide-in-from-left-20">
        {/*Navigation*/}
        <TaskPopUpNavigation
          sessionTasks={sessionTasks}
          currentTaskIndex={currentTaskIndex}
          setCurrentTaskIndex={setCurrentTaskIndex}
          firstIncompleteTaskIndex={firstIncompleteTaskIndex}
        />

        <div className="flex flex-row items-center justify-end gap-x-2 text-gray-400 transition-all duration-200 ease-in-out">
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
          <Link to={`/examMode/course/${courseTopic}`}>
            <XMarkIcon className=" h-7 w-7 cursor-pointer hover:text-gray-600" />
          </Link>
        </div>
      </div>
      <TaskComponent
        task={sessionTasks[currentTaskIndex]}
        key={sessionTasks[currentTaskIndex].taskId}
        handleTaskCompleted={handleTaskComplete}
      />
    </div>
  );
};

export default TaskSession;
