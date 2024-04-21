import { FC, ReactElement } from "react";
import TopicImages from "./topicImages";

interface Topic {
  topicName: string;
  percentage: number;
}

export const TopicBar: FC<Topic> = ({
  topicName,
  percentage,
}): ReactElement => {
  // Check if the topicName exists in TopicImages, otherwise use "Default"
  const imageUrl = TopicImages[topicName] ?? TopicImages["Default"];

  return (
    <div className="flex h-28 w-full items-center justify-start gap-7 rounded-3xl border-2 border-gray-300 p-5 text-sm">
      <div className="flex w-full items-center gap-5">
        <img
          src={imageUrl}
          alt=""
          className={`size-16 object-contain md:w-1/5 ${
            percentage === 0 ? "grayscale" : ""
          }`}
        />
        <div className="flex w-full flex-col gap-4">
          <h1 className="w-full text-start font-semibold text-gray-700">
            {topicName}:
          </h1>
          <div
            className={`flex h-6 w-full items-center rounded-full ${
              percentage === 0 ? "border-gray-300" : "border-indigo-500"
            } border-2 px-1 dark:bg-gray-700`}
          >
            <div
              className="relative h-3 rounded-full bg-indigo-500"
              style={{ width: `${percentage}%` }}
            >
              <div className="relative top-1 h-[0.15em] w-[95%] rounded-full bg-white opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};