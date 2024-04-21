const LoadingPodium = () => {
  return (
    <div className="animate-pulse transition-all duration-1000 ease-in-out w-full ">
      <div className="mb-4 mt-10 lg:mt-24 flex items-end justify-center lg:py-10">
        <div className="flex-basis-0 mb-3  flex  min-h-44 w-full max-w-44 flex-grow flex-col items-center justify-center gap-2 rounded-lg py-3 sm:mr-14 sm:gap-4">
        <div className="flex size-14 lg:size-24 flex-col rounded-full bg-gray-200 animate-bounce"></div>
          <div className="tran mt-5 flex h-4 w-20 flex-col rounded-md bg-gray-200"></div>{" "}
        </div>
        <div className="flex-basis-0 mb-8 flex min-h-44 w-full max-w-44 flex-grow flex-col items-center justify-center gap-3 rounded-lg py-3 sm:gap-5">
          <div className="flex size-16 lg:size-28 flex-col rounded-full bg-gray-200 animate-bounce animate-delay-100 "></div>
          <div className="mt-5 flex h-4 w-20 flex-col rounded-md bg-gray-200 "></div>{" "}
        </div>
        <div className="flex-basis-0 flex min-h-44 w-full max-w-44 flex-grow flex-col items-center justify-center gap-2 rounded-lg py-3 sm:ml-14 sm:gap-4">
        <div className="flex size-10 lg:size-20 flex-col rounded-full bg-gray-200 animate-bounce animate-delay-200 "></div>
          <div className="mt-5 flex h-4 w-20 flex-col rounded-md bg-gray-200 "></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPodium;