import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  FC,
} from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Combobox } from "@headlessui/react";
import {
  updateEmail,
  sendEmailVerification,
  updatePassword,
} from "firebase/auth";
import { auth } from "../../../../firebase";
import { IoIosArrowBack } from "react-icons/io";

import {
  changeEmail,
  changeFirstName,
  changeLastName,
  changeSchool,
  changeSchoolYear,
  changeUsername,
  useGetUserProfile,
} from "../../../../api/settings/settings";
import { School, UserInfo } from "../../../../api/model";
import { useGetSchools } from "../../../../api/schools/schools";
import { useNavigate } from "react-router-dom";
import LoadingProfile from "../../../_common/visuals/loading/LoadingProfile";

interface FormData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  school: School;
  schoolYearId: string;
  newPassword: string;
}

const ProfileInfo: React.FC = () => {
  // State to store the submit button text
  const [buttonText, setButtonText] = useState("Salvar Alterações");
  // State to store the passsword visibility
  const [showNewPassword, setShowNewPassword] = useState(false);
  // State to stroe the user profile
  const [userProfile, setUserProfile] = useState<UserInfo>();
  const [usernameAlertVisible, setUsernameAlertVisible] = useState(false);
  const [emailAlertVisible, setEmailAlertVisible] = useState(false);

  // State to store the forms original data
  const [formDataOriginal, setFormDataOriginal] = useState<FormData>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    school: {} as School,
    schoolYearId: "",
    newPassword: "",
  });

  // State to store the forms data as it is updated
  const [formData, setFormData] = useState<FormData>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    school: {} as School,
    schoolYearId: "",
    newPassword: "",
  });

  // State to store the schools fetched from the API
  const [schools, setSchools] = useState<School[]>([]);

  // Function to get the Schools on mount
  const { refetch: getSchools, isLoading } = useGetSchools({
    query: {
      enabled: false,
      refetchOnWindowFocus: false,
      cacheTime: 1000, // 1 second
      staleTime: 1000, // 1 second

      onSuccess: (data) => {
        setSchools(data.data!);
      },
    },
  });

  useEffect(() => {
    // Wait 3 seconds before hiding the alert
    const timer = setTimeout(() => {
      setUsernameAlertVisible(false);
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, [usernameAlertVisible]);

  useEffect(() => {
    // Wait 3 seconds before hiding the alert
    const timer = setTimeout(() => {
      setEmailAlertVisible(false);
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, [emailAlertVisible]);

  useEffect(() => {
    getSchools();
  }, []);

  const [query, setQuery] = useState("");

  const filteredSchools = useMemo(() => {
    if (isLoading) {
      return [];
    }
    if (query === "") {
      return schools.slice(0, 7);
    } else {
      return schools
        .filter((school) => {
          return school.schoolName.toLowerCase().includes(query.toLowerCase());
        })
        .slice(0, 7);
    }
  }, [query, schools]);

  // Fetch the user email through firebase
  const user = auth.currentUser;

  // Get the user email trough firebase
  const { refetch: getUserProfile } = useGetUserProfile({
    query: {
      enabled: false,
      refetchOnWindowFocus: false,
      cacheTime: 1000,
      staleTime: 1000,

      onSuccess: (data) => {
        const userProfileData = data.data!;

        setUserProfile(userProfileData);

        setFormData({
          username: userProfileData.username,
          firstName: userProfileData.firstName!,
          lastName: userProfileData.lastName!,
          email: user?.email ?? userProfileData.email!,
          school: userProfileData?.school ?? null, // Use optional chaining and nullish coalescing
          schoolYearId: userProfileData.schoolYear?.schoolYearId!.toString()!,
          newPassword: "",
        });

        setFormDataOriginal({
          username: userProfileData.username,
          firstName: userProfileData.firstName!,
          lastName: userProfileData.lastName!,
          email: user?.email ?? userProfileData.email!,
          school: userProfileData?.school ?? null, // Use optional chaining and nullish coalescing
          schoolYearId: userProfileData.schoolYear?.schoolYearId!.toString()!,
          newPassword: "",
        });
      },
    },
  });

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (buttonText !== "Guardar Alterações") {
      setButtonText("Guardar Alterações");
    }

    let { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    for (const key in formDataOriginal) {
      if (
        formDataOriginal.hasOwnProperty(key) &&
        formData.hasOwnProperty(key)
      ) {
        if (
          formDataOriginal[key as keyof FormData] !==
          formData[key as keyof FormData]
        ) {
          switch (key) {
            case "username":
              try {
                await changeUsername({
                  username: formData.username,
                });
              } catch (error) {
                setUsernameAlertVisible(true), console.log(error);
              }
              break;
            case "firstName":
              try {
                await changeFirstName({
                  firstName: formData.firstName,
                });
              } catch (error) {
                console.log(error);
              }
              break;
            case "lastName":
              try {
                await changeLastName({
                  lastName: formData.lastName,
                });
              } catch (error) {
                console.log(error);
              }
              break;
            case "email":
              try {
                // Change the email language to Portuguese
                auth.languageCode = "pt";
                const responseApi = await changeEmail({
                  email: formData.email,
                });
                const responseFirebase = await updateEmail(
                  user!,
                  formData.email,
                );
                const responseEmail = sendEmailVerification(user!);
                console.log("Sucess changing email in API:", responseApi);
                console.log(
                  "Sucess changing email in Firebase:",
                  responseFirebase,
                );
                console.log(
                  "Sucess sending verification email:",
                  responseEmail,
                );
              } catch (error) {
                setEmailAlertVisible(true), console.log(error);
              }
              break;
            case "school":
              try {
                await changeSchool({
                  schoolId: formData.school.schoolId,
                });
              } catch (error) {
                console.log(error);
              }
              break;
            case "schoolYearId":
              const schoolYearId = parseInt(formData.schoolYearId);
              try {
                await changeSchoolYear({
                  schoolYearId: schoolYearId,
                });
              } catch (error) {
                console.log(error);
              }
              break;
            case "newPassword":
              if (user?.emailVerified === true) {
                try {
                  const responseFirebase = await updatePassword(
                    user!,
                    formData.newPassword,
                  );
                  console.log(
                    "Sucess changing password in Firebase:",
                    responseFirebase,
                  );
                } catch (error) {
                  console.log(error);
                }
              } else {
                alert(
                  "Por favor, verifica o teu email antes de alterar a palavra-passe.",
                );
              }
              break;
            default:
              break;
          }
        }
      }
    }
    getUserProfile();
    setButtonText("Alterações guardadas!");
  };

  const handleToggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  // State to store the file
  const [file, setFile] = useState<File | null>(null);

  // Function to handle the image change
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const operationType = 1;

      // Update the image on the UI
      setFile(file);

      try {
        // Get the Firebase JWT token
        const token = await auth.currentUser?.getIdToken();
        // Fetch the URL of the uploaded image
        const imageUrl = await uploadImage(file, operationType, token!);
        imageUrl && notifyAPI(imageUrl, token!);
        console.log("Upload completed!");
        setButtonText("Alterações guardadas!");
      } catch (error) {
        console.error("Upload error:", error);
      }
    }
  };

  // Function to upload a PNG image using fetch API
  async function uploadImage(file: File, operationType: number, token: string) {
    // Endpoint URL
    const url = `https://api.studenthub.pt/v0.0/storage/upload?operationType=${operationType}`;

    // Create a FormData object
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          // Append the Authorization header with the token
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get the URL of the uploaded file
      const imageUrl = await response.text();
      console.log("Upload successful. File is available at:", imageUrl);
      return imageUrl;
    } catch (error) {
      console.error("Failed to upload the file.", error);
      return null;
    }
  }

  // Function to submit the image URL to the API database
  async function notifyAPI(imageUrl: string, token: string) {
    // Endpoint URL
    const url = `https://api.studenthub.pt/v0.0/settings/change/profilePicture?imageUrl=${imageUrl}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          // Append the Authorization header with the token
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Upload completed:", response);
    } catch (error) {
      console.error("Failed to upload the file.", error);
    }
  }

  const isFormChanged = () => {
    if (formData && formDataOriginal) {
      return JSON.stringify(formData) !== JSON.stringify(formDataOriginal);
    }
  };

  const handleSchoolChange = (selectedSchool: School) => {
    if (buttonText != "Salvar Alterações") {
      setButtonText("Salvar Alterações");
    }
    setFormData({
      ...formData,
      school: selectedSchool,
    });
  };

  if (userProfile == null) {
    return (
        <LoadingProfile />
    );
  }

  return (
      <div className="flex w-full flex-col items-center justify-center ease-in-out animate-in fade-in slide-in-from-left-10 duration-250">
        <div className="flex justify-center">
          {/**User Profile Image */}
          <div className="flex w-full flex-col justify-center gap-y-8">
            <div className="relative h-48 w-48 rounded-full bg-indigo-50">
              <div className="flex h-48 w-48 items-center justify-center overflow-hidden rounded-full">
                <img
                  className="h-full w-full rounded-full object-cover"
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : userProfile?.profilePicture
                  }
                />
              </div>

              {/**Upload Image Button */}
              <label
                htmlFor="file-upload"
                className="absolute bottom-0 right-1 cursor-pointer rounded-full bg-indigo-600 p-2 text-white transition-all duration-300 ease-in-out hover:bg-indigo-700"
              >
                <input
                  accept="image/png" // Accept only png images
                  type="file"
                  id="file-upload"
                  className="sr-only"
                  onChange={handleImageChange}
                />
                <PencilSquareIcon className="h-4 w-4" />
              </label>
            </div>
          </div>
        </div>
        <div className=" w-full">
          <form onSubmit={handleSubmit} className=" flex flex-col gap-y-6 ">
            <div className="mt-10 flex w-full justify-end">
              <button
                type="submit"
                disabled={!isFormChanged()}
                className={`${isFormChanged() ? "bg-indigo-500" : "bg-indigo-200"} rounded-md  px-4 py-2 text-white`}
              >
                {buttonText}
              </button>
            </div>
            <div className="flex flex-col items-start justify-start">
              <label
                htmlFor="username"
                className="md:-32 mb-1 block flex-shrink-0 text-end text-sm font-semibold"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-2 pl-3 pr-3 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 transition-all duration-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                required
              />
            </div>
            <div className="flex flex-col items-start justify-start">
              <label
                htmlFor="firstName"
                className="md:-32 mb-1 block flex-shrink-0 text-end text-sm font-semibold"
              >
                Nome:
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-2 pl-3 pr-3 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 transition-all duration-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                required
              />
            </div>
            <div className="flex flex-col items-start justify-start">
              <label
                htmlFor="lastName"
                className="md:-32 mb-1 block flex-shrink-0 text-end text-sm font-semibold"
              >
                Apelido:
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-2 pl-3 pr-3 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 transition-all duration-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                required
              />
            </div>
            <div className="flex flex-col items-start justify-start">
              <label
                htmlFor="email"
                className="md:-32 mb-1 block flex-shrink-0 text-end text-sm font-semibold"
              >
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="pointer-events-none block w-full rounded-md border-0 py-2 pl-3 pr-3 text-sm text-gray-900 opacity-60 ring-1 ring-inset  ring-gray-300 transition-all duration-200 placeholder:text-gray-400 sm:text-base sm:leading-6"
                required
                readOnly
              />
            </div>
            <div className="pointer-events-none flex flex-col items-start justify-start opacity-60">
              <Combobox value={formData.school} onChange={handleSchoolChange}>
                <label
                  htmlFor="Escola"
                  className="md:-32 mb-1 block flex-shrink-0 text-end text-sm font-semibold"
                >
                  Escola:
                </label>
                <div className="flex w-full flex-col text-sm md:text-base">
                  <Combobox.Input
                    name="schoolName"
                    placeholder={"Seleciona a tua escola"}
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(school: School | null) =>
                      isLoading ? "" : school?.schoolName!
                    }
                    required
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 transition-all duration-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                  />
                  <Combobox.Options className="divide-y divide-gray-300 overflow-hidden rounded-md text-sm shadow-md ring-1 ring-gray-300 md:text-base ">
                    {filteredSchools.length !== 0 &&
                      filteredSchools.map((school) => (
                        <Combobox.Option
                          key={school.schoolId}
                          value={school}
                          className=" block w-full cursor-pointer  border-0 py-1.5 pl-3 pr-3 text-sm text-gray-900 ring-gray-300 transition-all duration-200 placeholder:text-gray-400 hover:bg-indigo-50 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 md:text-base"
                        >
                          {school.schoolName}
                        </Combobox.Option>
                      ))}
                    {filteredSchools.length === 0 && (
                      <div className="block w-full border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-gray-300 sm:text-sm sm:leading-6">
                        Nenhuma escola encontrada.
                      </div>
                    )}
                  </Combobox.Options>
                </div>
              </Combobox>
            </div>
            <div className="flex flex-col items-start justify-start">
              <label className="md:-32 mb-1 block flex-shrink-0 text-end text-sm font-semibold">
                Ano:
              </label>
              <div className="divide-x-gray-300 flex w-full divide-x overflow-hidden rounded-lg bg-white text-sm ring-1 ring-inset ring-gray-300 md:text-base">
                <label className="inline-flex w-full items-center justify-center border p-2">
                  <input
                    type="radio"
                    name="schoolYearId"
                    value={1}
                    onChange={handleChange}
                    checked={formData.schoolYearId === "1"}
                    className="mr-2"
                  />
                  10º
                </label>
                <label className="inline-flex w-full items-center justify-center border border-l-0 p-2">
                  <input
                    type="radio"
                    name="schoolYearId"
                    value={2}
                    onChange={handleChange}
                    checked={formData.schoolYearId === "2"}
                    className="mr-2"
                  />
                  11º
                </label>
                <label className="inline-flex w-full items-center justify-center border border-l-0 p-2">
                  <input
                    type="radio"
                    name="schoolYearId"
                    value={parseInt("3", 10)}
                    onChange={handleChange}
                    checked={formData.schoolYearId === "3"}
                    className="mr-2"
                  />
                  12º
                </label>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start">
              <label
                htmlFor="currentPassword"
                className="md:-32 mb-1 block flex-shrink-0 text-end text-sm font-semibold"
              >
                Palavra-passe:
              </label>
              <div className="relative w-full">
                <input
                  type={showNewPassword ? "text" : "password"} // Show plain text if showCurrentPassword is true
                  name="newPassword"
                  value={formData.newPassword}
                  pattern=".{8,}" // Input pattern to require at least 8 characters
                  title="A palavra-passe deve ter no mínimo 8 caracteres" // Error message if pattern not matched
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-2 pl-3 pr-3 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 transition-all duration-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                />
                <button
                  type="button"
                  onClick={handleToggleNewPassword}
                  className="absolute inset-y-0 right-0 flex items-center px-3"
                >
                  {showNewPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
};

const ProfileSection: FC = ({}) => {
  const navigate = useNavigate();

  const navigateToSettings = () => {
    navigate("/settings");
  };
  return (
    <div className="duration-250 m-auto flex min-h-full w-full flex-col gap-y-6 animate-in fade-in slide-in-from-left-10">
      <div>
        <div className="flex gap-4">
          <IoIosArrowBack
            onClick={navigateToSettings}
            className="size-7 text-indigo-500 sm:hidden"
          />

          <h1 className="text-xl font-semibold tracking-tight text-gray-800 ">
            Perfil
          </h1>
        </div>
        <p className="text-md hidden text-gray-500 sm:block">
          Consulta e altera a informação do teu perfil
        </p>
      </div>
      {}
      <ProfileInfo />
    </div>
  );
};

export default ProfileSection;