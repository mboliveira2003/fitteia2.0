import { FC } from "react";

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ percentage }) => {
  if (percentage < 0) percentage = 0;
  if (percentage > 100) percentage = 100;
  return (
    <>
      <div className="hidden w-full sm:flex sm:flex-col sm:gap-y-3">
        <div className="h-2 bg-transparent" style={{ width: `${percentage}%` }}>
          <p className="mb-2 text-end text-sm font-medium text-indigo-700">
            {percentage.toFixed(0)}%
          </p>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-indigo-600 transition-all ease-in-out"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      </div>

      <p className=" visible text-end text-base font-medium text-indigo-700 sm:hidden">
        {percentage.toFixed(0)}%
      </p>
    </>
  );
};

export default ProgressBar;
