import React from "react";
import SectionTransition from "../../../../_common/transitions/Transition";
import MyPlanSection from "./sections/MyPlan";
import PremiumPlansSection from "./sections/PremiumPlans";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const PremiumPlansLayout: React.FC = () => {
  const hasPLan = false;

  const navigate = useNavigate();

  const navigateToSettings = () =>{

    navigate("/settings")
  }


  return (
    <SectionTransition show={true}>
      <div className="flex w-full flex-col">
        <div className="flex gap-4">
          <IoIosArrowBack onClick={navigateToSettings} className="size-7 text-indigo-500 sm:hidden" />
          <h1 className="text-xl font-semibold tracking-tight text-gray-800 ">
            Premium Plans
          </h1>
        </div>
        <p className="text-md hidden text-gray-500 sm:block">
          Alcança melhor os teus objetivos com os nossos planos!
        </p>
        {hasPLan ? <MyPlanSection /> : <PremiumPlansSection />}
      </div>
    </SectionTransition>
  );
};

export default PremiumPlansLayout;
