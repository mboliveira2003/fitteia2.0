const LoadingMasterClass = () => {
    return (
      <div
        className={`flex min-w-32 animate-pulse flex-col gap-14 rounded-xl border-2 border-gray-200 px-10 py-7 xl:w-1/2 duration-250 transition-all duration-1000 ease-in-out`}
      >
        <div className="flex w-full flex-col items-start gap-8">
          <div className=" size-4 h-2 w-1/2 rounded-full bg-gray-200"></div>
          <div className=" size-4 h-2 w-1/5 rounded-full bg-gray-200"></div>
          <div className=" size-4 h-4 w-1/5 rounded-full bg-gray-200"></div>
        </div>
  
        <div className=" flex flex-col gap-10 px-3 mt-5">
          <div className="flex w-full items-center gap-4">
            <div className=" size-3 w-1/8 rounded-full bg-gray-200"></div>
            <li className="flex w-full items-center gap-3 text-sm">
              <div className=" h-2 w-1/2 bg-gray-200"></div>
            </li>
          </div>
          <div className="flex w-full items-center gap-4">
          <div className=" size-3 w-1/8 rounded-full bg-gray-200"></div>
            <li className="flex w-full items-center gap-3 text-sm">
              <div className=" h-2 w-1/2 bg-gray-200"></div>
            </li>
          </div>
          <div className="flex w-full items-center gap-4">
          <div className=" size-3 w-1/8 rounded-full bg-gray-200"></div>
            <li className="flex w-full items-center gap-3 text-sm">
              <div className=" h-2 w-1/2 bg-gray-200"></div>
            </li>
          </div>
          <div className="flex w-full items-center gap-4">
          <div className=" size-3 w-1/8 rounded-full bg-gray-200"></div>
            <li className="flex w-full items-center gap-3 text-sm">
              <div className=" h-2 w-1/2 bg-gray-200"></div>
            </li>
          </div>
        </div>
        <div className=" mb-4 flex w-full justify-center">
          <div className="flex h-14 w-52 transform cursor-pointer items-center justify-center rounded-full border bg-gray-200  py-4 transition duration-500 hover:scale-110 hover:border-transparent  hover:bg-indigo-500 hover:text-white ">
            <div className="flex items-center justify-center gap-8 "></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default LoadingMasterClass;