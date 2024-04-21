import clsx from "clsx";

import COLORS, { COLOR_MAP } from "../../enums/colors";

interface BadgeProps {
  big?: boolean;
  color: COLORS;
  text: string;
  Icon?: any;
}

/** This component is a badge that displays a text and a color.
 *
 * @param text: The text of the badge
 * @param color: The color of the badge
 * @param Icon: The icon of the badge
 * @param big: If the badge should be big
 */

function Badge({ color, text, Icon, big }: BadgeProps) {
  const { text: textColor, background, ring } = COLOR_MAP[color];

  return (
    <span
      className={clsx(big===undefined && `flex flex-row gap-x-0.5 items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${textColor} ${background} ${ring}`, big && `flex flex-row gap-x-0.5 items-center text-center justify-center ring-1 rounded-md ring-inset sm:px-3 px-2  sm:py-1.5 py-1 sm:text-lg text-sm font-medium ${textColor} ${background} ${ring}`)}>
      {Icon && <Icon className={`w-4 h-4 ${textColor}`} />}
      {text}
    </span>
  );
}

export default Badge;
