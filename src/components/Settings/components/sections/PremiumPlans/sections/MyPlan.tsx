import React from "react";
import SectionTransition from "../../../../../_common/transitions/Transition";

const MyPlanSection: React.FC = () => {
  const plan = {
    planType: "mensal",
    nextDebit: "10/05/2024",
    planPrice: "9",
    membershipExpiryDate: "10/05/2024",
  };

  return (
    <SectionTransition show={true}>
      <div className="flex w-full flex-col gap-8">
        <div className="flex w-full min-w-32 flex-col gap-7  rounded-xl bg-indigo-200 px-7 py-7 text-white ">
          <h1 className=" text-xl font-bold  text-indigo-800">PLANO ATUAL:</h1>

          <div className="flex w-full justify-center gap-4">
            <div className=" flex h-20 w-full items-center justify-center rounded-xl bg-indigo-800 text-4xl font-bold">
              PLANO {plan.planType.toUpperCase()}
            </div>
            <div className=" flex h-20 w-1/3 items-center justify-center rounded-xl bg-indigo-800  text-4xl  font-bold">
              {plan.planPrice} / mês
            </div>
          </div>
        </div>
        <div className="mt-6 flex w-1/2 items-center justify-between gap-2 text-base">
          <h1 className="">Data do próximo pagamento:</h1>
          <div className="rounded-xl border-2 bg-indigo-200  p-3">
            <h1 className="">{plan.nextDebit}</h1>
          </div>
        </div>
        <div className="flex w-1/2 items-center justify-between gap-2 text-base ">
          <h1 className="">Assinatura caduca:</h1>
          <div className="rounded-xl border-2 bg-indigo-200  p-3">
            <h1 className="">{plan.nextDebit}</h1>
          </div>
        </div>
        <div className="flex flex-col items-end justify-end gap-4">
          <button className=" rounded-xl bg-indigo-600 p-3 text-white">
            Mudar Plano
          </button>
          <button className=" rounded-xl bg-red-600 p-3 text-white">
            Cancelar Assinatura
          </button>
        </div>
      </div>
    </SectionTransition>
  );
};

export default MyPlanSection;
