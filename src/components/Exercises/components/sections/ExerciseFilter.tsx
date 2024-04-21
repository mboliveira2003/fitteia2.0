import { FC } from "react";
import { Menu } from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/24/outline";

import { ExerciseBasicInfo } from "../../../../api/model";

enum filterType {
  COMPLETENESS = "completness",
  DIFFICULTY = "difficulty",
  TYPE = "type",
  EXAM = "exam",
  SORT = "sort",
}

interface exerciseFilter {
  filterName: string;
  filterType: string;
  filterFunction: (exercises: ExerciseBasicInfo[]) => ExerciseBasicInfo[];
}

const filterCompleted: exerciseFilter = {
  filterName: "Completos",
  filterType: filterType.COMPLETENESS,
  filterFunction: (exercises: ExerciseBasicInfo[]) => {
    return exercises.filter(
      (exercise: ExerciseBasicInfo) => exercise.isAnswered,
    );
  },
};

const filterNotCompleted: exerciseFilter = {
  filterName: "Não Completos",
  filterType: filterType.COMPLETENESS,
  filterFunction: (exercises: ExerciseBasicInfo[]) => {
    return exercises.filter(
      (exercise: ExerciseBasicInfo) => !exercise.isAnswered,
    );
  },
};

const filterEasy: exerciseFilter = {
  filterName: "Fácil",
  filterType: filterType.DIFFICULTY,
  filterFunction: (exercises: ExerciseBasicInfo[]) => {
    return exercises.filter(
      (exercise: ExerciseBasicInfo) => exercise.difficulty === 1,
    );
  },
};

const filterMedium: exerciseFilter = {
  filterName: "Médio",
  filterType: filterType.DIFFICULTY,
  filterFunction: (exercises: ExerciseBasicInfo[]) => {
    return exercises.filter(
      (exercise: ExerciseBasicInfo) => exercise.difficulty === 2,
    );
  },
};

const filterHard: exerciseFilter = {
  filterName: "Difícil",
  filterType: filterType.DIFFICULTY,
  filterFunction: (exercises: ExerciseBasicInfo[]) => {
    return exercises.filter(
      (exercise: ExerciseBasicInfo) => exercise.difficulty === 3,
    );
  },
};

const filterMultipleChoice: exerciseFilter = {
  filterName: "Escolha Múltipla",
  filterType: filterType.TYPE,
  filterFunction: (exercises: ExerciseBasicInfo[]) => {
    return exercises.filter(
      (exercise: ExerciseBasicInfo) => exercise.isMultipleChoice,
    );
  },
};

const filterShortAnswer: exerciseFilter = {
  filterName: "Resposta Escrita",
  filterType: filterType.TYPE,
  filterFunction: (exercises: ExerciseBasicInfo[]) => {
    return exercises.filter(
      (exercise: ExerciseBasicInfo) => !exercise.isMultipleChoice,
    );
  },
};

const sortByDifficulty: exerciseFilter = {
  filterName: "Ordenar por dificuldade",
  filterType: filterType.DIFFICULTY,
  filterFunction: (exercises: ExerciseBasicInfo[]) => {
    return exercises.sort((a: ExerciseBasicInfo, b: ExerciseBasicInfo) => {
      return a.difficulty! - b.difficulty!;
    });
  },
};

/*

const filterExam: exerciseFilter = {
  filterName: "Exame",
  filterType: filterType.EXAM,
  filterFunction: (exercises: ExerciseBasicInfo[]) => {
    return exercises.filter((exercise: ExerciseBasicInfo) => exercise.exam);
  },
};

const filterNotExam: exerciseFilter = {
  filterName: "Não Exame",
  filterType: filterType.EXAM,
  filterFunction: (exercises: ExerciseBasicInfo[]) => {
    return exercises.filter((exercise: ExerciseBasicInfo) => !exercise.exam);
  },
};

*/

const filters: exerciseFilter[] = [
  filterCompleted,
  filterNotCompleted,
  filterEasy,
  filterMedium,
  filterHard,
  filterMultipleChoice,
  filterShortAnswer,
  sortByDifficulty,
  // filterExam,
  // filterNotExam,
];

interface FilterMenuDropdownProps {
  filters: exerciseFilter[];
  activeFilters: exerciseFilter[];
  removeFilter: (filter: exerciseFilter) => void;
  addFilter: (filter: exerciseFilter) => void;
}

const FilterMenuDropdown: FC<FilterMenuDropdownProps> = ({
  filters,
  activeFilters,
  removeFilter,
  addFilter,
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex w-full flex-row items-center justify-center gap-x-0.5 rounded-md bg-transparent px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100 focus:outline-none sm:px-4 sm:py-2 sm:text-sm ">
          <FunnelIcon className="h-4 w-4 text-gray-700" />
          Filtros
        </Menu.Button>
      </div>

      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 hover:cursor-pointer focus:outline-none">
        <div className="px-1 py-1 ">
          {filters.map((filter) => (
            <Menu.Item key={filter.filterName}>
              {({ active }) => (
                <div
                  className={`${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  } flex flex-row items-center justify-between px-4 py-2 text-sm`}
                  onClick={() => {
                    if (activeFilters.includes(filter)) {
                      removeFilter(filter);
                    } else {
                      addFilter(filter);
                    }
                  }}
                >
                  <div className="flex flex-row items-center gap-x-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      checked={activeFilters.includes(filter)}
                      onChange={() => {}}
                    />
                    <p>{filter.filterName}</p>
                  </div>
                </div>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default FilterMenuDropdown;
export { filterType, filters };
export type { exerciseFilter };
