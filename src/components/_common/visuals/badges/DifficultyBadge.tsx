import { FC } from "react";

import COLORS from "../../enums/colors";
import Badge from "./Badge";

interface difficultyBadgeProps {
  difficulty: number;
}

const DifficultyBadge: FC<difficultyBadgeProps> = ({ difficulty }) => {
  let color = COLORS.Blue;
  let text = "Muito Fácil";
  if (difficulty === 1) {
    color = COLORS.Green;
    text = "Fácil";
  } else if (difficulty === 2) {
    color = COLORS.Yellow;
    text = "Médio";
  } else if (difficulty === 3) {
    color = COLORS.Red;
    text = "Difícil";
  }
  return (
    <Badge color={color} text={text}/>
  );
};

export default DifficultyBadge;
