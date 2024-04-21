import { FC, useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useParams, useNavigate } from "react-router-dom";

import TopicImages from "../../../_common/enums/topics";
import ProgressBar from "../../../_common/visuals/progress_bars/progress_bar";
import SubtopicRadioGroup from "./SubTopicSection";

import { Topic } from "../../../../api/model";
import { useGetTopics } from "../../../../api/exercise-listing/exercise-listing";
import LoadingList from "../../../_common/visuals/loading/LoadingList";

/**
 * TopicState is an enum representing the different states a Topic can be in.
 *
 * - DEFAULT is the default state.
 * - FOCUSED means the topic is currently selected.
 * - UNFOCUSED means the topic was previously selected but is no longer the focused topic.
 */
enum TopicState {
  DEFAULT,
  FOCUSED,
  UNFOCUSED,
}

interface TopicOption {
  topic: Topic;
  state: TopicState;
  year: string;
}

const TopicOption: FC<TopicOption> = ({ topic, state, year }) => {
  const navigateTo = useNavigate();

  return (
    <RadioGroup.Option
      key={topic.topicId}
      value={topic}
      className={clsx({
        "divide-y divide-gray-200 ring-0": state === TopicState.FOCUSED,
        "cursor-pointer opacity-30 ring-1 hover:opacity-100 hover:ring-2 hover:ring-indigo-400":
          state === TopicState.UNFOCUSED,
        "cursor-pointer ring-1 hover:ring-2 hover:ring-indigo-400":
          state === TopicState.DEFAULT,
        "delay-15 duration-250 relative w-full overflow-hidden rounded-lg bg-white shadow-md ring-gray-200 transition-all ease-in-out":
          true,
      })}
    >
      {/**Only enable link if the topic is not focused, this is to only allow closing its subtopics throught the X icon*/}
      <div
        onClick={() =>
          {state !== TopicState.FOCUSED &&
          navigateTo(`/exercises/${year}/${topic.topicId}`), sessionStorage.setItem("topicName", topic.name! + "º")}
        }
        className="flex flex-row items-center justify-between px-5 py-3"
      >
        <div className="flex  flex-row items-center justify-between gap-x-6">
          <img
            className="h-8 w-8 sm:h-12 sm:w-12"
            src={TopicImages[topic.name]}
          />
          <h2 className="text-md font-semibold tracking-tight text-gray-800 sm:text-lg">
            {topic.name + "º"}
          </h2>
        </div>
        {state !== TopicState.FOCUSED && (
          <div className="w-10 duration-300 animate-in slide-in-from-left-4 sm:w-32">
            <ProgressBar percentage={topic.percentage!} />
          </div>
        )}
        {state === TopicState.FOCUSED && (
          <div className="flex flex-row items-center gap-x-5 duration-300">
            <div className="w-10 duration-300 animate-in slide-in-from-right-4 sm:w-32">
              <ProgressBar percentage={topic.percentage!} />
            </div>
            {/**When the topic in unfocused, close it through the icon*/}
            <XMarkIcon
              onClick={() => navigateTo(`/exercises/${year}`)}
              className="h-5 w-5 text-gray-500 duration-300 animate-in fade-in hover:cursor-pointer hover:text-gray-700 sm:h-6 sm:w-6"
            />
          </div>
        )}
      </div>

      <Transition
        appear={true}
        show={state === TopicState.FOCUSED}
        enter="transition-all ease-in-out duration-500"
        enterFrom="opacity-0 scale-y-50 -translate-y-5"
        enterTo="opacity-100 scale-y-100 translate-y-0"
        className="h-fit w-full origin-top"
        leave="duration-0 hidden"
      >
        <SubtopicRadioGroup />
      </Transition>
    </RadioGroup.Option>
  );
};

const TopicRadioGroup: FC = () => {
  // Url params
  const { year, topic: activeTopic } = useParams();
  // State to store the topics
  const [topics, setTopics] = useState<Topic[]>([]);
  // Function to get the topics from the API
  const { refetch: getTopics, isLoading } = useGetTopics(
    {
      schoolYearId: Number(year),
    },
    {
      query: {
        enabled: false,
        refetchOnWindowFocus: false,
        cacheTime: 1000, // 1 second
        staleTime: 1000, // 1 second

        onSuccess: (data) => {
          setTopics(data.data!);
        },
      },
    },
  );

  // On render fetch the topics from the API
  useEffect(() => {
    getTopics();
  }, []);

  // While waiting for the API response show a loading animation
  if (isLoading || topics.length === 0) {
    return <LoadingList />;
  }

  return (
    <RadioGroup className="flex flex-col items-center gap-y-4">
      {topics.map((topic) => (
        <div className="h-full w-full" key={topic.topicId}>
          {activeTopic === undefined ? (
            <TopicOption
              topic={topic}
              state={TopicState.DEFAULT}
              year={year!}
            />
          ) : (
            <TopicOption
              topic={topic}
              year={year!}
              state={
                topic.topicId === Number(activeTopic)
                  ? TopicState.FOCUSED
                  : TopicState.UNFOCUSED
              }
            />
          )}
        </div>
      ))}
    </RadioGroup>
  );
};

const TopicSection: FC = ({}) => {
  return (
    <div className="duration-250 m-auto  flex min-h-full w-full flex-col gap-y-6 ease-in-out animate-in fade-in slide-in-from-left-10">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-gray-800 ">
          Tópicos e Subtópicos
        </h1>
        <p className="text-md hidden text-gray-500 sm:block">
          Encontra o tópico e o subtópico que pretendes praticar
        </p>
      </div>
      <TopicRadioGroup />
    </div>
  );
};

export default TopicSection;
