import React from "react";
import SectionTransition from "../../../../../_common/transitions/Transition";
import PlanCard from "./PlanCard";

const PremiumPlansSection: React.FC = () => {
  return (
    <SectionTransition show={true}>
      <div className="mt-9 flex w-full flex-col gap-8 max-w-screen-2xl">
        <div className="flex xl:flex-row flex-col w-full gap-4">
          <PlanCard
            title="Plano mensal"
            plan="Plano mensal"
            price="€9"
            bulletPoints={[
              "Toda a matéria que sai para o exame reunida em 12 horas de vídeo",
              "Resolução de exercícios em vídeo passo a passo",
              "Resolução de exames em vídeo",
              "Exercícios e testes globais de preparação de exame",
            ]}
          />
          <PlanCard
            title="Plano 4 meses"
            plan="Plano 4 meses"
            price="€7"
            bulletPoints={[
              "Toda a matéria que sai para o exame reunida em 12 horas de vídeo",
              "Resolução de exercícios em vídeo passo a passo",
              "Resolução de exames em vídeo",
              "Exercícios e testes globais de preparação de exame",
            ]}
          />
          <PlanCard
            title="Plano anual"
            plan="Plano anual"
            price="€4.91"
            bulletPoints={[
              "Toda a matéria que sai para o exame reunida em 12 horas de vídeo",
              "Resolução de exercícios em vídeo passo a passo",
              "Resolução de exames em vídeo",
              "Exercícios e testes globais de preparação de exame",
            ]}
          />
          {/* Add other PlanCard components here with different props */}
        </div>
      </div>
    </SectionTransition>
  );
};

export default PremiumPlansSection;
