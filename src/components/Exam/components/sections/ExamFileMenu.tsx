import { FC, useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";

interface ExamFileMenuProps {
  examLink: string;
  resolutionLink: string;
  criteriaLink: string;
}

const ExamFileMenu: FC<ExamFileMenuProps> = ({
  examLink,
  resolutionLink,
  criteriaLink,
}) => {
  // State to store the open state of the menu
  const [open, setOpen] = useState(false);

  return (
    <Menu as="div" className="flex h-full items-end">
      <Menu.Button
        onClick={() => setOpen(!open)}
        as="div"
        className="sm:text-md flex flex-row items-center gap-x-1 rounded-md pb-0.5 text-sm  font-medium text-gray-500 transition duration-300 ease-in-out hover:cursor-pointer focus:z-10 sm:gap-x-1.5 sm:bg-gray-100 sm:px-4 sm:py-2 sm:text-gray-600 "
      >
        Documentos Úteis
        {/**Change appearance according to state */}
        {!open && <ChevronDownIcon className="-mb-0.5 h-5 w-5 sm:h-6 sm:w-6" />}
        {open && <ChevronUpIcon className="-mb-0.5 h-5 w-5 sm:h-6 sm:w-6" />}
      </Menu.Button>
      <Transition
        show={open}
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Menu.Items className="absolute right-0 top-8 z-30 w-fit rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:top-14">
          <div className="sm:text-md px-1 py-1 text-sm text-gray-600">
            <Menu.Item>
              <a
                href={examLink}
                target="_blank"
                className="block px-4 py-2 hover:text-indigo-600"
              >
                Prova
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                href={resolutionLink}
                target="_blank"
                className="block px-4 py-2 hover:text-indigo-700"
              >
                Resolução
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                href={criteriaLink}
                target="_blank"
                className="block px-4 py-2 hover:text-indigo-700 "
              >
                Critérios
              </a>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ExamFileMenu;
