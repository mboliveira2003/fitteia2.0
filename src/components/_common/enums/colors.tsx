// Define an enum of all the possible colors
enum COLORS {
  Blue = "blue",
  Red = "red",
  Orange = "orange",
  Yellow = "yellow",
  Green = "green",
  Gray = "gray",
  Purple = "purple",
}

// Now create a map of colors to their text, background, and ring colors
export const COLOR_MAP: Record<
  COLORS,
  { text: string; background: string; ring: string }
> = {
  [COLORS.Blue]: {
    text: "text-blue-700",
    background: "bg-blue-50",
    ring: "ring-blue-700/10",
  },
  [COLORS.Red]: {
    text: "text-red-700",
    background: "bg-red-50",
    ring: "ring-red-700/10",
  },
  [COLORS.Orange]: {
    text: "text-orange-700",
    background: "bg-orange-50",
    ring: "ring-orange-700/10",
  },
  [COLORS.Yellow]: {
    text: "text-yellow-700",
    background: "bg-yellow-50",
    ring: "ring-yellow-700/10",
  },
  [COLORS.Green]: {
    text: "text-green-700",
    background: "bg-green-50",
    ring: "ring-green-700/10",
  },
  [COLORS.Gray]: {
    text: "text-gray-700",
    background: "bg-gray-50",
    ring: "ring-gray-700/10",
  },
  [COLORS.Purple]: {
    text: "text-purple-700",
    background: "bg-purple-50",
    ring: "ring-purple-700/10",
  },
};

export default COLORS;
