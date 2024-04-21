import { FC, ReactElement, useState, useEffect } from "react";
import { HomeIcon } from "@heroicons/react/20/solid";

import Breadcrumbs, { Page } from "../_common/Breadcrumbs";
import { useNavigate, useParams, Outlet } from "react-router-dom";

const CourseLayout: FC = (): ReactElement => {
  // Url params
  const { courseTopic } = useParams();
  // Function to navigate to a different route
  const navigateTo = useNavigate();
  // State to store section names
  const [courseTopicName, setCourseTopicName] = useState<string | null>(null);

  // Whenever the url params change, update the section names
  useEffect(() => {
    setCourseTopicName(sessionStorage.getItem("courseTopicName"));
  }, [courseTopic]);

  // Array to store the sections for the breadcrumbs
  let pages: Page[] = [];

  if (courseTopic !== undefined && courseTopicName !== null) {
    pages.push({
      name: <HomeIcon className="h-5 w-5" />,
      onClick: () => {
        navigateTo("/examMode/course");
      },
    });
    pages.push({
      name: courseTopicName,
      onClick: () => {
        navigateTo(`/examMode/course/${courseTopic}`);
      },
    });
  }

  return (
    <div className="fit flex w-full min-w-fit max-w-screen-2xl flex-col gap-y-5">
      {/* Only show the breadcrumbs if the course Topic is defined*/}
      {courseTopic !== undefined && (
        <div className="duration-250 slide-in-from-left-10 ease-in-out animate-in fade-in">
          <Breadcrumbs pages={pages} />
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default CourseLayout;
