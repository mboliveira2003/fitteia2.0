import { ArrowRightIcon } from "@heroicons/react/20/solid";

const LoadingExamProfile = () => {
  return (
    <div className="fit duration-250 relative flex w-full min-w-fit max-w-screen-2xl animate-pulse flex-col gap-y-5 transition-all duration-1000 ease-in-out">
      <div className="m-auto flex min-h-full w-full flex-col gap-y-4 sm:gap-y-6">
        <div className="flex w-full flex-col items-center justify-center gap-x-16 gap-y-10 divide-y divide-gray-200">
          <div className="flex w-full flex-col items-center justify-center gap-y-8 divide-y divide-gray-200">
            {/**User Profile Image */}
            <div className="flex w-full flex-col items-center justify-center gap-y-4">
              <div className="relative h-36 w-36 rounded-full bg-indigo-50">
                <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full"></div>
              </div>
              <div className="mt-14 h-10 w-full max-w-md rounded-lg bg-indigo-50" />
            </div>
            <div className="flex h-fit w-full flex-col gap-x-4 gap-y-10">
              {/*Grade Badge */}

              <div className="flex flex-row items-end justify-between pt-6">
                <div>
                  <h1 className="text-xl font-semibold tracking-tight text-gray-800 ">
                    Modo
                  </h1>
                  <p className="text-md hidden text-gray-500 sm:block">
                    Seleciona um modo de estudo
                  </p>
                </div>
              </div>
              <div className="-mt-6 flex w-full flex-col gap-x-4 gap-y-4 sm:flex-row ">
                {/*Course Button*/}
                <div className="group relative z-0 flex w-full flex-row  justify-between gap-y-2 overflow-hidden rounded-lg bg-white px-4 py-4 shadow-md ring-1 ring-gray-200 transition duration-100 ease-in-out sm:flex-col sm:justify-start ">
                  <div className="absolute -right-6 -top-6 z-10 hidden h-40 w-40 rounded-full bg-indigo-300 p-6 sm:block sm:p-8"></div>
                  <h1 className="z-20 flex flex-row items-center gap-x-1.5 text-xl font-semibold text-gray-700">
                    Curso
                    <ArrowRightIcon className="-mb-0.5 h-5 w-5 sm:hidden" />
                  </h1>
                  <div className="z-20 mt-4 hidden sm:block">
                    <div className="h-2 w-full rounded-full bg-gray-200"></div>
                  </div>
                  <div className="z-20 flex items-center justify-center rounded-full bg-indigo-50 p-3 sm:hidden">
                    <h1 className="text-md flex h-6 w-6 items-center justify-center font-semibold text-indigo-700"></h1>
                  </div>
                </div>

                {/*Exam Button*/}
                <div className="group relative z-0 flex w-full flex-row justify-between gap-y-2 overflow-hidden rounded-lg bg-white px-4 py-4 shadow-md ring-1 ring-gray-200 transition duration-100 ease-in-out sm:flex-col sm:justify-start ">
                  <div className="absolute -right-6 -top-6 z-10  hidden h-40 w-40 rounded-full p-6 sm:block sm:bg-indigo-300 sm:p-8"></div>
                  <h1 className="z-20 flex flex-row items-center gap-x-1.5 text-xl font-semibold text-gray-700">
                    Exame
                    <ArrowRightIcon className="-mb-0.5 h-5 w-5 sm:hidden" />
                  </h1>
                  <div className="z-20 mt-4 hidden sm:block">
                    <div className="h-2 w-full rounded-full bg-gray-200"></div>
                  </div>
                  <div className="z-20 flex items-center justify-center rounded-full bg-indigo-50 p-3 sm:hidden">
                    <h1 className="text-md flex h-6 w-6 items-center justify-center font-semibold text-indigo-700"></h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*Statistics Section */}
          <div className=" flex w-full flex-col gap-y-4 divide-y divide-gray-200 pt-0">
            <div className="flex flex-row items-end justify-between pt-6">
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-gray-800 ">
                  Estatísticas
                </h1>
                <p className="text-md hidden text-gray-500 sm:block">
                  Consulta as tua prestação nos vários tópicos
                </p>
              </div>
            </div>
            <div className="w-full divide-y divide-gray-200">
              <div className="w-full">
                <div className="flex flex-row items-center justify-between gap-x-12 bg-indigo-200 bg-opacity-20 px-6 py-6">
                  <h1 className="xl:text-md h-2 w-20 rounded-full bg-gray-200 text-start text-sm text-gray-600 sm:whitespace-nowrap"></h1>
                  <div className="h-2 w-6 rounded-full bg-gray-200 sm:w-28 xl:w-40"></div>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-row items-center justify-between gap-x-12 px-6 py-6">
                  <h1 className="xl:text-md h-2 w-20 rounded-full bg-gray-200 text-start text-sm text-gray-600 sm:whitespace-nowrap"></h1>
                  <div className="h-2 w-6 rounded-full bg-gray-200 sm:w-28 xl:w-40"></div>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-row items-center justify-between gap-x-12 bg-indigo-200 bg-opacity-20 px-6 py-6">
                  <h1 className="xl:text-md h-2 w-20 rounded-full bg-gray-200 text-start text-sm text-gray-600 sm:whitespace-nowrap"></h1>
                  <div className="h-2 w-6 rounded-full bg-gray-200 sm:w-28 xl:w-40"></div>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-row items-center justify-between gap-x-12 px-6 py-6">
                  <h1 className="xl:text-md h-2 w-20 rounded-full bg-gray-200 text-start text-sm text-gray-600 sm:whitespace-nowrap"></h1>
                  <div className="h-2 w-6 rounded-full bg-gray-200 sm:w-28 xl:w-40"></div>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-row items-center justify-between gap-x-12 bg-indigo-200 bg-opacity-20 px-6 py-6">
                  <h1 className="xl:text-md h-2 w-20 rounded-full bg-gray-200 text-start text-sm text-gray-600 sm:whitespace-nowrap"></h1>
                  <div className="h-2 w-6 rounded-full bg-gray-200 sm:w-28 xl:w-40"></div>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-row items-center justify-between gap-x-12 px-6 py-6">
                  <h1 className="xl:text-md h-2 w-20 rounded-full bg-gray-200 text-start text-sm text-gray-600 sm:whitespace-nowrap"></h1>
                  <div className="h-2 w-6 rounded-full bg-gray-200 sm:w-28 xl:w-40"></div>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-row items-center justify-between gap-x-12 bg-indigo-200 bg-opacity-20 px-6 py-6">
                  <h1 className="xl:text-md h-2 w-20 rounded-full bg-gray-200 text-start text-sm text-gray-600 sm:whitespace-nowrap"></h1>
                  <div className="h-2 w-6 rounded-full bg-gray-200 sm:w-28 xl:w-40"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingExamProfile;
