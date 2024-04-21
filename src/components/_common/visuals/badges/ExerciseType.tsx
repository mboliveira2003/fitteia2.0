import { FC } from "react";
import {
  BookmarkIcon,
  PencilSquareIcon,
  CursorArrowRippleIcon,
} from "@heroicons/react/20/solid";

interface ExerciseTypeProps {
  isMultipleChoice: boolean;
}

const ExerciseType: FC<ExerciseTypeProps> = ({ isMultipleChoice }) => {
  let Icon = BookmarkIcon;
  if (!isMultipleChoice) {
    Icon = PencilSquareIcon;
  }
  if (isMultipleChoice) {
    Icon = CursorArrowRippleIcon;
  }
  return (
    <div className="flex flex-row items-center gap-x-1">
      <Icon className="h-4 w-4  text-gray-500" />
      <p className="text-sm font-normal text-gray-500">
        {isMultipleChoice ? "Escolha Múltipla" : "Resposta Escrita"}
      </p>
    </div>
  );
};

export default ExerciseType;