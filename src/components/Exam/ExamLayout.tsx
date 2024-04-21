import { FC, ReactElement, useEffect, useState } from "react";
import { HomeIcon } from "@heroicons/react/20/solid";
import { Outlet, useParams, useNavigate } from "react-router-dom";

import Breadcrumbs, { Page } from "../_common/Breadcrumbs";

const ExamLayout: FC = (): ReactElement => {
  // Url params
  const { examId } = useParams();
  // Function to navigate to a different route
  const navigateTo = useNavigate();
  // State to store section names
  const [examName, setExamName] = useState<string | null>(null);

  // Whenever the url params change, update the section names
  useEffect(() => {
    setExamName(sessionStorage.getItem("examName"));
  }, [examId]);

  // Array to store the sections for the breadcrumbs
  let pages: Page[] = [];

  if (examId !== undefined && examName !== null) {
    pages.push({
      name: <HomeIcon className="h-5 w-5" />,
      onClick: () => {
        navigateTo("/examMode/exam");
      },
    });
    pages.push({
      name: examName,
      onClick: () => {
        navigateTo(`/examMode/exam/${examId}/menu`);
      },
    });
  }

  return (
    <div className="fit relative flex w-full min-w-fit max-w-screen-2xl flex-col gap-y-5">
      {/* Only show the breadcrumbs if the examId is defined*/}
      {examId !== undefined && (
        <div className="duration-250 slide-in-from-left-10 ease-in-out animate-in fade-in">
          <Breadcrumbs pages={pages} />
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default ExamLayout;
