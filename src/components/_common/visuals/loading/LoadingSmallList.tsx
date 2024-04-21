const LoadingSmallList = () => {
  return (
    <div className="flex w-full animate-pulse flex-col items-center gap-y-4 px-5 py-3">
      <div className="flex w-full flex-row items-center justify-between gap-x-4">
        <div className="flex flex-row gap-x-2">
          <div className="h-2 w-32 rounded-lg bg-gray-200" />
          <div className="h-2 w-2 rounded-lg bg-gray-200" />
        </div>
        <div className="h-2 sm:w-28 w-20 rounded-lg bg-gray-200" />
      </div>
      <div className="flex w-full flex-row items-center justify-between gap-x-4">
        <div className="flex flex-row gap-x-2">
          <div className="h-2 w-32 rounded-lg bg-gray-200" />
          <div className="h-2 w-2 rounded-lg bg-gray-200" />
        </div>
        <div className="h-2 sm:w-28 w-20 rounded-lg bg-gray-200" />
      </div>
      <div className="flex w-full flex-row items-center justify-between gap-x-4">
        <div className="flex flex-row gap-x-2">
          <div className="h-2 w-32 rounded-lg bg-gray-200" />
          <div className="h-2 w-2 rounded-lg bg-gray-200" />
        </div>
        <div className="h-2 sm:w-28 w-20 rounded-lg bg-gray-200" />
      </div>
      <div className="flex w-full flex-row items-center justify-between gap-x-4">
        <div className="flex flex-row gap-x-2">
          <div className="h-2 w-32 rounded-lg bg-gray-200" />
          <div className="h-2 w-2 rounded-lg bg-gray-200" />
        </div>
        <div className="h-2 sm:w-28 w-20 rounded-lg bg-gray-200" />
      </div>
    </div>
  );
};

export default LoadingSmallList;