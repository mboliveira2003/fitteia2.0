import { FC, ReactElement, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

import Breadcrumbs from "../../_common/Breadcrumbs";
import { Page } from "../../_common/Breadcrumbs";
import { HomeIcon } from "@heroicons/react/20/solid";

const ExercisesLayout: FC = (): ReactElement => {

  // Url params
  const { year, topic, subtopic } = useParams();
  // Function to navigate to a different route
  const navigateTo = useNavigate();
  // State to store section names
  const [yearName, setYearName] = useState<string | null>(null);
  const [topicName, setTopicName] = useState<string | null>(null);
  const [subtopicName, setSubtopicName] = useState<string | null>(null);

  // Whenever the url params change, update the section names
  useEffect(() => {
    setYearName(sessionStorage.getItem("yearName"));
  }, [year]);

  useEffect(() => {
    setTopicName(sessionStorage.getItem("topicName"));
  }, [topic]);

  useEffect(() => {
    setSubtopicName(sessionStorage.getItem("subtopicName"));
  }, [subtopic]);

  // Array to store the sections for the breadcrumbs
  let pages: Page[] = [];

  if (year !== undefined && yearName !== null) {
    pages.push({
      name: <HomeIcon className="h-5 w-5" />,
      onClick: () => {
        navigateTo("/exercises");
      },
    });
    pages.push({
      name: yearName,
      onClick: () => {
        navigateTo(`/exercises/${year}`);
      },
    });
  }
  if (topic !== undefined && topicName !== null) {
    pages.push({
      name: topicName,
      onClick: () => {
        navigateTo(`/exercises/${year}/${topic}`);
      },
    });
  }
  if (subtopic !== undefined && subtopicName !== null) {
    pages.push({
      name: subtopicName,
      onClick: () => {
        navigateTo(`/exercises/${year}/${topic}/${subtopic}`);
      },
    });
  }

  return (
    <div className="fit flex w-full min-w-fit max-w-screen-2xl flex-col gap-y-5">
      {/* Only show the breadcrumbs if the year is defined*/}
      {year !== undefined && (
        <div className="duration-250 slide-in-from-left-10 ease-in-out animate-in fade-in">
          <Breadcrumbs pages={pages} />
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default ExercisesLayout;
