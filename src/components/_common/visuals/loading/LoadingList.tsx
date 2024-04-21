const LoadingList = () => {
  return (
    <div className="fit flex w-full min-w-fit max-w-screen-2xl animate-pulse flex-col gap-y-5 duration-1000">
      <div className="m-auto flex min-h-full w-full flex-col gap-y-6">
        <div className="flex w-full flex-col items-center gap-x-4 gap-y-4">
          <div className="relative w-full rounded-lg bg-white px-5 py-3 shadow-md ring-1 ring-gray-200 ">
            <div className="flex flex-row items-center justify-between gap-x-6">
              <div className="flex flex-row items-center gap-x-6">
                <div className="h-8 w-8 rounded-lg bg-gray-200 sm:h-12 sm:w-12" />
                <div className="h-4 w-32 rounded-lg bg-gray-200 " />
              </div>
              <div className="h-4 w-10 rounded-lg bg-gray-200 sm:w-32" />
            </div>
          </div>
          <div className="relative w-full rounded-lg bg-white px-5 py-3 shadow-md ring-1 ring-gray-200 ">
            <div className="flex flex-row items-center justify-between gap-x-6">
              <div className="flex flex-row items-center gap-x-6">
                <div className="h-8 w-8 rounded-lg bg-gray-200 sm:h-12 sm:w-12" />
                <div className="h-4 w-32 rounded-lg bg-gray-200 " />
              </div>
              <div className="h-4 w-10 rounded-lg bg-gray-200 sm:w-32" />
            </div>
          </div>
          <div className="relative w-full rounded-lg bg-white px-5 py-3 shadow-md ring-1 ring-gray-200 ">
            <div className="flex flex-row items-center justify-between gap-x-6">
              <div className="flex flex-row items-center gap-x-6">
                <div className="h-8 w-8 rounded-lg bg-gray-200 sm:h-12 sm:w-12" />
                <div className="h-4 w-32 rounded-lg bg-gray-200 " />
              </div>
              <div className="h-4 w-10 rounded-lg bg-gray-200 sm:w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingList;
