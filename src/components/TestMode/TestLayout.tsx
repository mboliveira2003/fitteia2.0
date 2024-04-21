import { FC, ReactElement } from "react";
import { HomeIcon } from "@heroicons/react/20/solid";
import { Outlet, useParams, useNavigate } from "react-router-dom";

import Breadcrumbs, { Page } from "../_common/Breadcrumbs";

// Adjust the breadcrumbs later

const TestLayout: FC = (): ReactElement => {
  // Get the URL
  const url = window.location.pathname;
  // Url params
  const { testId } = useParams();
  // Function to navigate to a different route
  const navigateTo = useNavigate();

  // Array to store the sections for the breadcrumbs
  let pages: Page[] = [];

  if (testId !== undefined) {
    pages.push({
      name: <HomeIcon className="h-5 w-5" />,
      onClick: () => {
        navigateTo("/test-mode");
      },
    });
    pages.push({
      name: "Teste " + testId,
      onClick: () => {
        navigateTo(`/test-mode/${testId}`);
      },
    });
  }
  if (url.includes("menu")) {
    pages.push({
      name: "Menu do Teste " + testId,
      onClick: () => {
        navigateTo(`/test-mode/${testId}/menu`);
      },
    });
  }

  return (
    <div className="fit relative flex w-full min-w-fit max-w-screen-2xl flex-col gap-y-5">
      {testId !== undefined && !url.includes("create-test") && (
        <div className="duration-250 ease-in-out animate-in fade-in slide-in-from-left-10">
          <Breadcrumbs pages={pages} />
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default TestLayout;
