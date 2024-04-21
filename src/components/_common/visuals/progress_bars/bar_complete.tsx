import { FC } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

interface BarCompleteProps {
  numCompleted: number;
  total: number;
}

const BarComplete: FC<BarCompleteProps> = ({ numCompleted, total }) => {
  return (
    <div className="group flex flex-row items-center justify-between gap-x-1">
      <p className="text-sm font-normal text-gray-500">
        {numCompleted}/{total}
      </p>
      <CheckCircleIcon className="h-4 w-4 text-indigo-600" />
    </div>
  );
};

export default BarComplete;
