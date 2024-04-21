import { FC } from "react";

import ExerciseComponent from "../../../_common/exercises/Exercise";
import { Task } from "../../../../api/model";
import Video from "./Video";

interface TaskComponentProps {
  task: Task;
  handleTaskCompleted: (taskId: number, skip: boolean) => void;
}

const TaskComponent: FC<TaskComponentProps> = ({
  task,
  handleTaskCompleted,
}) => {
  
  // If task is undefined, throw an error
  if (!task) {
    throw new Error(
      "TaskComponent is being rendered but task argument is undefined",
    );
  }

  // Switch the content type to match the correct component
  switch (task.contentType) {
    case 2:
      return (
        <ExerciseComponent
          exerciseId={Number(task.content)}
          nextExercise={() => {
            handleTaskCompleted(task.taskId, false);
          }}
          resetStreak={() => {}}
          increaseStreak={() => {}}
        />
      );
    case 1:
      return (
        <Video
          videoId={task.content}
          taskName={task.taskName}
          handleVideoCompleted={(skip) => handleTaskCompleted(task.taskId, skip)}
        />
      );      
    default:
      return <div>Erro</div>;
  }
};

export default TaskComponent;
