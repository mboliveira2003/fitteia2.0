import { FC, useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useParams, Link } from "react-router-dom";

import ProgressBar from "../../../_common/visuals/progress_bars/progress_bar";
import { CourseSubtopic } from "../../../../api/model";
import { useGetCourseSubtopics } from "../../../../api/courses-tasks/courses-tasks";
import LoadingList from "../../../_common/visuals/loading/LoadingList";
import NumberBadge from "../../../_common/visuals/badges/NumberBadge";

interface CourseSubtopicOption {
  courseTopic: string;
  courseSubtopic: CourseSubtopic;
  index: number;
}

const CourseSubtopicOption: FC<CourseSubtopicOption> = ({
  courseTopic,
  courseSubtopic,
  index,
}) => {
  return (
    <Link
      to={`/examMode/course/${courseTopic}/${courseSubtopic.id}/session`}
      onClick={() =>
        sessionStorage.setItem(
          "courseSubtopicName",
          courseSubtopic.name.slice(5),
        )
      }
      className="w-full"
    >
      <RadioGroup.Option
        key={courseSubtopic.id}
        value={courseSubtopic}
        className={({ active }) =>
          `${active ? "ring-2 ring-indigo-400" : ""}
      delay-15 relative w-full cursor-pointer rounded-lg bg-white px-5 py-3 shadow-md ring-1 ring-gray-200 transition duration-100 ease-in-out hover:ring-2 hover:ring-indigo-400 focus:outline-none`
        }
      >
        <div className="flex flex-row items-center justify-between gap-x-6">
          <div className="flex flex-row items-center gap-x-6">
            <NumberBadge number={index} />
            <h2 className="text-md font-semibold tracking-tight text-gray-800 sm:text-lg ">
              {courseSubtopic.name.slice(5)}
            </h2>
          </div>
          <div className="sm:w-32">
            <ProgressBar percentage={courseSubtopic.percentageDone} />
          </div>
        </div>
      </RadioGroup.Option>
    </Link>
  );
};

const CourseSubtopicRadioGroup: FC = ({}) => {
  // Url params
  const { courseTopic } = useParams();

  // State to store the subtopics
  const [subtopics, setSubtopics] = useState<CourseSubtopic[]>([]);

  // Function to get the subtopics
  const { refetch: getCourseSubtopics, isLoading } = useGetCourseSubtopics(
    {
      topicId: Number(courseTopic),
    },
    {
      query: {
        enabled: false,
        refetchOnWindowFocus: false,
        cacheTime: 1000, // 1 second
        staleTime: 1000, // 1 second

        onSuccess: (data) => {
          setSubtopics(data.data);
        },
      },
    },
  );

  // Get the subtopics on mount
  useEffect(() => {
    getCourseSubtopics();
  }, []);

  // If the subtopics are loading show a loading list
  if (isLoading || subtopics.length === 0) {
    return <LoadingList />;
  }

  return (
    <RadioGroup className="w-full">
      <div className=" mb-10 flex w-full flex-col items-center gap-x-4 gap-y-4">
        {subtopics.map((courseSubtopic, index) => (
          <CourseSubtopicOption
            courseTopic={courseTopic!}
            index={index + 1}
            courseSubtopic={courseSubtopic}
            key={courseSubtopic.id}
          />
        ))}
      </div>
    </RadioGroup>
  );
};

const CourseSubtopicSection: FC = ({}) => {
  return (
    <div className="duration-250 m-auto  flex min-h-full w-full flex-col gap-y-6 ease-in-out animate-in fade-in slide-in-from-left-10">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-gray-800 ">
          Subtópicos
        </h1>
        <p className="text-md hidden text-gray-500 sm:block">
          Encontra o subtópico que queres aprender
        </p>
      </div>
      <CourseSubtopicRadioGroup />
    </div>
  );
};

export default CourseSubtopicSection;
