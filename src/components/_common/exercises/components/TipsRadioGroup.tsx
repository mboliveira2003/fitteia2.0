import { FC } from "react";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import {
  InformationCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";

import ImageZoomContainer from "./ImageZoomContainer";

interface TipsRadioGroupProps {
  tips: string[];
  revealedTips: number;
  setRevealedTips: (tips: number) => void;
}

const TipsRadioGroup: FC<TipsRadioGroupProps> = ({
  tips,
  revealedTips,
  setRevealedTips,
}) => {
  // Functions to get the text displayed in each button
  function getTipButtonText(revealedTips: number): string {
    // Displays the number of revealed tips
    return "Dica " + String(revealedTips + 1);
  }
  function getAnswerButtonText(tips: string[], revealedTips: number): string {
    // All tips have been revealed
    if (revealedTips === tips.length) {
      return "Resposta revelada";
    }
    return "Resposta";
  }

  return (
    <div className="flex w-full flex-col divide-y">
      <div className="flex flex-row items-center justify-center gap-x-2 gap-y-2 px-6 py-4 sm:justify-start">
        {/**If there is only one tip, show only the answer button*/}
        {tips.length === 1 && (
          <>
            <button
              type="button"
              className={`sm:text-md relative flex w-full cursor-pointer flex-row items-center justify-center gap-x-1.5 rounded-lg px-6 py-1 text-sm font-medium text-gray-800 transition duration-200 ease-in-out hover:cursor-pointer hover:bg-gray-100 focus:outline-none sm:w-fit sm:justify-start sm:px-4 sm:py-2 ${
                // If all tips have been revealed the buton becomes static
                revealedTips === tips.length &&
                "bg-gray-100 duration-300 animate-in slide-in-from-right-10"
              }`}
              onClick={() => setRevealedTips(tips.length)}
            >
              <LightBulbIcon className=" h-5 w-5" />
              {getAnswerButtonText(tips, revealedTips)}
            </button>
          </>
        )}
        {/**If there are more than one tip, show the tips and answer buttons */}
        {tips.length > 1 && (
          <>
            <button
              type="button"
              className={`sm:text-md relative flex w-full cursor-pointer flex-row items-center justify-center gap-x-1.5 rounded-lg px-6 py-1 text-sm font-medium text-gray-800 transition duration-200 ease-in-out hover:cursor-pointer hover:bg-gray-100 focus:outline-none sm:w-fit sm:justify-start sm:px-4 sm:py-2 ${
                // If all tips have been revealed the tips button disapears
                revealedTips === tips.length && "hidden"
              }`}
              onClick={() => setRevealedTips(revealedTips + 1)}
            >
              <InformationCircleIcon className=" h-5 w-5" />
              {getTipButtonText(revealedTips)}
            </button>
            <button
              type="button"
              className={`sm:text-md relative flex w-full cursor-pointer flex-row items-center justify-center gap-x-1.5 rounded-lg px-6 py-1 text-sm font-medium text-gray-800 transition duration-200 ease-in-out hover:cursor-pointer hover:bg-gray-100 focus:outline-none sm:w-fit sm:justify-start sm:px-4 sm:py-2 ${
                // If all tips have been revealed the buton becomes static
                revealedTips === tips.length &&
                "bg-gray-100 duration-300 animate-in slide-in-from-right-10"
              }`}
              onClick={() => setRevealedTips(tips.length)}
            >
              <LightBulbIcon className=" h-5 w-5" />
              {getAnswerButtonText(tips, revealedTips)}
            </button>
          </>
        )}
        {/**If there are no tips, don´t display the tips and answer buttons */}
        {tips.length === 0 && (
          <div className="sm:text-md relative flex w-full cursor-pointer flex-row items-center justify-center gap-x-1.5 rounded-lg bg-gray-100 px-6 py-1 text-sm font-medium text-gray-800 transition duration-200 ease-in-out hover:cursor-pointer hover:bg-gray-100 focus:outline-none sm:w-fit sm:justify-start sm:px-4 sm:py-2">
            <ExclamationCircleIcon className=" h-5 w-5" />
            Sem dicas.
          </div>
        )}
      </div>
      {/**Display as many tip images as revealed tips*/}
      {tips.slice(0, revealedTips).map((tip) => (
        <div
          key={tips.indexOf(tip)}
          className="relative flex items-center justify-center duration-300 animate-in fade-in slide-in-from-top-6"
        >
          <div className="min-h-28">
            <ImageZoomContainer>
              <img
                src={tip}
                className="mx-auto w-full  px-4 py-20  sm:px-10 sm:py-8"
              />
            </ImageZoomContainer>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TipsRadioGroup;
