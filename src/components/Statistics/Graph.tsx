import { FC, ReactElement, useState, useEffect } from "react";
import { useGetGraphData } from "../../api/profile/profile";
import { GetGraphData200Data } from "../../api/model";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const Graph: FC = (): ReactElement => {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [graphData, setGraphData] = useState<GetGraphData200Data>({});

  const handleButtonClick = (period: string) => {
    setSelectedPeriod(period);
  };

  // On component load, fetch the school years
  const { refetch: getGraphData } = useGetGraphData(
    {
      timePeriod: selectedPeriod,
    },
    {
      query: {
        enabled: false,
        refetchOnWindowFocus: false,
        cacheTime: 1000, // 1 second
        staleTime: 1000, // 1 second
        onSuccess: (data) => {
          setGraphData(data.data!);
        },
      },
    },
  );

  useEffect(() => {
    getGraphData();
  }, []);

  useEffect(() => {
    getGraphData();
  }, [selectedPeriod]);

  const dates = graphData?.exercisesDonePerDay?.map((item) => {
    const date = new Date(item.date!);
    return date.toLocaleDateString(undefined, {
      month: "numeric",
      day: "numeric",
    });
  });

  const exercisesDone = graphData?.exercisesDonePerDay?.map(
    (item) => item.exercisesDone,
  );

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Exercises Done",
        lineTension: 0.2,
        fill: "start",
        data: exercisesDone,
        backgroundColor: "rgb(99,102, 241,0.3)",
        borderColor: "rgb(99 ,102 ,241,1)",
        borderWidth: 5,
        pointRadius: 3,
        pointHoverRadius: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 45,
        ticks: {
          stepSize: 5,
        },
      },
      x: {},
    },
  };

  if (graphData == null) {
    return (
      <div className="flex w-full flex-col gap-4 py-8">
        <div className="flex justify-center space-x-4 text-sm sm:justify-end sm:text-base">
          <div className="h-5 w-14 rounded-lg bg-gray-200"></div>
          <div className="h-5 w-14 rounded-lg bg-gray-200"></div>
          <div className="h-5 w-14 rounded-lg bg-gray-200"></div>
        </div>
        <div className="h-44 w-full animate-pulse bg-gray-100 py-4 lg:h-96"></div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col-reverse">
      <Line data={chartData} options={options} className="w-full " />

      <div className="flex justify-center space-x-4 sm:pr-8 text-sm sm:justify-end sm:text-base">
        <button
          className={`rounded-xl bg-indigo-500 px-3 py-1 text-white ${selectedPeriod === "7d" ? "" : "opacity-50"}`}
          onClick={() => handleButtonClick("7d")}
        >
          7 dias
        </button>
        <button
          className={`rounded-xl bg-indigo-500 px-3 py-1 text-white ${selectedPeriod === "15d" ? "" : "opacity-50"}`}
          onClick={() => handleButtonClick("15d")}
        >
          15 dias
        </button>
        <button
          className={`rounded-xl bg-indigo-500 px-3 py-1 text-white ${selectedPeriod === "1m" ? "" : "opacity-50"}`}
          onClick={() => handleButtonClick("1m")}
        >
          1 mês
        </button>
      </div>
    </div>
  );
};

export default Graph;