import { FC, ReactElement } from "react";
import { TopicBar } from "./TopicBarSection";
import Graph from "../Graph";
import { GetProfileStats200Data } from "../../../api/model";

interface StatisticsSection {
  statistics: GetProfileStats200Data;
}

export const StatisticsSection: FC<StatisticsSection> = ({
  statistics,
}): ReactElement => {
  return (
    <div>
      <div className="flex w-full justify-center">
        <div className="flex w-full flex-col">
          <div className=" flex w-full flex-col-reverse justify-center gap-9 px-2 md:py-4 lg:gap-20 xl:flex-row">
            {/* Adjust width for the Graph container */}
            <div className="w-full">
              <Graph />
            </div>
            <div className="flex flex-col items-center justify-center py-4 ">
              <div className="flex h-full flex-col items-center justify-center">
                <h2 className="text-center text-xl opacity-50">Total Score:</h2>
                <h1 className="text-center text-[5.5em] text-indigo-500">
                  {statistics?.gradePrediction}
                </h1>
                <div className=" flex items-center">
                  <div className=" lg:h-22 mt-2 flex w-full gap-2 rounded-3xl border-2  p-3 ">
                    <div className=" flex h-full w-full flex-col items-center justify-center gap-1 text-gray-700 ">
                      <h1 className=" text-2xl font-bold">
                        {statistics?.rank}
                      </h1>
                      <p className=" flex w-1/3 justify-center px-2 text-center  text-sm text-gray-500">
                        Pontuação na tabela
                      </p>
                    </div>
                    <div className=" flex h-full w-full flex-col items-center justify-center gap-1 text-gray-700 ">
                      <h1 className=" text-2xl font-bold">
                        {statistics?.totalExercisesDone}
                      </h1>
                      <p className=" flex w-1/3 justify-center px-2 text-center text-sm text-gray-500">
                        Exercícios feitos
                      </p>
                    </div>{" "}
                    <div className=" flex h-full w-full flex-col items-center justify-center gap-1 text-gray-700 ">
                      <h1 className=" text-2xl font-bold">
                        {statistics?.totalExercisesCorrect}
                      </h1>
                      <p className=" flex w-1/3 justify-center px-2 text-center  text-sm text-gray-500">
                        Exercícios corretos
                      </p>
                    </div>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col xl:flex-row xl:flex-wrap">
        {statistics?.topicPercentageDistribution!.map((topic) => (
          <div key={topic.topicName} className="p-2 xl:w-1/4">
            <div className="flex items-center justify-center">
              <TopicBar
                topicName={topic.topicName!}
                percentage={topic.percentage!}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};