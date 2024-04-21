import { FC, ReactElement, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import SectionTransition from "../_common/transitions/Transition";

interface SettingsProps {
  href: string;
}

const SettingsMenu: FC<SettingsProps> = ({ href }): ReactElement => {
  const navigate = useNavigate();

  const handleItemClick = (
    item: "Profile" | "Premium" | "Master-Class" | "Change-Password",
  ) => {
    navigate(`/settings/${item.toLowerCase()}`);
  };

  return (
    <div className=" flex h-full w-fit min-w-fit items-start">
      <div className="flex h-fit  w-full rounded-xl border-2 border-gray-200 ">
        <div className="w-full p-4">
          <nav className="flex flex-col justify-start gap-y-2">
            <button
              className={`${
                href === "/settings/profile"
                  ? "bg-indigo-50 font-semibold text-indigo-600 ring-2 ring-indigo-500"
                  : ""
              } flex items-center gap-4 rounded-md px-4 py-3 pl-6 text-start text-sm font-semibold text-gray-600 hover:text-indigo-700 transition animate-duration-300`}
              onClick={() => handleItemClick("Profile")}
            >
              {/* <img src={MasterClassImage} className=" size-6" alt="" /> */}
              Profile
            </button>
            {/* <button
              className={`${
                href === "/settings/premium"
                  ? "bg-indigo-50 font-semibold text-indigo-600 ring-2 ring-indigo-500"
                  : ""
              } flex items-center gap-2 rounded-md px-4 py-1 text-start text-sm font-semibold text-gray-600`}
              onClick={() => handleItemClick("Premium")}
            >
              <img src={crownFirst} className=" size-10" alt="" />
              Student Hub Premium
            </button> */}
            <button
              className={`${
                href === "/settings/master-class"
                  ? "bg-indigo-50 font-semibold text-indigo-600 ring-2 ring-indigo-500"
                  : ""
              } flex items-center gap-4 rounded-md px-4 py-3 pl-6 text-start text-sm font-semibold text-gray-600  hover:text-indigo-700 transition animate-duration-300`}
              onClick={() => handleItemClick("Master-Class")}
            >
              {/* <img src={MasterClassImage} className=" size-6" alt="" /> */}
              Master Class Exame
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

const SettingsMobileMenu: FC = (): ReactElement => {
  const navigate = useNavigate();

  const handleItemClick = (
    item: "Profile" | "Premium" | "Master-Class" | "Change-Password",
  ) => {
    navigate(`/settings/${item.toLowerCase()}`);
  };

  return (
    <div className="flex w-full min-w-fit flex-col items-center justify-center gap-5">
      <div className=" w-full">
        <h1 className="text-xl font-semibold tracking-tight text-gray-800 ">
          Definições
        </h1>
      </div>
      <div className="flex h-full w-full items-center rounded-xl border-2 border-gray-200 ">
        <div className="w-full p-4">
          <nav className="flex flex-col justify-start gap-y-2">
            <button
              className={`flex items-center justify-between gap-4 rounded-xl border-2 px-4 py-3 pl-6 text-start text-sm font-semibold text-gray-600`}
              onClick={() => handleItemClick("Profile")}
            >
              {/* <img src={MasterClassImage} className=" size-6" alt="" /> */}
              Profile
              <IoIosArrowForward size={20} className=" opacity-80" />
            </button>
            {/* <button
              className={`flex items-center gap-2 rounded-md px-4 py-1 text-start text-sm font-semibold text-gray-600`}
              onClick={() => handleItemClick("Premium")}
            >
              <img src={crownFirst} className=" size-10" alt="" />
              Student Hub Premium
            </button> */}
            <button
              className={`flex items-center justify-between gap-4 rounded-xl border-2  px-4 py-3 pl-6 text-start text-sm font-semibold text-gray-600`}
              onClick={() => handleItemClick("Master-Class")}
            >
              {/* <img src={MasterClassImage} className=" size-6" alt="" /> */}
              Master Class Exame
              <IoIosArrowForward size={20} className=" opacity-80" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

const SettingsLayout: FC = (): ReactElement => {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640 && location == "/settings") {
        navigate("/settings/profile");
      }
    };

    // Initial check
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [location]);

  return (
    <SectionTransition show={true}>
      <div className="fit flex w-full min-w-fit max-w-screen-2xl gap-x-6 gap-y-5">
        <div className="hidden w-full sm:flex sm:gap-8">
          <SettingsMenu href={location} />
          <Outlet />
        </div>

        <div className="flex h-full w-full flex-col items-center justify-center sm:hidden">
          {location === "/settings" && <SettingsMobileMenu />}
          <Outlet />
        </div>
      </div>
    </SectionTransition>
  );
};

export default SettingsLayout;