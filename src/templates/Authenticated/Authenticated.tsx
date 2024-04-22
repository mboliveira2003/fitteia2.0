import { FC, createContext, useState} from "react";
import { Outlet } from "react-router-dom";

import SideNavBar from "components/_common/SideNavBar";
import TopographyPattern from "components/_common/visuals/backgrounds/TopographyPattern";

interface SoundContextProps {
  soundEnabled: boolean;
  setSoundEnabled: (soundEnabled: boolean) => void;
}

export const SoundContext = createContext<SoundContextProps>({
  soundEnabled: true,
  setSoundEnabled: () => {},
});

const Authenticated: FC = () => {
  // State to store wether the sound is enabled or not
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  // Sound context values
  const contextValues = { soundEnabled, setSoundEnabled };

  return (
    <SoundContext.Provider value={contextValues}>
      <div className="flex min-h-screen flex-1 flex-col pb-20 dark:bg-gray-800 md:flex-row lg:pb-0">
        <SideNavBar />
        
        <TopographyPattern />

        <div className="top-0 flex w-full flex-col items-center gap-y-6 px-7 py-5 sm:ml-0 sm:px-10 sm:py-7">
          <Outlet />
        </div>
      </div>
    </SoundContext.Provider>
  );
};

export default Authenticated;
