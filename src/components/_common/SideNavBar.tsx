import { FC, Fragment, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import clsx from "clsx";
import {
  ArrowUturnLeftIcon,
  EllipsisHorizontalIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Menu, Transition } from "@headlessui/react";
import { FireIcon } from "@heroicons/react/20/solid";

import ExercisesImage from "/src/assets/education_2.png";
import ExamImage from "/src/assets/exam.png";
import TestImage from "/src/assets/test_2.png";
import LeaderboardImage from "/src/assets/leaderboard.png";
import SettingsImage from "/src/assets/settings.png";
import FireImage from "/src/assets/fire.png";
import { SoundContext } from "../../templates/Authenticated/Authenticated";
import { getStreaks } from "../../api/stats/stats";
import FireImageStreak from "/src/assets/fire_icon.png";
import StatisticsImage from "/src/assets/statistics.png";
import { HiOutlineMail } from "react-icons/hi";
import { RiWhatsappLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";

interface SupportModalProps {
  onClose: () => void;
}

const SupportModal: FC<SupportModalProps> = ({ onClose }) => {
  const openMailClient = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const [closing, setClosing] = useState(false); // State to handle closing animation

  const handleClose = () => {
    setClosing(true); // Trigger the closing animation
    setTimeout(() => {
      onClose(); // After animation duration, actually close the modal
    }, 300); // Adjust this duration to match your animation duration
  };

  return (
    <div
      className={`absolute bottom-14 right-0 z-50 w-56 sm:bottom-20 lg:right-2 ${
        closing ? "animate-jump-out" : "animate-jump-in"
      } rounded-lg bg-white p-8 shadow-md ring-1 ring-gray-200 transition-all duration-300 ease-in-out`}
    >
      <button
        className="absolute right-0 top-0 mr-4 mt-4"
        onClick={handleClose}
      >
        <AiOutlineClose className="h-5 w-5 text-gray-400 transition duration-200 hover:scale-125 hover:text-indigo-700 " />
      </button>
      <h2 className="mb-4 flex w-full justify-center font-semibold text-gray-500">
        Fala connosco!
      </h2>
      <div className="flex items-center justify-center gap-4">
        <a
          href="https://chat.whatsapp.com/LCtk34GVPWREGuHS3BvH0r"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiWhatsappLine className="h-8 w-8 cursor-pointer text-indigo-600 transition duration-200 hover:scale-110 hover:text-green-600" />
        </a>
        <button onClick={() => openMailClient("dev.studenthub@gmail.com")}>
          <HiOutlineMail className="h-8 w-8 cursor-pointer text-indigo-600 transition duration-200 hover:scale-110 hover:text-red-500" />
        </button>
      </div>
    </div>
  );
};

interface NavBarItemDesktopProps {
  name: string;
  href: string;
  imageUrl: string;
  current: string;
}

const NavBarItemDesktop: FC<NavBarItemDesktopProps> = ({
  name,
  href,
  imageUrl,
  current,
}) => {
  return (
    <div>
      <li>
        <Link
          to={href}
          className={clsx(
            // Compare the current root path to this element's and style accordingly
            current.includes(href.split("/")[1])
              ? "bg-indigo-50 text-indigo-700 ring-2 ring-indigo-400"
              : "delay-15 text-gray-700 ring-2 ring-transparent transition duration-300 ease-in-out hover:bg-gray-50 hover:text-indigo-700",
            "text-md group flex flex-row items-center gap-x-6 rounded-lg px-4 py-2 font-semibold",
          )}
        >
          <img
            className={`${href.includes("statistics") ? "rounded-full" : ""} h-6 w-6 `}
            src={imageUrl}
          />

          <p className="mr-4 text-sm">{name}</p>
        </Link>
      </li>
    </div>
  );
};

const NavBarDesktopItemChallenge: FC = ({}) => {
  return (
    <div>
      <li>
        <Link
          to={"https://participa.umso.co/"}
          target="_blank"
          className="from-33% via-66% to-99% parent text-md group group flex flex-row items-center gap-x-6 overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 via-rose-600 to-orange-500 px-4 py-2 font-semibold shadow-md transition-all duration-300 ease-in-out hover:cursor-pointer hover:shadow-indigo-500/30 hover:hue-rotate-15"
        >
          <FireIcon className="h-6 w-6 text-white" />

          <p className="mr-4 text-sm text-white">Challenge</p>
        </Link>
      </li>
    </div>
  );
};

interface NavBarItemMobileProps {
  href: string;
  imageUrl: string;
  current: string;
}

const NavBarItemMobile: FC<NavBarItemMobileProps> = ({
  href,
  imageUrl,
  current,
}) => {
  return (
    <div
      className={clsx(
        // Compare the current root path to this element's and style accordingly
        current.includes(href.split("/")[1])
          ? "bg-indigo-50 ring-2 ring-indigo-400"
          : "delay-15 ring-2 ring-transparent transition duration-300 ease-in-out hover:bg-gray-50",
        " flex items-center justify-center rounded-lg p-1 sm:p-2",
      )}
    >
      <Link to={href}>
        <img
          className={` ${href.includes("statistics") ? "rounded-full" : ""} h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10`}
          src={imageUrl}
        />
      </Link>
    </div>
  );
};

const NavBarMobileItemChallenge: FC = () => {
  return (
    <div className="flex items-center justify-center rounded-lg p-1 transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-gray-50 sm:p-2">
      <Link to="https://participa.umso.co/" target="_blank">
        <img
          className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10"
          src={FireImage}
        />
      </Link>
    </div>
  );
};

interface SideNavBarProps {
  current: string;
  handleSignOut: () => void;
}

const SideNavBarDesktop: FC<SideNavBarProps> = ({ current, handleSignOut }) => {
  // Sound context
  const { soundEnabled, setSoundEnabled } = useContext(SoundContext);
  const [showSupportModal, setShowSupportModal] = useState(false);

  // State to store the user streak
  const [streak, setStreak] = useState<number>(0);

  // Function to fetch the user streak
  const getStreak = async () => {
    try {
      const response = await getStreaks();
      setStreak(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  // On mount fetch the user streak
  useEffect(() => {
    getStreak();
  }, []);

  return (
    <div className="fixed inset-y-0 z-20 flex w-60 border-r border-gray-200 lg:flex-col">
      <div className="flex grow flex-col items-center gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        <h3 className="mb-1 mt-6 flex h-10 items-center justify-center text-center text-2xl font-semibold text-indigo-600">
          {" "}
          student hub.{" "}
        </h3>

        {/*Streak Counter*/}
        <div className="mb-3 flex w-full flex-col items-center justify-center divide-y divide-gray-200 px-8">
          <div className=" w-full"></div>
          <div className="text-md flex w-full flex-row items-end justify-center gap-x-2 gap-y-1 px-3 py-2 font-semibold ">
            <img className="h-5 w-5" src={FireImageStreak} />
            <p className="text-center  text-xs text-gray-600">{streak}º dia</p>
          </div>
          <div className=" w-full"></div>
        </div>

        <nav className="flex flex-1 flex-col px-2">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-2">
                <NavBarItemDesktop
                  name="Modo Livre"
                  href="/exercises"
                  imageUrl={ExercisesImage}
                  current={current}
                />
                <NavBarItemDesktop
                  name="Modo Exame"
                  href="/examMode"
                  imageUrl={ExamImage}
                  current={current}
                />
                <NavBarItemDesktop
                  name="Modo Teste"
                  href="/test-mode"
                  imageUrl={TestImage}
                  current={current}
                />
                <NavBarItemDesktop
                  name="Leaderboard"
                  href="/leaderboard/students"
                  imageUrl={LeaderboardImage}
                  current={current}
                />
                <NavBarItemDesktop
                  name="Definições"
                  href="/settings/profile"
                  imageUrl={SettingsImage}
                  current={current}
                />
                <NavBarItemDesktop
                  name="Estatísticas"
                  href="/statistics"
                  imageUrl={StatisticsImage}
                  current={current}
                />
                <NavBarDesktopItemChallenge />
              </ul>
            </li>

            <li className="delay-110 mb-0 mt-auto flex items-center justify-center gap-4 gap-x-12 text-sm text-gray-500 transition duration-300 ease-in-out ">
              <div className="flex w-full items-center justify-between">
                <a
                  href="login"
                  onClick={handleSignOut}
                  className="group -mx-2 flex cursor-pointer gap-x-3 rounded-md p-2 text-sm font-semibold leading-6  hover:text-indigo-700"
                >
                  <ArrowUturnLeftIcon
                    className="h-6 w-6 shrink-0"
                    aria-hidden="true"
                  />
                  Sair
                </a>

                <div className=" flex w-fit items-center justify-center divide-x divide-gray-200">
                  {soundEnabled ? (
                    <SpeakerWaveIcon
                      className="h-7 w-7 cursor-pointer pr-2 hover:text-indigo-700"
                      aria-hidden="true"
                      onClick={() => setSoundEnabled(false)}
                    />
                  ) : (
                    <SpeakerXMarkIcon
                      className="h-7 w-7 cursor-pointer pr-2  hover:text-indigo-700"
                      aria-hidden="true"
                      onClick={() => setSoundEnabled(true)}
                    />
                  )}

                  <QuestionMarkCircleIcon
                    onClick={() => setShowSupportModal(!showSupportModal)}
                    className="h-7 w-7 cursor-pointer pl-1.5 hover:text-indigo-700 "
                  />

                  {showSupportModal && (
                    <SupportModal onClose={() => setShowSupportModal(false)} />
                  )}
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

interface NavBarItemMobileMoreOptionsProps {
  current: string;
  setShowSupportModal: (value: boolean) => void;
  showSupportModal: boolean;
}

const NavBarItemMobileMoreOptions: FC<NavBarItemMobileMoreOptionsProps> = ({
  current,
  setShowSupportModal,
  showSupportModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu
      as="div"
      className={clsx(
        isOpen &&
          "bg-indigo-50 ring-2 ring-indigo-400 transition-all duration-300 ease-in-out hover:bg-indigo-50",
        "delay-15 relative flex items-center justify-center rounded-lg p-1 transition duration-300 ease-in-out hover:bg-gray-50 sm:p-2",
      )}
    >
      <Menu.Button as="div" onClick={() => {setIsOpen(!isOpen), setShowSupportModal(false)}}>
        <EllipsisHorizontalIcon className="h-6 w-6 text-indigo-600 sm:h-8 sm:w-8 md:h-10 md:w-10" />
      </Menu.Button>
      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Menu.Items className="absolute bottom-14 right-0 flex w-44 flex-col items-center justify-center gap-y-2 rounded-lg bg-white p-2 ring-1 ring-gray-200 focus:outline-none sm:bottom-20">
          <Menu.Item>
            <ul onClick={() => setIsOpen(false)}>
              <NavBarItemDesktop
                name={"Leaderboard"}
                href="/leaderboard/students"
                imageUrl={LeaderboardImage}
                current={current}
              />
            </ul>
          </Menu.Item>
          <Menu.Item>
            <ul onClick={() => setIsOpen(false)}>
              <NavBarItemDesktop
                name="Definições"
                href={
                  window.innerWidth > 640 ? "/settings/profile" : "/settings"
                }
                imageUrl={SettingsImage}
                current={current}
              />
            </ul>
          </Menu.Item>
          <Menu.Item>
            <ul onClick={() => setIsOpen(false)}>
              <NavBarItemDesktop
                href="/statistics"
                imageUrl={StatisticsImage}
                current={current}
                name={"Estatísticas"}
              />
            </ul>
          </Menu.Item>
          <Menu.Item>
            <ul onClick={() => setIsOpen(false)}>
              <div>
                <li>
                  <div
                    onClick={() => setShowSupportModal(!showSupportModal)}
                    className={clsx(
                      // Compare the current root path to this element's and style accordingly
                      showSupportModal
                        ? "bg-indigo-50 text-indigo-700 ring-2 ring-indigo-400"
                        : "delay-15 text-gray-700 ring-2 ring-transparent transition duration-300 ease-in-out hover:bg-gray-50 hover:text-indigo-700",
                      "text-md group flex flex-row items-center gap-x-6 rounded-lg px-4 py-2 font-semibold",
                    )}
                  >
                    <QuestionMarkCircleIcon className="h-6 w-6 hover:text-indigo-700 " />
                    <p className="mr-4 text-sm">Contactos</p>
                  </div>
                </li>
              </div>
            </ul>
          </Menu.Item>
        </Menu.Items>
      </Transition>
      {showSupportModal && (
        <SupportModal onClose={() => setShowSupportModal(false)} />
      )}
    </Menu>
  );
};

const SideNavBarMobile: FC<SideNavBarProps> = ({ current, handleSignOut }) => {
  // Sound context
  const { soundEnabled, setSoundEnabled } = useContext(SoundContext);
  const [showSupportModal, setShowSupportModal] = useState(false);

  // State to store the user streak
  const [streak, setStreak] = useState<number>(0);

  // Function to fetch the user streak
  const getStreak = async () => {
    try {
      const response = await getStreaks();
      setStreak(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  // On mount fetch the user streak
  useEffect(() => {
    getStreak();
  }, []);

  // State to store the dialog open state
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // After 3 seconds close the dialog
  useEffect(() => {
    if (isDialogOpen) {
      setTimeout(() => {
        setIsDialogOpen(false);
      }, 1500);
    }
  }, [isDialogOpen]);

  return (
    <div className="flex flex-row items-center justify-center gap-x-10 border border-gray-200 bg-white px-6 py-2">
      <div className=" absolute left-4 flex items-center justify-center gap-3">
        {soundEnabled ? (
          <SpeakerWaveIcon
            className="h-4 w-4 shrink-0 cursor-pointer text-gray-500 hover:text-indigo-700 sm:h-6 sm:w-6 md:h-8  md:w-8"
            aria-hidden="true"
            onClick={() => setSoundEnabled(false)}
          />
        ) : (
          <SpeakerXMarkIcon
            className="shrink-o h-4 w-4 cursor-pointer text-gray-500 hover:text-indigo-700 sm:h-6 sm:w-6 md:h-8  md:w-8"
            aria-hidden="true"
            onClick={() => setSoundEnabled(true)}
          />
        )}
      </div>
      <div className="flex flex-row items-center gap-x-3 sm:gap-x-5">
        <div
          className="relative flex cursor-pointer items-center justify-center rounded-lg bg-gray-100 p-1 ring-2 ring-gray-100 sm:p-2"
          onClick={() => setIsDialogOpen(true)}
        >
          <img
            className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10"
            src={FireImageStreak}
          />
          <p className="absolute bottom-0.5 right-0.5 flex h-3 w-3 flex-row items-center justify-center whitespace-nowrap rounded-full bg-white text-center text-xs font-semibold text-gray-500 ring-1 ring-gray-100 sm:bottom-1 sm:right-1 sm:h-4 sm:w-4 md:bottom-1.5 md:right-1.5">
            {streak}
          </p>
          {isDialogOpen && (
            <p className="absolute -top-14 left-0 w-44 rounded-md bg-white px-2 py-1 text-center text-xs font-semibold text-gray-500 shadow ring-1 ring-gray-200 duration-200 animate-in fade-in slide-in-from-bottom-2">
              Utilizaste o student hub por{" "}
              <span className="font-bold text-indigo-700">{streak}</span> dias
              consecutivos!
            </p>
          )}
        </div>
        <NavBarItemMobile
          href="/exercises"
          imageUrl={ExercisesImage}
          current={current}
        />
        <NavBarItemMobile
          href="/examMode"
          imageUrl={ExamImage}
          current={current}
        />
        <NavBarItemMobile
          href="/test-mode"
          imageUrl={TestImage}
          current={current}
        />

        <NavBarMobileItemChallenge />

        <NavBarItemMobileMoreOptions current={current} setShowSupportModal={setShowSupportModal} showSupportModal={showSupportModal} />
      </div>
      <a
        href="login"
        onClick={handleSignOut}
        className="absolute right-4 sm:right-6"
      >
        <ArrowUturnLeftIcon
          className="delay-110 h-4 w-4 shrink-0 cursor-pointer text-gray-500 transition duration-300 ease-in-out hover:text-indigo-700 sm:h-6 sm:w-6 md:h-8  md:w-8"
          aria-hidden="true"
        />
      </a>
    </div>
  );
};

const SideNavBar: FC = () => {
  // Get the current location root path
  const location = "/" + useLocation().pathname.split("/")[1];

  // Sign out functionality
  const navigate = useNavigate();
  const handleSignOut = () => {
    try {
      const response = signOut(auth);
      console.log("Success signing out user in Firebase", response);
    } catch (error) {
      console.log("Error signing out user in Firebase", error);
    }
    navigate("/login");
  };

  return (
    <div className="lg:min-h-screen">
      <div className="hidden lg:block">
        <SideNavBarDesktop current={location} handleSignOut={handleSignOut} />
      </div>
      <div className="fixed bottom-0 z-20 block w-full lg:hidden">
        <SideNavBarMobile current={location} handleSignOut={handleSignOut} />
      </div>
    </div>
  );
};

export default SideNavBar;
