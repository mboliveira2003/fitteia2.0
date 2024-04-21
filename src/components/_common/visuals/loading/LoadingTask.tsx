const LoadingTask = () => {
  return (
    <>
      <div className="w-full animate-pulse duration-1000">
        <div className="relative flex w-full flex-col items-center justify-center divide-y overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-gray-200">
          <div className="flex  w-full flex-row items-center justify-between px-4 py-4 sm:px-6">
            <div className="h-6 w-10 rounded-lg bg-gray-200" />
            <div className="flex flex-row gap-x-2">
              <div className="h-6 w-10 rounded-lg bg-gray-200" />
              <div className="h-6 w-10 rounded-lg bg-gray-200" />
            </div>
          </div>
          <div className="y-2 mx-auto h-80 w-full bg-gray-200 " />
        </div>
        <div className="mx-auto flex w-full flex-row items-center justify-center px-4 py-4 sm:px-6">
        <div className="h-10 w-32 rounded-lg bg-gray-200" />
      </div>
      </div>
      
    </>
  );
};

export default LoadingTask;
