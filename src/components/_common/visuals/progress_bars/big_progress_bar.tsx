import { FC } from "react";

interface ProgressBarProps {
  percentage: number;
}

const ExerciseProgressBar: FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <>
      <div className="hidden w-full max-w-5xl flex-row items-center gap-x-4 sm:flex">
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 sm:h-4 md:h-5">
          <div
            className="h-3 rounded-full bg-indigo-600 transition-all duration-1000 ease-out animate-in slide-in-from-left-10  sm:h-4 md:h-5"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="flex w-full max-w-5xl flex-row items-center gap-x-4 sm:hidden">
        <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200 md:h-5">
          <div
            className="h-4 rounded-full bg-indigo-600 text-center transition-all duration-1000 ease-out animate-in sm:slide-in-from-left-10 slide-in-from-left-4 md:h-5"
            style={{ width: `${percentage}%` }}
          >
            {percentage > 0 && (
              <p className="text-xs text-white">{Math.round(percentage)}%</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExerciseProgressBar;
