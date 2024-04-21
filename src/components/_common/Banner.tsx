import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { AcademicCapIcon } from "@heroicons/react/20/solid";

function countDown() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 20000);
  });
}

function Banner() {
  const [showBanner, setShowBanner] = useState(true);

  const handleHideBanner = async () => {
    setShowBanner(false);
    await countDown();
    setShowBanner(true);
  };

  if (!showBanner) return null;

  return (
    <div
      onClick={() => window.open("https://studenthub-explicacoes.com/", "_blank")}
      className="from-33% via-66% to-99% parent group flex w-full min-w-fit fit  max-w-screen-2xl flex-row items-center overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 via-rose-600 to-orange-500 px-6 py-3 shadow-md transition-all duration-200 animate-in fade-in slide-in-from-top-8 hover:cursor-pointer hover:shadow-md hover:shadow-indigo-500/50 hover:hue-rotate-15 sm:px-3.5 sm:before:flex-1"
    >
      <div className="flex flex-row items-center justify-start gap-x-1 text-xs leading-6 text-white sm:justify-center sm:text-sm">
        <AcademicCapIcon className="hidden h-4 w-4 text-white sm:block" />
        <strong className="hidden font-semibold sm:block">Explicações</strong>
        <svg
          viewBox="0 0 2 2"
          className="mx-2 hidden h-0.5 w-0.5 fill-white sm:inline"
        >
          <circle cx="1" cy="1" r="1" />
        </svg>
        <p className="hidden md:block">
          Queres melhorar as tuas notas? Nós ajudamos!
        </p>
        <svg
          viewBox="0 0 2 2"
          className="mx-2 hidden h-0.5  w-0.5 fill-white md:inline"
        >
          <circle cx="1" cy="1" r="1" />
        </svg>
        <div className="flex flex-row items-center justify-center gap-x-3 font-medium text-white sm:font-semibold ">
          <p className="hidden sm:block">Primeira aula grátis!</p>
          <p className="block text-sm sm:hidden">Primeira explicação grátis!</p>
          <ArrowLongRightIcon className="h-4 w-4 group-hover:duration-700 group-hover:animate-in group-hover:slide-in-from-left-2 group-hover:animate-infinite" />
        </div>
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        className="children flex flex-1 justify-end"
      >
        <XMarkIcon
          className="h-5 w-5 text-white  hover:cursor-pointer"
          onClick={handleHideBanner}
        />
      </div>
    </div>
  );
}

export default Banner;
