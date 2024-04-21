import { FC, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { RadioGroup, Transition } from "@headlessui/react";
import { ChevronDoubleRightIcon } from "@heroicons/react/20/solid";

import { Subtopic } from "../../../../api/model";
import { useGetSubtopics } from "../../../../api/exercise-listing/exercise-listing";
import BarComplete from "../../../_common/visuals/progress_bars/bar_complete";
import LoadingSmallList from "../../../_common/visuals/loading/LoadingSmallList";

interface SubtopicOption {
  subtopic: Subtopic;
  topic: string;
  year: string;
}

const SubtopicOption: FC<SubtopicOption> = ({ subtopic, topic, year }) => {
  return (
    <Link
      // If the subtopic has no exercises, stay on the same page
      to={
        subtopic.totalExercises === 0
          ? `/exercises/${year}/${topic}`
          : `/exercises/${year}/${topic}/${subtopic.subTopicId}`
      }
      onClick={() => sessionStorage.setItem("subtopicName", subtopic.name!)}
      className="w-full"
    >
      <RadioGroup.Option
        key={subtopic.subTopicId}
        /**Only allow selection of a subtopic if it has any exercises*/
        value={subtopic.totalExercises === 0 ? null : subtopic}
        className={({ active }) =>
          `${active ? "c" : ""}
      group relative w-full cursor-pointer px-5 py-3 transition duration-200 ease-in-out hover:bg-gray-50 focus:outline-none`
        }
      >
        <div className="flex w-full flex-row items-center justify-between gap-x-4">
          <div className="flex flex-row items-center gap-x-1">
            <h2 className="sm:text-md text-sm font-normal tracking-tight text-gray-500">
              {subtopic.name}
            </h2>
            <Transition
              enter="transition-all ease-in-out duration-250"
              enterFrom="-translate-x-10 opacity-5"
              enterTo="translate-x-0 opacity-100"
              leave="duration-0 hidden"
            >
              <div className="opacity-0 transition duration-200 ease-in-out group-hover:opacity-100 group-hover:animate-in group-hover:slide-in-from-left-1">
                <ChevronDoubleRightIcon className="mt-1 h-4 w-4 text-gray-500" />
              </div>
            </Transition>
          </div>
          <div className="flex w-28 flex-row justify-end">
            <BarComplete
              numCompleted={subtopic.numberExercisesdoneByUser || 0}
              total={subtopic.totalExercises!}
            />
          </div>
        </div>
      </RadioGroup.Option>
    </Link>
  );
};

const SubtopicRadioGroup: FC = ({}) => {
  // Url params
  const { year, topic } = useParams();
  // State to store the subtopics
  const [subtopics, setSubtopics] = useState<Subtopic[]>([]);
  // Function to get the subtopics from the API
  const { refetch: getSubtopics, isLoading } = useGetSubtopics(
    {
      topicId: Number(topic),
    },
    {
      query: {
        enabled: false,
        refetchOnWindowFocus: false,
        cacheTime: 1000, // 1 second
        staleTime: 1000, // 1 second

        onSuccess: (data) => {
          setSubtopics(data.data!);
        },
      },
    },
  );

  // On render fetch the subtopics from the API
  useEffect(() => {
    // Needed since the component is rendered when the url params are unavailable
    if (topic !== undefined) {
      getSubtopics();
    }
  }, [topic]);

  // While waiting for the API response show a loading animation
  if (isLoading || subtopics.length === 0) {
    return <LoadingSmallList />;
  }

  return (
    <RadioGroup className=" flex w-full flex-col items-center divide-y divide-gray-200">
      {subtopics.map((subtopic, index) => (
        <SubtopicOption
          key={index}
          subtopic={subtopic}
          topic={topic!}
          year={year!}
        />
      ))}
    </RadioGroup>
  );
};

export default SubtopicRadioGroup;
