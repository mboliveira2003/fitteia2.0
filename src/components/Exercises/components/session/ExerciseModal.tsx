import { FC, useRef, ReactElement, createContext, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog } from "@headlessui/react";

import Banner from "../../../_common/ChallengeBanner";

interface ExerciseModalContextProps {
  onExerciseCompleted: () => void;
}

export const ExerciseModalContext = createContext<ExerciseModalContextProps>({
  onExerciseCompleted: () => {},
});

interface ExerciseModalProps {
  children: ReactElement;
}

const ExerciseModal: FC<ExerciseModalProps> = ({ children }): ReactElement => {
  // Url params
  const { year, topic, subtopic } = useParams();
  // Function to navigate to a new page
  const navigateTo = useNavigate();
  // Function to scroll to top of the page, passed to the child component
  const dialogRef = useRef(null);
  const onExerciseCompleted = useCallback(() => {
    (dialogRef.current as HTMLElement | null)?.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  // Define the context values
  const contextValues = {
    onExerciseCompleted,
  };

  return (
    <ExerciseModalContext.Provider value={contextValues}>
      <Dialog
        open={true}
        onClose={() => navigateTo(`/exercises/${year}/${topic}/${subtopic}`)}
        className="relative z-40"
      >
        <div className="fixed inset-0 w-full bg-[url(https://tailwindui.com/img/beams-home@95.jpg)]" />
        <div
          className="fixed inset-0 flex w-screen overflow-y-auto"
          ref={dialogRef}
        >
          <Dialog.Panel className="flex w-full flex-col items-center">
            <div className="fit flex w-full min-w-fit max-w-screen-2xl flex-col items-center justify-center gap-y-5 px-7 py-5 sm:px-10 sm:py-7 xl:px-44">
              <Banner />
              {children}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </ExerciseModalContext.Provider>
  );
};

export default ExerciseModal;
