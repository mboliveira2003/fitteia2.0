import { FC } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

/** This interface is a page to display in the breadcrumbs.
 * It can then be clicked to navigate to that page.
 *
 * @param name: The name of the page
 * @param onClick: The function to call when the page is clicked
 */

export interface Page {
  name: string | any;
  onClick?: () => void;
  path?: string;
}

/** This component is a breadcrumbs to display the current page and allow the
 * user to navigate back to previous pages
 *
 * @param pages: The pages to display
 */

interface BreadcrumbsProps {
  pages: Page[];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ pages }: BreadcrumbsProps) => {
  // Grab second to last page in the array and go back to that page. If there is one or less pages, goBack() will do nothing
  function goBack() {
    if (pages.length <= 1) {
      return;
    }
    const page = pages[Math.max(pages.length - 2, 0)];
    page.onClick && page.onClick();
  }

  return (
    <nav className="flex" aria-label="Breadcrumb">
  
      <div key={pages.length - 1} className="flex items-center lg:hidden ">
        <ChevronLeftIcon
          className="-ml-2 mr-2 sm:h-6 sm:w-6 h-5 w-5 text-gray-400 hover:cursor-pointer hover:text-gray-600 "
          onClick={goBack}
        />

        <p className="font-normal text-md text-gray-500 animate-in duration-300 fade-in slide-in-from-left-2">
          {pages.length > 1 && pages[pages.length - 1].name}
        </p>
      </div>

      <ol role="list" className="hidden items-center space-x-4 lg:flex">
        {pages.map((page, index) => (
          <li key={index}>
            <div className="flex flex-row items-center">
              {
                /* Breadcrumb separator. Only show if it's not the first list item */
                pages.indexOf(page) !== 0 && (
                  <ChevronRightIcon className="-ml-2 mr-2  h-4 w-4 text-gray-400 animate-in fade-in slide-in-from-left-2" />
                )
              }

              <a
                onClick={page.onClick}
                className={`font-small text-sm text-gray-400 hover:text-gray-600 ${
                  pages.indexOf(page) === pages.length - 1
                    ? "cursor-default"
                    : "cursor-pointer"
                }`}
              >
                <p className="animate-in fade-in slide-in-from-left-2">
                  {page.name}
                </p>
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
