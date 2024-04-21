const LoadingExercise = () => {
  return (
    <div className="w-full">
      <div className="relative flex w-full animate-pulse flex-col items-center justify-center divide-y overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-gray-200 duration-1000">
        <div className="flex  w-full flex-row items-center justify-between px-4 py-4 sm:px-6">
          <div className="h-6 w-10 rounded-lg bg-gray-200" />
          <div className="flex flex-row gap-x-2">
            <div className="h-6 w-10 rounded-lg bg-gray-200" />
            <div className="h-6 w-10 rounded-lg bg-gray-200" />
          </div>
        </div>
        <div className="y-2 mx-auto h-80 w-full bg-gray-200 " />
        <div className="mx-auto w-full px-4 py-4 sm:px-6">
          <div className="h-10 w-24 rounded-lg bg-gray-200" />
        </div>
        <div className="mx-auto flex w-full sm:flex-row flex-col justify-between px-4 py-4 sm:px-6 gap-y-2">
          <div className="sm:flex sm:flex-row grid grid-cols-2 w-full sm:w-fit items-center gap-x-2 gap-y-2">
            <div className="h-10 w-full sm:w-10 rounded-lg bg-gray-200" />
            <div className="h-10 w-full sm:w-10 rounded-lg bg-gray-200" />
            <div className="h-10 w-full sm:w-10 rounded-lg bg-gray-200" />
            <div className="h-10 w-full sm:w-10 rounded-lg bg-gray-200" />
          </div>
          <div className="h-10 sm:w-40 w-full rounded-lg bg-gray-200 " />
        </div>
      </div>
    </div>
  );
};

export default LoadingExercise;
