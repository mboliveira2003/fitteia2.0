
const Topic = () => (
  <div className="flex h-28 w-full items-center justify-start gap-7 rounded-3xl border-2 border-gray-300 p-5 text-sm">
    <div className="flex w-full items-center gap-4">
      <div className=" h-14 w-20 rounded-lg bg-gray-200"></div>
      <div className=" flex w-full flex-col gap-4">
        <div className=" h-2 w-9 rounded-lg bg-gray-200"></div>{" "}
        <div
          className={`flex h-6 w-full items-center rounded-full  border-2 px-1 dark:bg-gray-700`}
        >
          <div
            className=" relative h-3 rounded-full bg-gray-200 "
            style={{ width: `100%` }}
          >
            <div className=" relative top-1 h-[0.15em] w-[95%] rounded-full bg-white opacity-30 "></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const LoadingStatistics = () => {
  return (
    <div className=" fit m-auto flex min-h-full w-full  max-w-screen-2xl animate-pulse flex-col gap-y-6 transition-all duration-1000 ease-in-out">

      <div className="flex w-full justify-center py-5">
        <div className="flex w-full flex-col">
          <div className=" flex w-full flex-col-reverse justify-center gap-9 px-2 md:py-4 lg:gap-20 xl:flex-row">
            {/* Adjust width for the Graph container */}
            <div className="flex h-full w-full flex-col gap-5">
              <div className=" flex w-full justify-end gap-4 ">
                <div className=" h-5 w-16 rounded-lg bg-gray-200"></div>
                <div className=" h-5 w-16 rounded-lg bg-gray-200"></div>
                <div className=" h-5 w-16 rounded-lg bg-gray-200"></div>
              </div>

              <div className=" h-80 xl:h-full w-full rounded-md bg-gray-100"></div>
            </div>
            <div className="flex xl:w-1/3 flex-col items-center justify-center py-10 ">
              <div className="flex h-full w-full md:w-1/2 xl:w-full flex-col items-center justify-center">
                <div className=" h-4 w-1/2 rounded-xl bg-gray-200"></div>
                <div className=" mt-7 h-44 w-1/2 rounded-full bg-gray-100"></div>

                <div className=" flex w-full items-center">
                  <div className=" mt-8 flex w-full gap-2 rounded-3xl border-2 p-3  lg:h-24 ">
                    <div className=" flex h-full w-full flex-col items-center justify-center gap-1 text-gray-700 ">
                      <div className=" h-8 w-full rounded-xl bg-gray-200"></div>
                      <div className=" h-8 w-full rounded-xl bg-gray-200"></div>
                    </div>
                    <div className=" flex h-full w-full flex-col items-center justify-center gap-1 text-gray-700 ">
                      <div className=" h-8 w-full rounded-xl bg-gray-200"></div>
                      <div className=" h-8 w-full rounded-xl bg-gray-200"></div>
                    </div>{" "}
                    <div className=" flex h-full w-full flex-col items-center justify-center gap-1 text-gray-700 ">
                      <div className=" h-8 w-full rounded-xl bg-gray-200"></div>
                      <div className=" h-8 w-full rounded-xl bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col xl:flex-row xl:flex-wrap">
        {[...Array(8)].map((_, index) => (
          <div className="p-2 xl:w-1/4" key={index}>
            <div className="flex items-center justify-center">
              <Topic />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingStatistics;