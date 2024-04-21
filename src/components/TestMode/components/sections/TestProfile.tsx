import { FC, useState, useEffect } from "react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Link, useParams } from "react-router-dom";

import { useGetTestProfile } from "../../../../api/tests/tests";
import { TestProfile, UserInfo } from "../../../../api/model";
import ProgressBar from "../../../_common/visuals/progress_bars/progress_bar";
import GradeBadge from "../../../_common/visuals/badges/GradeBadge";
import CourseImage from "/src/assets/online-course.png";
import ExamImage from "/src/assets/test.png";
import LoadingProfile from "../../../_common/visuals/loading/LoadingExamProfile";
import { useGetUserProfile } from "../../../../api/settings/settings";

const TestProfileSection: FC = () => {
  // Get the testEventId from the url
  const { testId } = useParams();
  // State to store the test profile
  const [testProfile, setTestProfile] = useState<TestProfile | null>(null);
  // State to store the user profile
  const [userProfile, setUserProfile] = useState<UserInfo | null>(null);

  // Function to fetch the test profile
  const { refetch: getTestProfile, isLoading } = useGetTestProfile(
    {
      testEventId: Number(testId),
    },
    {
      query: {
        enabled: false,
        refetchOnWindowFocus: false,
        cacheTime: 1000, // 1 second
        staleTime: 1000, // 1 second

        onSuccess: (data) => {
          setTestProfile(data.data!);
        },
      },
    },
  );

  // Function to fetch the user profile
  const { refetch: getUserProfile } = useGetUserProfile({
    query: {
      enabled: false,
      refetchOnWindowFocus: false,
      cacheTime: 1000,
      staleTime: 1000,

      onSuccess: (data) => {
        const userProfileData = data.data!;
        setUserProfile(userProfileData);
      },
    },
  });

  // On load fetch the test and user profiles
  useEffect(() => {
    getTestProfile();
    getUserProfile();
  }, []);

  // While fetching the test profile, show a loading screen
  if (isLoading || testProfile == null) {
    return <LoadingProfile />;
  }

  return (
    <div className="fit duration-250 relative flex w-full min-w-fit max-w-screen-2xl flex-col gap-y-5 pb-16 ease-in-out animate-in fade-in slide-in-from-left-10">
      <div className="m-auto flex min-h-full w-full flex-col gap-y-4 sm:gap-y-6">
        <div className="flex flex-col justify-between gap-x-16 gap-y-10 divide-y divide-gray-200">
          {/**Profile Section*/}
          <div className="flex w-full flex-col items-center justify-center gap-y-8 ">
            {/**User Profile Image */}
            <div className="flex w-full flex-col items-center gap-y-8">
              <div className="relative h-36 w-36 rounded-full bg-indigo-50">
                <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full">
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src={testProfile?.userProfileImage!}
                  />
                </div>
              </div>
            </div>

            <div className="flex h-fit w-full flex-col items-center gap-x-4 gap-y-4 sm:max-w-md">
              {/**User name, username and schoolyear*/}
              <div className="flex flex-row items-center justify-between sm:w-full">
                <div className="flex flex-col items-center gap-x-2 sm:items-start">
                  <h1 className="text-xl font-semibold text-gray-700">
                    {userProfile?.firstName} {userProfile?.lastName}
                  </h1>
                  <h1 className="text-md font-normal text-gray-400">
                    {userProfile?.username}
                  </h1>
                </div>
                <div className="hidden items-center justify-center rounded-lg bg-indigo-200 bg-opacity-20 px-4 py-2 sm:flex">
                  <h1 className="text-xl font-semibold text-indigo-600">
                    {userProfile?.schoolYear?.year}º Ano
                  </h1>
                </div>
              </div>

              {/*Grade Badge */}
              <div className=" w-full ">
                <GradeBadge
                  percentage={testProfile?.gradePrediction!}
                  icon={true}
                />
              </div>
            </div>
          </div>

          {/*Modules Section */}
          <div className="flex w-full flex-col items-center justify-center gap-y-4 pt-7 ">
            <div className="flex w-full flex-row">
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-gray-800 ">
                  Modo
                </h1>
                <p className="text-md hidden text-gray-500 sm:block">
                  Seleciona um modo de estudo para teste
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-x-4 gap-y-4 sm:flex-row ">

              {/*Course Button
              <Link
                to={`/examMode/course`}
                className="group relative z-0 flex w-full flex-row  justify-between gap-y-2 overflow-hidden rounded-lg bg-white px-4 py-4 shadow-md ring-1 ring-gray-200 transition duration-100 ease-in-out hover:ring-2 hover:ring-indigo-400 sm:flex-col sm:justify-start "
              >
                <div className="absolute -right-6 -top-6 z-10 hidden rounded-full bg-indigo-300 p-6 sm:block sm:p-8">
                  <img
                    className="h-20 w-20  opacity-10 grayscale sm:h-28 sm:w-28 sm:opacity-20"
                    src={CourseImage}
                  />
                </div>
                <h1 className="z-20 flex flex-row items-center gap-x-1.5 text-xl font-semibold text-gray-700">
                  Curso
                  <div className="hidden sm:block">
                    <ArrowRightIcon className="-mb-0.5 hidden h-5 w-5 duration-300 group-hover:block group-hover:animate-in group-hover:fade-in group-hover:slide-in-from-left-2" />
                  </div>
                  <ArrowRightIcon className="-mb-0.5 h-5 w-5 sm:hidden" />
                </h1>
                <div className="z-20 hidden sm:block">
                  <ProgressBar percentage={testProfile?.percentageCourse!} />
                </div>
                <div className="z-20 flex items-center justify-center rounded-full bg-indigo-50 p-3 sm:hidden">
                  <h1 className="text-md flex h-6 w-6 items-center justify-center font-semibold text-indigo-700">
                    {testProfile?.percentageCourse!.toFixed(0)}%
                  </h1>
                </div>
              </Link>*/}

              {/*Disabled Course Button*/}
              <div className="group relative z-0 flex w-full flex-row  justify-between gap-y-2 overflow-hidden rounded-lg bg-white px-4 py-4 ring-1 ring-gray-200 transition duration-100 ease-in-out sm:flex-col sm:justify-start ">
                <div className="absolute -right-6 -top-6 z-10 hidden rounded-full bg-gray-300 p-6 sm:block sm:p-8">
                  <img
                    className="h-20 w-20  opacity-10 grayscale sm:h-28 sm:w-28 sm:opacity-20"
                    src={CourseImage}
                  />
                </div>
                <h1 className="z-20 flex flex-row items-center gap-x-5 text-xl font-semibold text-gray-700">
                  Curso
                  <div className="w-fit">
                    <span className="me-2 rounded bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 ring-1 ring-indigo-400/30 sm:px-2.5 sm:py-0.5">
                      Em Breve
                    </span>
                  </div>
                </h1>

                <div className="z-20 hidden sm:block">
                  <ProgressBar percentage={testProfile?.percentageCourse!} />
                </div>
                <div className="z-20 flex items-center justify-center rounded-full bg-gray-50 p-3 sm:hidden">
                  <h1 className="text-md flex h-6 w-6 items-center justify-center font-semibold text-gray-700">
                    {testProfile?.percentageCourse!.toFixed(0)}%
                  </h1>
                </div>
              </div>

              {/*Exam Button*/}
              <Link
                to={`/test-mode/${testId}/menu`}
                className="group relative z-0 flex w-full flex-row justify-between gap-y-2 overflow-hidden rounded-lg bg-white px-4 py-4 shadow-md ring-1 ring-gray-200 transition duration-100 ease-in-out hover:ring-2 hover:ring-indigo-400 sm:flex-col sm:justify-start "
              >
                <div className="absolute -right-6 -top-6 z-10 hidden rounded-full p-6 sm:block sm:bg-indigo-300 sm:p-8">
                  <img
                    className=" h-20 w-20 opacity-10 grayscale sm:h-28 sm:w-28 sm:opacity-20"
                    src={ExamImage}
                  />
                </div>
                <h1 className="z-20 flex flex-row items-center gap-x-1.5 text-xl font-semibold text-gray-700">
                  Testes
                  <div className="hidden sm:block">
                    <ArrowRightIcon className="-mb-0.5 hidden h-5 w-5 duration-300 group-hover:block group-hover:animate-in group-hover:fade-in group-hover:slide-in-from-left-2" />
                  </div>
                  <ArrowRightIcon className="-mb-0.5 h-5 w-5 sm:hidden" />
                </h1>
                <div className="z-20 hidden sm:block">
                  <ProgressBar percentage={testProfile?.percentageTests!} />
                </div>
                <div className="z-20 flex items-center justify-center rounded-full bg-indigo-50 p-3 sm:hidden">
                  <h1 className="text-md flex h-6 w-6 items-center justify-center font-semibold text-indigo-700">
                    {testProfile?.percentageTests!.toFixed(0)}%
                  </h1>
                </div>
              </Link>
            </div>
          </div>

          {/*Statistics Section */}
          <div className=" flex w-full flex-col gap-y-4 divide-y divide-gray-200 pt-7">
            <div className="flex flex-row items-end justify-between">
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-gray-800 ">
                  Estatísticas
                </h1>
                <p className="text-md hidden text-gray-500 sm:block">
                  Consulta as tua prestação nos vários tópicos
                </p>
              </div>
            </div>
            <div className="w-full">
              {testProfile?.topics?.map((topic, index) => {
                return (
                  <div
                    key={index}
                    className={clsx(
                      "flex flex-row items-center justify-between gap-x-12 px-6 py-3",
                      index % 2 === 0 ? "bg-indigo-200 bg-opacity-20" : "",
                    )}
                  >
                    <h1 className="xl:text-md text-start text-sm text-gray-600 sm:whitespace-nowrap">
                      {topic.topicName}
                    </h1>
                    <div className="sm:w-28 xl:w-40">
                      <ProgressBar percentage={topic.topicGrade!} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestProfileSection;
