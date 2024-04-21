// PlanCard.tsx
import React from "react";
import { TiTick } from "react-icons/ti";

interface PlanCardProps {
  title: string;
  plan: string;
  price: string;
  bulletPoints: string[];
}

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  price,
  bulletPoints,
}) => {
  return (
    <div className="just flex w-full min-w-32 flex-col items-center gap-5 rounded-xl border-2 border-gray-300 py-9">
      <div className="flex w-full flex-col justify-between gap-8 px-8 text-start">
        <h1 className="text-[1.0em] font-semibold text-gray-600">{title}</h1>
        <div className="w-11/12 rounded-md text-gray-800">
          <h1 className="text-[1.0em] text-base">
            <span className="text-[2.1em] font-bold">{price}</span>{" "}
            <span className="text-gray-500"> por mês</span>
          </h1>
        </div>
      </div>
      <div className="mt-9 flex h-full w-full gap-11">
        <ul className="flex w-full flex-col gap-4 px-8 ">
          {bulletPoints.map((point, index) => (
            <div key={index} className="flex w-full items-center gap-4">
              <TiTick className="size-7 text-indigo-500" />
              <li className="flex w-full items-center gap-3 text-sm">
                {point}
              </li>
            </div>
          ))}
        </ul>
      </div>
      <div className=" py-4">
        <div className="mt-5 flex w-48  transform cursor-pointer items-center justify-center rounded-full border border-gray-400 py-4 transition duration-500 hover:scale-110 hover:border-0 hover:bg-indigo-500 hover:text-white">
          <div className="flex items-center justify-evenly gap-8">
            <p className="text-base">Comprar Agora</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
