import { FC } from "react";

import Badge from "./Badge";
import COLORS from "../../enums/colors";

interface LabelListProps {
  labels: string[];
}

/** This component is a list of labels using Badges.
 *
 * @param labels: The labels to display
 */

// List of labels using Badges
const LabelList: FC<LabelListProps> = ({ labels }) => {
  return (
    <span className="flex gap-x-1 items-center">
      {labels.map((label) => (
        <Badge color={COLORS.Blue} text={label} key={label} />
      ))}
    </span>
  );
};

export default LabelList;
