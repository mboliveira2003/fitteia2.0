const LoadingProfile = () => {
    return (
      <div className="animate-pulse flex w-full flex-col items-center justify-center duration-250 transition-all duration-1000 ease-in-out ">
        <div className="flex justify-center">
          <div className="flex w-full flex-col justify-center gap-y-8">
            <div className="relative h-48 w-48 rounded-full bg-indigo-50">
              <div className="flex h-48 w-48 items-center justify-center overflow-hidden rounded-full bg-gray-100"></div>
              <label
                className="absolute bottom-0 right-1  rounded-full bg-indigo-300 p-2 text-white transition-all duration-300 ease-in-out"
              >
                <div className="h-4 w-4" />
              </label>
            </div>
          </div>
        </div>
        <div className=" w-full">
          <form className=" flex flex-col gap-y-8 ">
            <div className="mt-4 flex w-full justify-end">
              <div className=" h-14 w-28 rounded-xl bg-gray-200"></div>
            </div>
            <div className="flex w-full flex-col gap-4">
              <div className="flex h-4 w-1/12 flex-col items-start justify-start bg-gray-200"></div>
              <div className="flex h-8 w-full flex-col items-start justify-start bg-gray-200"></div>
            </div>
            <div className="flex w-full flex-col gap-4">
              <div className="flex h-4 w-1/12 flex-col items-start justify-start bg-gray-200"></div>
              <div className="flex h-8 w-full flex-col items-start justify-start bg-gray-200"></div>
            </div>{" "}
            <div className="flex w-full flex-col gap-4">
              <div className="flex h-4 w-1/12 flex-col items-start justify-start bg-gray-200"></div>
              <div className="flex h-8 w-full flex-col items-start justify-start bg-gray-200"></div>
            </div>{" "}
            <div className="flex w-full flex-col gap-4">
              <div className="flex h-4 w-1/12 flex-col items-start justify-start bg-gray-200"></div>
              <div className="flex h-8 w-full flex-col items-start justify-start bg-gray-200"></div>
            </div>
            <div className="flex w-full flex-col gap-4">
              <div className="flex h-4 w-1/12 flex-col items-start justify-start bg-gray-200"></div>
              <div className="flex h-8 w-full flex-col items-start justify-start bg-gray-200"></div>
            </div>
            <div className="flex w-full flex-col gap-4">
              <div className="flex h-4 w-1/12 flex-col items-start justify-start bg-gray-200"></div>
              <div className="flex gap-1">
                <div className="flex h-8 w-full flex-col items-start justify-start bg-gray-200"></div>
                <div className="flex h-8 w-full flex-col items-start justify-start bg-gray-200"></div>
                <div className="flex h-8 w-full flex-col items-start justify-start bg-gray-200"></div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4">
              <div className="flex h-4 w-1/12 flex-col items-start justify-start bg-gray-200"></div>
              <div className="flex h-8 w-full flex-col items-start justify-start bg-gray-200"></div>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default LoadingProfile;