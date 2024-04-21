import { FC } from "react";

import { NewspaperIcon } from "@heroicons/react/16/solid";

import COLORS from "../../enums/colors";
import Badge from "./Badge";

const ExamBadge: FC = () => {
  return (
    <>
      <div className="hidden sm:block">
        <Badge color={COLORS.Purple} text="Exame" Icon={NewspaperIcon} />
      </div>
      <div className="block sm:hidden">
        <Badge color={COLORS.Purple} text="" Icon={NewspaperIcon} />
      </div>
    </>
  );
};

export default ExamBadge;
