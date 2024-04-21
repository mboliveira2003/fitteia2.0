import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RadioGroup } from "@headlessui/react";

import { Year } from "../../../../api/model";
import { useGetSchoolYears } from "../../../../api/exercise-listing/exercise-listing";
import YearInfo from "../../../_common/enums/years";
import ProgressBar from "../../../_common/visuals/progress_bars/progress_bar";
import LoadingList from "../../../_common/visuals/loading/LoadingList";

interface YearOption {
  year: Year;
}
const YearOption: FC<YearOption> = ({ year }) => {
  return (
    <Link
      to={`/exercises/${year.schoolYearId}`}
      onClick={() => sessionStorage.setItem("yearName", "Matemática " + year.year! + "º")}
      className="w-full"
    >
      <RadioGroup.Option
        key={year.schoolYearId}
        value={year}
        className={({ active }) =>
          `${active ? "ring-2 ring-indigo-400" : ""}
      delay-15 relative w-full cursor-pointer rounded-lg bg-white px-5 py-3 shadow-md ring-1 ring-gray-200 transition duration-100 ease-in-out hover:ring-2 hover:ring-indigo-400 focus:outline-none`
        }
      >
        <div className="flex flex-row items-center justify-between gap-x-6">
          <div className="flex flex-row items-center gap-x-6">
            <img
              className="h-8 w-8 sm:h-12 sm:w-12"
              src={YearInfo[year.year!].image}
            />
            <h2 className=" text-md font-semibold tracking-tight text-gray-800 sm:text-lg">
              {YearInfo[year.year!].name}
            </h2>
          </div>
          <div className="w-10 sm:w-32">
            <ProgressBar percentage={year.percentage!} />
          </div>
        </div>
      </RadioGroup.Option>
    </Link>
  );
};

const YearRadioGroup: FC = ({}) => {
  // State to store the years
  const [years, setYears] = useState<Year[]>([]);
  //Fumction to get the years from the API
  const { refetch: getSchoolYears, isLoading } = useGetSchoolYears({
    query: {
      enabled: false,
      refetchOnWindowFocus: false,
      cacheTime: 1000, // 1 second
      staleTime: 1000, // 1 second

      onSuccess: (data) => {
        setYears(data.data!);
      },
    },
  });
  // On render fetch the years from the API
  useEffect(() => {
    getSchoolYears();
  }, []);

  // While waiting for the API response show a loading animation
  if (isLoading || years.length === 0) {
    return <LoadingList />;
  }

  return (
    <RadioGroup className="w-full">
      <div className=" mb-10 flex w-full flex-col items-center gap-x-4 gap-y-4">
        {years.map((year) => (
          <YearOption year={year} key={year.schoolYearId} />
        ))}
      </div>
    </RadioGroup>
  );
};

const YearSection: FC = ({}) => {
  return (
    <div className="duration-250 m-auto  flex min-h-full w-full flex-col gap-y-6 ease-in-out animate-in fade-in slide-in-from-left-10">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-gray-800 ">
          Anos Escolares
        </h1>
        <p className="text-md hidden text-gray-500 sm:block">
          Encontra o teu ano escolar
        </p>
      </div>
      <YearRadioGroup />
    </div>
  );
};

export default YearSection;
