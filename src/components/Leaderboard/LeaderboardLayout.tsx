import { FC, ReactElement, useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import SectionTransition from "../_common/transitions/Transition";

const Leaderboard: FC = (): ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState<"Students" | "Schools">(
    "Students",
  );

  useEffect(() => {
    // Check if URL ends with "/schools" or "/students"
    if (location.pathname.endsWith("/schools")) {
      setSelectedItem("Schools");
    } else {
      setSelectedItem("Students");
    }
  }, [location.pathname]);

  const handleItemClick = (item: "Students" | "Schools") => {
    setSelectedItem(item);
    navigate(`/leaderboard/${item.toLowerCase()}`);
  };

  return (
    <SectionTransition show={true}>
      <div className="flex w-full min-w-fit max-w-screen-2xl flex-col gap-x-5">
        <nav className="flex flex-col justify-start gap-y-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-gray-800 ">
              Classificação
            </h1>
            <p className="text-md hidden text-gray-500 sm:block">
              Encontra aqui classificação{" "}
              {selectedItem === "Schools"
                ? "das melhores escolas"
                : "dos melhores alunos"}
            </p>
          </div>
        </nav>
        <div className=" relative flex w-full min-w-fit max-w-screen-2xl flex-col gap-x-5 pt-5 md:flex-row">
          <nav className="flex flex-col justify-start gap-y-2 rounded-xl border-2 p-4 md:absolute">
            <button
              className={`${
                selectedItem === "Students"
                  ? "bg-indigo-50 font-semibold text-indigo-600 ring-2 ring-indigo-500"
                  : ""
              } flex items-center gap-4 rounded-md px-6 py-3 text-start text-sm font-semibold text-gray-600 transition animate-duration-200 hover:text-indigo-700`}
              onClick={() => handleItemClick("Students")}
            >
              Alunos
            </button>
            <button
              className={`${
                selectedItem === "Schools"
                  ? "bg-indigo-50 font-semibold text-indigo-600 ring-2 ring-indigo-500"
                  : ""
                } flex items-center gap-4 rounded-md px-6 py-3 text-start text-sm font-semibold text-gray-600 transition animate-duration-200 hover:text-indigo-700`}
                onClick={() => handleItemClick("Schools")}
            >
              Escolas
            </button>
          </nav>
          <div className="flex w-full flex-col gap-y-5">
            <Outlet />
          </div>
        </div>
      </div>
    </SectionTransition>
  );
};

export default Leaderboard;
