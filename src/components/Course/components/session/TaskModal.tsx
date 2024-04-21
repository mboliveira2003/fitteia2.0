import { FC, useRef, ReactElement, useCallback, createContext } from "react";
import { Dialog } from "@headlessui/react";
import { useParams, useNavigate } from "react-router-dom";

import Banner from "../../../_common/ChallengeBanner";

interface TaskModalContextProps {
  onTaskCompleted: () => void;
}

export const TaskModalContext = createContext<TaskModalContextProps>({
  onTaskCompleted: () => {},
});

interface TaskModalProps {
  children: ReactElement;
}

const TaskModal: FC<TaskModalProps> = ({ children }): ReactElement => {
  // Url params
  const { courseTopic } = useParams();
  // Function to navigate to a new page
  const navigateTo = useNavigate();
  // Function to scroll to top of the page, passed to the child component
  const dialogRef = useRef(null);
  const onTaskCompleted = useCallback(() => {
    (dialogRef.current as HTMLElement | null)?.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  // Define the context values
  const contextValues = {
    onTaskCompleted,
  };

  return (
    <TaskModalContext.Provider value={contextValues}>
      <Dialog
        open={true}
        onClose={() => {
          navigateTo(`/examMode/course/${courseTopic}`);
        }}
        className="relative z-40"
      >
        <div className="fixed inset-0 w-full bg-[url(https://tailwindui.com/img/beams-home@95.jpg)]" />
        <div
          className="fixed inset-0 flex w-full overflow-y-auto"
          ref={dialogRef}
        >
          <Dialog.Panel className="flex w-full flex-col items-center">
            <div className="fit flex w-full min-w-fit max-w-screen-2xl flex-col justify-center gap-y-5 px-7 py-5 sm:px-10 sm:py-7 xl:px-44">
              <Banner />
              {children}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </TaskModalContext.Provider>
  );
};

export default TaskModal;
