import { FC, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { RadioGroup } from "@headlessui/react";
import { BookOpenIcon } from "@heroicons/react/24/outline";

import Pagination from "../../../_common/Pagination";
import FilterMenuDropdown, { exerciseFilter, filters } from "./ExerciseFilter";
import { useGetExercisesAndUrl } from "../../../../api/exercise-listing/exercise-listing";
import { ExerciseBasicInfo } from "../../../../api/model";
import ExamBadge from "../../../_common/visuals/badges/ExamBadge";
import DifficultyBadge from "../../../_common/visuals/badges/DifficultyBadge";
import ExerciseType from "../../../_common/visuals/badges/ExerciseType";
import LoadingGridList from "../../../_common/visuals/loading/LoadingGridList";

interface ExerciseOption {
  exercise: ExerciseBasicInfo;
  OnClick: () => void;
  year: string;
  topic: string;
  subtopic: string;
}

const ExerciseOption: FC<ExerciseOption> = ({
  exercise,
  OnClick,
  year,
  topic,
  subtopic,
}) => {
  return (
    <Link
      to={`/exercises/${year}/${topic}/${subtopic}/session/${exercise.exerciseId}`}
    >
      <RadioGroup.Option
        value={exercise}
        onClick={OnClick}
        className={`delay-15 flex flex-row items-center justify-between divide-x divide-gray-200 overflow-hidden rounded-lg ${
          exercise?.isAnswered ? "bg-green-100" : "bg-gray-100"
        } shadow-md ring-1 ring-gray-200 transition duration-300 ease-in-out animate-in fade-in slide-in-from-left-6  hover:cursor-pointer hover:ring-2 hover:ring-indigo-400 focus:outline-none`}
      >
        <div className="flex h-full w-10 items-center justify-center sm:w-14">
          <h2 className="text-md font-semibold tracking-tight text-gray-700 sm:text-xl">
            {exercise?.exerciseId}
          </h2>
        </div>

        <div className="flex flex-grow flex-row-reverse justify-between gap-y-2 bg-white px-5 py-3 sm:flex-col sm:justify-normal">
          <div className="flex flex-row items-center gap-x-2">
            <DifficultyBadge difficulty={exercise.difficulty} />
            {/*exercise.exam &&*/}
            <ExamBadge />
          </div>
          <ExerciseType isMultipleChoice={exercise.isMultipleChoice} />
        </div>
      </RadioGroup.Option>
    </Link>
  );
};

interface ExerciseRadioGroupProps {
  filteredExercises: ExerciseBasicInfo[];
  selectFromExercise: (index: number) => void;
  year: string;
  topic: string;
  subtopic: string;
}

const ExerciseRadioGroup: FC<ExerciseRadioGroupProps> = ({
  filteredExercises,
  selectFromExercise,
  year,
  topic,
  subtopic,
}) => {
  // States to manage the pagination. CurrentExercises stores the exercises to be displayed in the current page
  const [pageSize, setPageSize] = useState(8);
  const [currentExercises, setCurrentExercises] = useState<ExerciseBasicInfo[]>(
    [],
  );
  const [currentPage, setCurrentPage] = useState(1);

  // Updates the page size based on the window height
  function updatePageSize() {
    if (window.innerHeight >= 1000) {
      setPageSize(48);
      return;
    }
    if (window.innerHeight >= 900) {
      setPageSize(40);

      return;
    }
    if (window.innerHeight >= 800) {
      setPageSize(24);

      return;
    }
    if (window.innerHeight >= 700) {
      setPageSize(16);

      return;
    }
    if (window.innerHeight >= 600) {
      setPageSize(12);

      return;
    }
    if (window.innerHeight >= 400) {
      setPageSize(9);

      return;
    }

    setPageSize(8);
  }

  // Calls update page size on render
  useEffect(() => {
    updatePageSize();
  }, []);
  // Listens for window resize events and calls update page size
  ["resize"].forEach((event) => {
    window.addEventListener(event, () => {
      updatePageSize();
    });
  });

  // Updates the current exercises based on the current page, page size and applied filters
  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    setCurrentExercises(filteredExercises.slice(firstPageIndex, lastPageIndex));
  }, [currentPage, pageSize, filteredExercises]);

  // Resets the current page when the filters change, to avoid being stuck in a page with no exercises
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredExercises]);

  return (
    <>
      <RadioGroup>
        <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {currentExercises.map((exercise, index) => (
            <ExerciseOption
              key={exercise.exerciseId}
              exercise={exercise}
              OnClick={() => selectFromExercise(index)}
              year={year}
              topic={topic}
              subtopic={subtopic}
            />
          ))}
        </div>
      </RadioGroup>

      <Pagination
        currentPage={currentPage}
        totalCount={filteredExercises.length}
        pageSize={pageSize}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </>
  );
};

const ExerciseSection: FC = ({}) => {
  // Url params
  const { year, topic, subtopic } = useParams();
  // State to store the exercises
  const [exercises, setExercises] = useState<ExerciseBasicInfo[]>([]);
  // State to store the filtered exercises and the active filters
  const [filteredExercises, setFilteredExercises] = useState<
    ExerciseBasicInfo[]
  >([]);
  const [activeFilters, setActiveFilters] = useState<exerciseFilter[]>([]);

  // State to store the notes Url
  const [notesUrl, setNotesUrl] = useState<string | null>(null);

  // Function to get the exercises from the API
  const { refetch: getExercises, isLoading } = useGetExercisesAndUrl(
    {
      subTopicId: Number(subtopic),
      page: 0,
      size: 9999,
      sort: "difficulty,desc",
    },
    {
      query: {
        enabled: false,
        refetchOnWindowFocus: false,
        cacheTime: 1000, // 1 second
        staleTime: 1000, // 1 second

        onSuccess: (data) => {
          setExercises(data.data.exercises.content!);
          setNotesUrl(data.data.notesUrl);
        },
      },
    },
  );

  // On render fetch the exercises from the API
  useEffect(() => {
    getExercises();
  }, []);

  // When the exercises change, due to a response from the API, update the filtered exercises
  useEffect(() => {
    setFilteredExercises(exercises);
  }, [exercises]);

  // When the active filters change, update the filtered exercises
  useEffect(() => {
    let newExercises = [...exercises];
    for (let filter of activeFilters) {
      newExercises = filter.filterFunction(newExercises);
    }
    setFilteredExercises(newExercises);
  }, [activeFilters]);

  // Functions to add and remove filters. Will be used by the FilterMenuDropdown component
  function removeFilter(filter: exerciseFilter) {
    setActiveFilters(
      activeFilters.filter((activeFilter) => activeFilter !== filter),
    );
  }
  function addFilter(filter: exerciseFilter) {
    let newFilters = [...activeFilters];

    // Remove all filters of the same type
    newFilters = newFilters.filter(
      (activeFilter) => activeFilter.filterType !== filter.filterType,
    );

    setActiveFilters([...newFilters, filter]);
  }

  // Function to store the selected exercises in the session storage
  function selectFromExercise(n: number) {
    // Slices the array from the selected exercise to the end and looping back to the beggining
    const exerciseList = [
      ...filteredExercises.slice(n),
      ...filteredExercises.slice(0, n),
    ];
    // Store the selected exercises in the session storage
    sessionStorage.setItem("exercises", JSON.stringify(exerciseList));
  }

  if (isLoading || exercises.length === 0) {
    return <LoadingGridList />;
  }

  return (
    <div className="duration-250 m-auto  flex min-h-full w-full flex-col gap-y-6 ease-in-out animate-in fade-in slide-in-from-left-10">
      <div className="flex flex-row items-end justify-between sm:items-center">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-gray-800 ">
            Exercícios
          </h1>
          <p className="text-md hidden text-gray-500 sm:block">
            Escolhe um exercício para praticar
          </p>
        </div>
        <div className="flex flex-row items-center gap-x-1 sm:gap-x-2">
          <a
            href={notesUrl!}
            target="_blank"
            className="flex flex-row items-center gap-x-1 rounded-md bg-transparent px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100 focus:outline-none sm:px-4 sm:py-2 sm:text-sm"
          >
            <BookOpenIcon className="h-4 w-4 text-gray-700" />
            <h2>Resumos</h2>
          </a>

          <FilterMenuDropdown
            filters={filters}
            activeFilters={activeFilters}
            removeFilter={removeFilter}
            addFilter={addFilter}
          />
        </div>
      </div>
      <ExerciseRadioGroup
        filteredExercises={filteredExercises}
        selectFromExercise={selectFromExercise}
        year={year!}
        topic={topic!}
        subtopic={subtopic!}
      />
    </div>
  );
};

export default ExerciseSection;
