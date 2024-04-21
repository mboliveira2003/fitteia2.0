import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { FC, ReactElement, useState, useEffect, useMemo } from "react";
import { Combobox } from "@headlessui/react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import { AddTestBody, Subtopic } from "../../../../api/model";
import { useGetSchoolYearSubtopics } from "../../../../api/exercise-listing/exercise-listing";
import { addTest } from "../../../../api/tests/tests";

const NewTestForm: FC = (): ReactElement => {
  // State to store the selected date
  const [date, setDate] = useState<Date | null>(null);
  // State to store the school year id
  const [schoolYearId, setSchoolYearId] = useState<number | null>(null);
  // State to store the school year subtopics
  const [schoolYearSubtopics, setSchoolYearSubtopics] = useState<Subtopic[]>(
    [],
  );
  // State to store the selected subtopics, their percentages and number
  const [selectedSubtopics, setSelectedSubtopics] = useState<Subtopic[]>([]);
  const [selectedSubtopicsPercentages, setSelectedSubtopicPercentages] =
    useState<number[]>([]);
  const [numSelectedSubtopics, setNumSelectedSubtopics] = useState<number>(0);

  // State to store the visibility of the date picker
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  // State to store the percentage alert popup visibility
  const [percentageAlertVisible, setPercentageAlertVisible] = useState(false);

  // State to store the subtopics alert popup visibility
  const [subtopicsAlertVisible, setSubtopicsAlertVisible] = useState(false);

  useEffect(() => {
    // Wait 3 seconds before hiding the alert
    const timer = setTimeout(() => {
      setPercentageAlertVisible(false);
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, [percentageAlertVisible]);

  useEffect(() => {
    // Wait 3 seconds before hiding the alert
    const timer = setTimeout(() => {
      setSubtopicsAlertVisible(false);
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, [subtopicsAlertVisible]);

  // Function to navigate to a new page
  const navigateTo = useNavigate();

  // Fetch all the subtopics on mount
  const { refetch: getSchoolYearSubtopics, isLoading } =
    useGetSchoolYearSubtopics(
      {
        schoolYearId: schoolYearId!,
      },
      {
        query: {
          enabled: false,
          refetchOnWindowFocus: false,
          cacheTime: 1000, // 1 second
          staleTime: 1000, // 1 second

          onSuccess: (data) => {
            setSchoolYearSubtopics(data.data!);
          },
        },
      },
    );

  // Fetch all the subtopics when the grade Id changes
  useEffect(() => {
    if (schoolYearId === null) {
      return;
    }
    getSchoolYearSubtopics();
    setSelectedSubtopics([]);
    setSelectedSubtopicPercentages([]);
    setNumSelectedSubtopics(0);
  }, [schoolYearId]);

  const [query, setQuery] = useState("");

  // Filter the subtopics based on the query
  const filteredSubtopics = useMemo(() => {
    if (isLoading) {
      return [];
    }
    if (query === "") {
      return schoolYearSubtopics.slice(0, 7).filter((subtopic) => {
        return !selectedSubtopics.includes(subtopic);
      });
    } else {
      return schoolYearSubtopics
        .filter((subtopic) => {
          return (
            subtopic.name.toLowerCase().includes(query.toLowerCase()) &&
            !selectedSubtopics.includes(subtopic)
          );
        })
        .slice(0, 7);
    }
  }, [query, schoolYearSubtopics]);

  // Function to handle the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (numSelectedSubtopics === 0) {
      setSubtopicsAlertVisible(true);
      return;
    }

    // Confirm if the sum of all percentages is 100
    const sum = selectedSubtopicsPercentages.reduce((a, b) => a + b, 0);

    if (sum !== 100) {
      setPercentageAlertVisible(true);
      return;
    }

    const body: AddTestBody = {
      date: date!.toISOString(),
      subTopics: selectedSubtopics.map((subtopic, index) => ({
        subTopicId: subtopic.subTopicId,
        percentage: selectedSubtopicsPercentages[index],
      })),
      title: (e.currentTarget.elements[0] as HTMLInputElement).value,
    };

    try {
      const response = await addTest(body);
      sessionStorage.setItem("testEvent", JSON.stringify(response.data));
      navigateTo(`/test-mode/${response.data.testEventId}`, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  // Function to update the selected Subtopics
  const updateSelectedSubtopics = (
    subtopicIndex: number,
    subtopic: Subtopic,
  ) => {
    const updatedSelectedSubtopics = [...selectedSubtopics];
    updatedSelectedSubtopics[subtopicIndex] = subtopic;
    setSelectedSubtopics(updatedSelectedSubtopics);
  };

  // Function to handle the change of the percentage of the subtopic
  const handleChangePercentage = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const updatedSelectedSubtopicsPercentages = [
      ...selectedSubtopicsPercentages,
    ];
    updatedSelectedSubtopicsPercentages[index] = Number(event.target.value);
    setSelectedSubtopicPercentages(updatedSelectedSubtopicsPercentages);
  };

  // Function to handle removal of a subtopic
  const handleRemoveSubtopic = (index: number) => {
    const updatedSelectedSubtopics = [...selectedSubtopics];
    const updatedSelectedSubtopicsPercentages = [
      ...selectedSubtopicsPercentages,
    ];
    updatedSelectedSubtopics.splice(index, 1);
    updatedSelectedSubtopicsPercentages.splice(index, 1);
    setSelectedSubtopics(updatedSelectedSubtopics);
    setSelectedSubtopicPercentages(updatedSelectedSubtopicsPercentages);
    setNumSelectedSubtopics(numSelectedSubtopics - 1);
  };

  return (
    <div className=" mb-10 min-h-screen w-full duration-300 animate-in fade-in slide-in-from-left-10 sm:mx-auto lg:max-w-2xl">
      <form
        className="relative mt-4 space-y-4 md:space-y-5 lg:mt-5"
        onSubmit={handleSubmit}
      >
        {/*Test Name*/}
        <div className="w-full">
          <label
            htmlFor="Título"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Título
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="1º Teste de Matemática"
            required
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-200 transition-all duration-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        {/*Date Selection*/}
        <div className="relative w-full ">
          <label
            htmlFor="Data do Teste"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Data do Teste
          </label>
          <input
            onClick={() => {
              setDatePickerVisible(!datePickerVisible);
            }}
            defaultValue={date ? date.toISOString().split("T")[0] : ""}
            placeholder="aaaa-mm-dd"
            required
            name="text"
            className={clsx(
              date !== null &&
                "bg-indigo-50 text-gray-900 transition-all duration-300 ease-in-out",
              "block  w-full appearance-none rounded-lg border-0 py-1.5 pl-3 pr-3 placeholder:text-gray-400 accent-indigo-600 ring-1 ring-inset ring-gray-200 transition-all duration-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-700 sm:text-sm sm:leading-6",
            )}
          />
          {datePickerVisible && (
            <DayPicker
              mode="single"
              selected={date ? date : new Date()}
              onSelect={(selectedDate) => {
                if (selectedDate) {
                  setDate(selectedDate);
                  setDatePickerVisible(false);
                }
                // Close the date picker
              }}
              showOutsideDays
              className="absolute left-0 right-0 flex flex-col items-center rounded-lg border-0 bg-white p-2 shadow-md ring-1 ring-gray-200 animate-in fade-in slide-in-from-top-4 sm:w-fit  sm:p-4"
              classNames={{
                caption: "flex justify-center py-2 mb-4 relative items-center",
                caption_label: "text-sm font-medium text-gray-900",
                nav: "flex items-center",
                nav_button:
                  "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                nav_button_previous: "absolute left-1.5",
                nav_button_next: "absolute right-1.5",
                table: "w-full border-collapse",
                head_row: "flex font-medium text-gray-900",
                head_cell: "m-0.5 w-9 font-normal text-sm",
                row: "flex w-full mt-2",
                cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-normal",
                day_range_end: "day-range-end",
                day_selected:
                  "rounded-md bg-indigo-600 text-white hover:bg-indigo-600 hover:text-white focus:bg-indigo-600 focus:text-white",
                day_today: "rounded-md bg-gray-200 text-gray-900",
                day_outside:
                  "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                day_disabled: "text-gray-500 opacity-50",
                day_hidden: "invisible",
              }}
              components={{
                IconLeft: ({ ...props }) => (
                  <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                ),
                IconRight: ({ ...props }) => (
                  <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                ),
              }}
            />
          )}
        </div>

        {/*School Year Selection*/}
        <div>
          <label
            htmlFor="Seleciona o teu ano"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Ano Escolar
          </label>
          <ul className="divide-x-gray-200 flex w-full items-center divide-x rounded-lg bg-white text-sm font-medium text-gray-900 ring-1 ring-gray-200 ">
            <li className="w-full ">
              <div className="flex items-center gap-x-3 ps-3">
                <input
                  type="radio"
                  value=""
                  name="list-radio"
                  onChange={() => setSchoolYearId(1)}
                  required
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                />
                <label
                  htmlFor="10º Ano"
                  className="text-md w-full py-3 font-medium text-gray-900 "
                >
                  10º Ano
                </label>
              </div>
            </li>
            <li className="w-full ">
              <div className="flex items-center gap-x-3 ps-3">
                <input
                  type="radio"
                  value=""
                  required
                  name="list-radio"
                  onChange={() => setSchoolYearId(2)}
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                />
                <label
                  htmlFor="11º Ano"
                  className="text-md w-full py-3 font-medium text-gray-900"
                >
                  11º Ano
                </label>
              </div>
            </li>
            <li className="w-full ">
              <div className="flex items-center gap-x-3 ps-3">
                <input
                  type="radio"
                  value=""
                  name="list-radio"
                  onChange={() => setSchoolYearId(3)}
                  required
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                />
                <label
                  htmlFor="12º Ano"
                  className="text-md w-full py-3 font-medium text-gray-900"
                >
                  12º Ano
                </label>
              </div>
            </li>
          </ul>
        </div>

        {/*Subtopic Selection*/}
        <div className="flex w-full flex-col">
          <label
            htmlFor="Matérias e Percentagens"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Matérias e Percentagens
          </label>

          <div className="flex w-full flex-col divide-y divide-gray-200 sm:gap-y-4 sm:divide-y-0">
            {Array.from(Array(numSelectedSubtopics)).map((_, subtopicIndex) => (
              <div
                key={subtopicIndex}
                className={clsx(
                  subtopicIndex !== 0 && "pt-5 sm:pt-0",
                  "flex flex-row items-center justify-between gap-x-2 duration-300 animate-in fade-in slide-in-from-top-4",
                )}
              >
                <div className="flex w-full flex-col items-center sm:flex-row sm:rounded-md sm:ring-1 sm:ring-gray-300">
                  <div className=" relative flex w-full flex-row items-center justify-between gap-x-2">
                    <div className="relative w-full">
                      <Combobox>
                        <Combobox.Input
                          placeholder={"Procura uma matéria"}
                          onChange={(event) => setQuery(event.target.value)}
                          displayValue={(item) => (item as Subtopic)?.name}
                          required
                          className={clsx(
                            "block w-full rounded-md border-hidden py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-gray-300 transition-all duration-200 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600/50 sm:rounded-l-md sm:rounded-r-none sm:text-sm sm:leading-6",
                            selectedSubtopics[subtopicIndex] !== undefined &&
                              "bg-indigo-50 placeholder:text-gray-900",
                          )}
                        />
                        <Combobox.Options className="absolute left-0 right-0 top-9 z-40 divide-y divide-gray-300 overflow-hidden rounded-md bg-white shadow-md ring-1 ring-gray-300">
                          {filteredSubtopics.length !== 0 &&
                            filteredSubtopics.map((subtopic, index) => (
                              <Combobox.Option
                                key={index}
                                value={subtopic}
                                onClick={() =>
                                  updateSelectedSubtopics(
                                    subtopicIndex,
                                    subtopic,
                                  )
                                }
                                className=" block w-full cursor-pointer  border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-gray-300 transition-all duration-200 placeholder:text-gray-400 hover:bg-indigo-50 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              >
                                {subtopic.name}
                              </Combobox.Option>
                            ))}
                          {filteredSubtopics.length === 0 && (
                            <div className="block w-full border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-gray-300 sm:text-sm sm:leading-6">
                              Nenhuma matéria encontrada.
                            </div>
                          )}
                        </Combobox.Options>
                      </Combobox>
                    </div>
                    <div className="sm:hidden ">
                      <XCircleIcon
                        onClick={() => handleRemoveSubtopic(subtopicIndex)}
                        className="h-5 w-5 cursor-pointer text-gray-400 hover:text-indigo-600"
                      />
                    </div>
                  </div>
                  <div className="w-full py-4 sm:w-96 sm:px-6 sm:py-0">
                    <div className="flex flex-row items-center justify-between gap-x-2">
                      <p className="mb-0.5 mr-4 w-4 text-start text-sm font-medium text-gray-600 dark:text-gray-400 sm:hidden sm:text-end">
                        {selectedSubtopicsPercentages[subtopicIndex] ===
                        undefined
                          ? "50%"
                          : String(
                              selectedSubtopicsPercentages[subtopicIndex],
                            ) + "%"}
                      </p>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        onChange={(event) =>
                          handleChangePercentage(event, subtopicIndex)
                        }
                        required
                        step="10"
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-indigo-600  dark:bg-gray-700"
                      />
                      <p className="hidden w-4 text-end text-xs font-medium text-gray-600 dark:text-gray-400 sm:block">
                        {selectedSubtopicsPercentages[subtopicIndex] ===
                        undefined
                          ? "50%"
                          : String(
                              selectedSubtopicsPercentages[subtopicIndex],
                            ) + "%"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <XCircleIcon
                    onClick={() => handleRemoveSubtopic(subtopicIndex)}
                    className="h-5 w-5 cursor-pointer text-gray-400 hover:text-indigo-600"
                  />
                </div>
              </div>
            ))}
          </div>

          {/*Add Subtopic Button*/}
          <div
            onClick={() => {
              schoolYearId && setNumSelectedSubtopics(numSelectedSubtopics + 1),
                schoolYearId &&
                  setSelectedSubtopicPercentages([
                    ...selectedSubtopicsPercentages,
                    50,
                  ]);
            }}
            className={clsx(
              numSelectedSubtopics !== 0 &&
                "transition-all duration-300 ease-in-out sm:mt-2",
              schoolYearId === null &&
                "group flex w-fit flex-row items-center gap-x-1 text-sm text-gray-400 transition-all duration-200 ease-in-out",
              schoolYearId !== null &&
                "group flex w-fit flex-row items-center gap-x-1 text-sm text-gray-900 transition-all duration-200 ease-in-out hover:cursor-pointer hover:text-indigo-700",
            )}
          >
            <PlusCircleIcon
              className={clsx(
                "h-4 w-4",
                schoolYearId !== null && " group-hover:animate-jump",
              )}
            />
            <p className="text-sm">Adicionar Matéria</p>
          </div>
        </div>

        {/*Submit Button*/}
        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-700 px-5  py-2.5 text-center text-sm font-medium text-white transition-all duration-300 ease-in-out hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-indigo-700 dark:hover:bg-indigo-600 dark:focus:ring-indigo-800"
        >
          Criar Avaliação
        </button>

        {/*Alerts*/}
        {percentageAlertVisible && (
          <div className="absolute bottom-14 left-0 right-0 mx-auto flex w-fit flex-row items-center justify-center gap-x-2 rounded-md bg-indigo-50 px-4 py-2 text-center text-indigo-700 shadow-lg ring-1 ring-indigo-200 duration-300 animate-in fade-in slide-in-from-bottom-10">
            As soma das percentagens deve ser 100%!
          </div>
        )}
        {subtopicsAlertVisible && (
          <div className="absolute bottom-14 left-0 right-0 mx-auto flex w-fit flex-row items-center justify-center gap-x-2 rounded-md bg-indigo-50 px-4 py-2 text-center text-indigo-700 shadow-lg ring-1 ring-indigo-200 duration-300 animate-in fade-in slide-in-from-bottom-10">
            Deves selecionar pelo menos uma matéria!
          </div>
        )}
      </form>
    </div>
  );
};

export default NewTestForm;
