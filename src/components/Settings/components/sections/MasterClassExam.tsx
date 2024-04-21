import SectionTransition from "../../../_common/transitions/Transition";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { checkMasterClassMembership } from "../../../../api/membership/membership";
import { useEffect, useState } from "react";
import LoadingMasterClass from "../../../_common/visuals/loading/LoadingMasterClass";
import MasterClassCard from "./MasterClassCard";

const MasterClassSection: React.FC = () => {
  const [hasMembership, setHasMembership] = useState<boolean | null>(null); // Change default state to null

  const navigate = useNavigate();

  const navigateToSettings = () => {
    navigate("/settings");
  };

  const checkMasterClass = async () => {
    const checkMasterClass = await checkMasterClassMembership();

    if (checkMasterClass.data?.membershipUsersLogId) {
      setHasMembership(true);
    } else {
      setHasMembership(false);
    }
  };

  useEffect(() => {
    checkMasterClass();
  }, []);

  return (
    <SectionTransition show={true}>
      <div className="flex h-full w-full flex-col gap-8">
        <div>
          <div className="flex gap-4">
            <IoIosArrowBack
              onClick={navigateToSettings}
              className="size-7 text-indigo-500 sm:hidden"
            />

            <h1 className="text-xl font-semibold tracking-tight text-gray-800 ">
              Master Class
            </h1>
          </div>
          <p className="text-md hidden text-gray-500 sm:block">
            Aprende mais com a nossa master-class!
          </p>
        </div>{" "}
        {hasMembership != null ? (
          <MasterClassCard
            hasMembership={hasMembership}
            normalPrice="500€"
            discountedPrice="195€"
            bulletPoints={[
              "Toda a matéria que sai para o exame reunida em 12 horas de vídeo",
              "Resolução de exercícios em vídeo passo a passo",
              "Resolução de exames em vídeo",
              "Exercícios e testes globais de preparação de exame",
            ]}
          />
        ) : (
          <LoadingMasterClass />
        )}
      </div>
    </SectionTransition>
  );
};

export default MasterClassSection;