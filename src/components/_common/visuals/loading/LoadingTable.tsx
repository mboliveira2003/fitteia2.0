const LoadingTable = () => {
  return (
    <div className="animate-pulse duration-1000">
      <table className="w-full divide-y divide-gray-200 text-left text-xs text-gray-500 lg:text-sm rtl:text-right">
        <thead className="">
          <tr className="table-row items-center">
            <th scope="col" className="px-4 py-3 sm:px-6"></th>
            <th scope="col" className=" table-cell px-4 py-3 sm:px-6">
              <div className="flex h-4 w-20 flex-row items-center gap-x-1.5 rounded-md bg-gray-200 font-medium text-gray-600"></div>
            </th>
            <th scope="col" className=" hidden px-4 py-3 sm:table-cell sm:px-6">
              <div className="flex h-4 w-20 flex-row items-center gap-x-1.5  rounded-md whitespace-nowrap bg-gray-200 font-medium text-gray-600"></div>
            </th>
            <th scope="col" className=" hidden px-4 py-3 sm:px-6 lg:table-cell">
              <div className="flex h-4 w-20 flex-row items-center gap-x-1.5 rounded-md whitespace-nowrap bg-gray-200 font-medium text-gray-600"></div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr className="group items-center transition duration-300 ease-in-out sm:table-row">
            <th scope="row" className="px-4 py-3 sm:px-6">
              <div className="flex h-4 w-20 flex-col rounded-md bg-gray-200 "></div>
            </th>

            <td className=" table-cell px-4 py-5 font-medium sm:px-6">
              <div className="flex h-4 w-20 flex-col rounded-md bg-gray-200 "></div>
            </td>
            <td className="hidden px-4 py-5 sm:table-cell sm:px-6">
              <div className="flex h-4 w-20 flex-col rounded-md bg-gray-200 "></div>
            </td>
            <td className="hidden px-4 py-5 sm:px-6 lg:table-cell">
              <div className="flex h-4 w-20 flex-col rounded-md bg-gray-200 "></div>
            </td>
          </tr>
          <tr className="group items-center  transition duration-300 ease-in-out sm:table-row">
            <th scope="row" className="px-4 py-3 sm:px-6">
              <div className="flex h-4 w-20 flex-col rounded-md bg-gray-200 "></div>
            </th>

            <td className=" table-cell px-4 py-4 font-medium sm:px-6">
              <div className="flex h-4 w-20 flex-col rounded-md bg-gray-200 "></div>
            </td>
            <td className="hidden px-4 py-4 sm:table-cell sm:px-6">
              <div className="flex h-4 w-20 flex-col rounded-md bg-gray-200 "></div>
            </td>
            <td className="hidden px-4 py-4 sm:px-6 lg:table-cell">
              <div className="flex h-4 w-20 flex-col rounded-md bg-gray-200 "></div>
            </td>
          </tr>
          <tr className="group items-center  transition duration-300 ease-in-out sm:table-row">
            <th scope="row" className="px-4 py-4 sm:px-6">
              <div className="flex h-4 w-20 flex-col rounded-md bg-gray-200 "></div>
            </th>

            <td className="table-cell px-4 py-4 font-medium sm:px-6">
              <div className="flex h-4 w-20 flex-col rounded-md bg-gray-200 "></div>
            </td>
            <td className="hidden px-4 py-4 sm:table-cell sm:px-6">
              <div className="flex h-4 w-20 flex-col rounded-md bg-gray-200 "></div>
            </td>
            <td className="hidden px-4 py-4 sm:px-6 lg:table-cell">
              <div className="flex h-4 w-20 flex-col rounded-md bg-gray-200 "></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LoadingTable;
