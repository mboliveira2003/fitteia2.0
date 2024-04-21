import { FC, useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { Link} from "react-router-dom";

import ProgressBar from "../../../_common/visuals/progress_bars/progress_bar";
import { CourseTopic} from "../../../../api/model";
import { useGetCourseTopics } from "../../../../api/courses-tasks/courses-tasks";
import LoadingList from "../../../_common/visuals/loading/LoadingList";
import NumberBadge from "../../../_common/visuals/badges/NumberBadge";

interface CourseTopicOption {
  courseTopic: CourseTopic;
  index: number;
}

const CourseTopicOption: FC<CourseTopicOption> = ({ courseTopic, index }) => {
  return (
    <Link
      to={`/examMode/course/${courseTopic.id}`}
      onClick={() =>
        sessionStorage.setItem("courseTopicName", courseTopic.name.slice(3))
      }
      className="w-full"
    >
      <RadioGroup.Option
        key={courseTopic.id}
        value={courseTopic}
        className={({ active }) =>
          `${active ? "ring-2 ring-indigo-400" : ""}
      delay-15 relative w-full cursor-pointer rounded-lg bg-white px-5 py-3 shadow-md ring-1 ring-gray-200 transition duration-100 ease-in-out hover:ring-2 hover:ring-indigo-400 focus:outline-none`
        }
      >
        <div className="flex flex-row items-center justify-between gap-x-6">
          <div className="flex flex-row items-center gap-x-6">
            <NumberBadge number={index+1} />
            <h2 className="text-md font-semibold tracking-tight text-gray-800 sm:text-lg ">
              {courseTopic.name.slice(3)}
            </h2>
          </div>
          <div className="sm:w-32">
            <ProgressBar percentage={courseTopic.percentageDone} />
          </div>
        </div>
      </RadioGroup.Option>
    </Link>
  );
};

const CourseTopicRadioGroup: FC = ({}) => {
  // State to store the course topics
  const [courseTopics, setCourseTopics] = useState<CourseTopic[]>([]);

  // Function to get the course topics
  const { refetch: getCourseTopics, isLoading } = useGetCourseTopics({
    query: {
      enabled: false,
      refetchOnWindowFocus: false,
      cacheTime: 1000, // 1 second
      staleTime: 1000, // 1 second

      onSuccess: (data) => {
        setCourseTopics(data.data.courseTopicDTOs);
      },
    },
  });

  // On mount, fetch the topics
  useEffect(() => {
    getCourseTopics();
  }, []);

  // If the course topics are loading show the loading list
  if (isLoading || courseTopics.length === 0) {
    return <LoadingList />;
  }

  return (
    <RadioGroup className="w-full">
      <div className=" mb-10 flex w-full flex-col items-center gap-x-4 gap-y-4">
        {courseTopics.map((courseTopic, index) => (
          <CourseTopicOption courseTopic={courseTopic} key={courseTopic.id} index={index} />
        ))}
      </div>
    </RadioGroup>
  );
};

const CourseTopicSection: FC = ({}) => {
  return (
    <div className="duration-250 m-auto  flex min-h-full w-full flex-col gap-y-6 animate-in fade-in slide-in-from-left-10">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-gray-800 ">
          Tópicos
        </h1>
        <p className="text-md hidden text-gray-500 sm:block">
          Encontra o tópico que queres aprender
        </p>
      </div>
      <CourseTopicRadioGroup />
    </div>
  );
};

export default CourseTopicSection;
