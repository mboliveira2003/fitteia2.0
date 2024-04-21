import { Transition } from "@headlessui/react";
import { FC, ReactElement } from "react";


interface SectionTransitionProps {
    children: ReactElement;
    show: boolean;
  }

const SectionTransition: FC<SectionTransitionProps> = ({
    children,
    show,
  }): ReactElement => {
    return (
      <Transition
        appear={true}
        show={show}
        enter="transition-all ease-in-out duration-250"
        enterFrom="-translate-x-10 opacity-5"
        enterTo="translate-x-0 opacity-100"
        leave="duration-0 hidden"
        className="w-full"
      >
        {children}
      </Transition>
    );
  };

export default SectionTransition