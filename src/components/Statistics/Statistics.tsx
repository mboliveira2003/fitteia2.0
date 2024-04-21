import { FC, ReactElement, useState, useEffect } from "react";
import SectionTransition from "../_common/transitions/Transition";
import "react-circular-progressbar/dist/styles.css";
import { useGetProfileStats } from "../../api/profile/profile";
import { GetProfileStats200Data } from "../../api/model";
import ExamImage from "../../assets/exam.png";
import TestImage from "../../assets/test_2.png";
import LoadingStatistics from "../_common/visuals/loading/LoadingStatistics";
import { StatisticsSection } from "./components/StatisticsSection";

const Statistics: FC = (): ReactElement => {
  const [statistics, setTotalStatistics] = useState<GetProfileStats200Data>();
  // On component load, fetch the school years
  const { refetch: getProfileStats } = useGetProfileStats({
    query: {
      enabled: false,
      refetchOnWindowFocus: false,
      cacheTime: 1000, // 1 second
      staleTime: 1000, // 1 second
      onSuccess: (data) => {
        setTotalStatistics(data.data!);
      },
    },
  });

  // On page load, fetch the school years
  useEffect(() => {
    getProfileStats();
  }, []);

  return (
    <SectionTransition show={true}>
      <div className="duration-250 fit m-auto flex min-h-full  w-full max-w-screen-2xl flex-col gap-y-6 ease-in-out animate-in fade-in slide-in-from-left-10">
        <div className="w-full justify-between md:flex">
          <div className="flex w-full flex-col">
            <h1 className="text-xl font-semibold  text-gray-700 ">
              Estatísticas
            </h1>
            <p className="text-md hidden text-gray-500 sm:block">
              Consulta e analisa a tua performace
            </p>
          </div>
          <div className=" mt-4 flex h-14 w-full justify-end gap-9 lg:mt-0">
            <div className={`flex h-full w-full items-center gap-8 rounded-2xl bg-red-500 sm:w-1/2  xl:min-w-fit xl:w-1/4   ${statistics ? "" : "animate-pulse"}`}>
              <div className="">
                <img src={TestImage} alt="" className="ml-5 h-full w-9" />
              </div>
              <div className={`flex h-full w-full  items-center  justify-start gap-2 text-white`}>
                <h1 className="text-start text-xl font-bold sm:text-xl lg:text-xl">
                  {statistics?.totalTestsDone ?? 0}
                </h1>
                <p className=" text-start text-sm lg:text-base">Testes</p>
              </div>
            </div>
            <div className={`flex h-full w-full items-center gap-8 rounded-2xl bg-orange-500 sm:w-1/2  xl:min-w-fit xl:w-1/4  ${statistics ? "" : "animate-pulse"}`}>
              <div className="">
                <img src={ExamImage} alt="" className="ml-5 h-full w-10" />
              </div>
              <div className=" flex h-full w-full items-center justify-start gap-2 text-white">
                <h1 className="text-start text-xl font-bold sm:text-xl">
                  {statistics?.totalExamsDone}
                </h1>
                <p className="text-start text-sm lg:w-full lg:text-base">
                  Exames
                </p>
              </div>
            </div>
          </div>
        </div>
        {statistics ?  <StatisticsSection statistics={statistics}/> : <LoadingStatistics />}
      </div>
    </SectionTransition>
  );
};

export default Statistics;