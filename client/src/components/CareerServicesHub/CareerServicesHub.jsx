import React, { useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";

import "./CareerServicesHub.css";

import galvanizeLogo from "../logIn/galvanizeLogo.webp";
const StudentViewCard = React.lazy(() =>
  import("./StudentCards/StudentViewCard")
);
const AdminViewCards = React.lazy(() => import("./AdminViewCards"));

export default function CareerServicesHub({
  loggedInfo,
  isStudent,
  studentInfo,
  managerInfo,
  setLoggedInfo,
  setManagerInfo,
  setStudentInfo,
  setIsStudent,
  url,
}) {
  // console.log(managerInfo);
  // Create local states that will be passed down to children components
  const [searchTerm, setSearchTerm] = useState("");
  const [currentCohort, setCurrentCohort] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [currentCoverStatus, setCurrentCoverStatus] = useState("");
  const [studentResume, setStudentResume] = useState("");
  const [currentResumeStatus, setCurrentResumeStatus] = useState("");
  const [linkedAccount, setLinkedAccount] = useState("");
  const [linkedAccountStatus, setLinkedAccountStatus] = useState("");
  const [personalNarrative, setPersonalNarrative] = useState("");
  const [narrativeStatus, setNarrativeStatus] = useState("");
  const [hunterAccess, setHunterAccess] = useState("");
  const [currentAccess, setCurrentAccess] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [currentClearance, setCurrentClearance] = useState("");
  const [educationStatus, setEducationStatus] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const [popUpLogOff, setPopUpLogOff] = useState(0);

  const [toggleFiltersBar, setToggleFiltersBar] = useState(true);
  const [opacity, setOpacity] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const cookies = document.cookie.split(";");
      const found = cookies.find((element) =>
        element.trim().startsWith("jwt=")
      );
      let response;

      //check if its manager token
      response = await fetch(`${url}/managers/login/isAuthorized`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: found ? `Bearer ${found.split("jwt=")[1]}` : "",
        },
      });
      //if not check if its student token
      if (!response.ok) {
        response = await fetch(`${url}/students/login/isAuthorized`, {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: found ? `Bearer ${found.split("jwt=")[1]}` : "",
          }, //student_email student_password\
        });
        //if its still not ok, then throw an error.
        if (!response.ok) {
          throw new Error("Not Authorized");
        } else {
          setIsStudent(true);
          const result = await response.json();
          console.log(result);
          setStudentInfo(result);

          return result;
        }
      } else {
        const result = await response.json();
        setManagerInfo(result.message);
        setStudentInfo(result.message);
      }
    };
    fetchData()
      .then((auth) => setLoggedInfo(true))
      .catch((e) => {
        setLoggedInfo(false);
        setStudentInfo({});
        if (!loggedInfo) nav("/login");
      }); //fetches data, if no error set loggedInfo, else empty it.
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const cookies = document.cookie.split(";");
      const found = cookies.find((element) =>
        element.trim().startsWith("jwt=")
      );
      let response;

      //check if its manager token
      response = await fetch(`${url}/managers/login/isAuthorized`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: found ? `Bearer ${found.split("jwt=")[1]}` : "",
        },
      });
      //if not check if its student token
      if (!response.ok) {
        response = await fetch(`${url}/students/login/isAuthorized`, {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: found ? `Bearer ${found.split("jwt=")[1]}` : "",
          }, //student_email student_password\
        });
        //if its still not ok, then throw an error.
        if (!response.ok) {
          throw new Error("Not Authorized");
        } else {
          setIsStudent(true);
          const result = await response.json();
          console.log(result);
          setStudentInfo(result);
          return result;
        }
      }
    };
    fetchData()
      .then((auth) => setLoggedInfo(true))
      .catch((e) => {
        setLoggedInfo(false);
        setStudentInfo({});
        if (!loggedInfo) nav("/login");
      }); //fetches data, if no error set loggedInfo, else empty it.
  }, []);
  useEffect(() => {
    setOpacity(1);
  }, [isStudent]);

  // Filter the list of students based on the current filter
  const filterStudents = (
    students,
    currentCohort,
    coverLetter,
    currentCoverStatus,
    studentResume,
    currentResumeStatus,
    linkedAccount,
    linkedAccountStatus,
    personalNarrative,
    narrativeStatus,
    hunterAccess,
    currentAccess,
    currentStatus,
    currentClearance,
    educationStatus,
    selectedManager
  ) => {
    if (!students) {
      return [];
    }

    /*
      All states are propped drill to the Export.jsx and StudentCardList.jsx with the setStates propped drilled to the Filter_Com.jsx. All filter options are updated through the Filter_Com.jsx and Search.jsx file. 
      If a state name changes or added they must be updated in all three files.
    */

    let filteredStudent = students;

    if (currentCohort) {
      filteredStudent = filteredStudent.filter(
        (student) => student.cohort === currentCohort
      );
      if (filteredStudent.length === 0)
        //if the selected cohort doesnt exist(once the user deleted)
        filteredStudent = students;
    }

    if (currentClearance) {
      filteredStudent = filteredStudent.filter(
        (student) => student.sec_clearance === currentClearance
      );
    }

    if (currentStatus) {
      filteredStudent = filteredStudent.filter(
        (student) => student.course_status === currentStatus
      );
    }

    if (educationStatus) {
      filteredStudent = filteredStudent.filter(
        (student) => student.college_degree === educationStatus
      );
    }

    if (selectedManager) {
      filteredStudent = filteredStudent.filter(
        (student) => student.tscm_first === selectedManager
      );
    }

    if (coverLetter && currentCoverStatus) {
      filteredStudent = filteredStudent.filter(
        (student) => student.cover_letter === currentCoverStatus
      );
    }

    if (studentResume && currentResumeStatus) {
      filteredStudent = filteredStudent.filter(
        (student) => student.resume === currentResumeStatus
      );
    }

    if (linkedAccount && linkedAccountStatus) {
      filteredStudent = filteredStudent.filter(
        (student) => student.linkedin === linkedAccountStatus
      );
    }

    if (personalNarrative && narrativeStatus) {
      filteredStudent = filteredStudent.filter(
        (student) => student.personal_narrative === narrativeStatus
      );
    }

    if (hunterAccess && currentAccess) {
      filteredStudent = filteredStudent.filter(
        (student) => student.hunter_access === currentAccess
      );
    }

    if (searchTerm) {
      setSearchTerm(searchTerm.toLowerCase());
      filteredStudent = filteredStudent.filter(
        (student) =>
          student.student_first.toLowerCase().includes(searchTerm) ||
          student.student_last.toLowerCase().includes(searchTerm)
      );
    }

    return filteredStudent;
  };

  /*
    The handle clear functions set all states back to the original configuration of the state.
    To reset/clear out the input bar for the search bar make sure searchTerm has propped drilled down to the grandchild.
    If the input bar's className is changed in the Search.jsx file, it needs to be changed to update the variable searchBar.
    If the Service Career Manager's select's id is changed on the Filter_com.jsx file, it must be changed to update the variable selectElement
  */
  const handleLogOff = async () => {
    const LOGOFF_TIMER = 6;
    const promiseList = [];
    let count = 0;
    for (
      let i = LOGOFF_TIMER;
      i > 0;
      i-- //from 6 to 1
    ) {
      promiseList.push(
        new Promise((resolve) => {
          setTimeout(() => {
            setPopUpLogOff(i - 1); //starting with 0
            resolve();
          }, (LOGOFF_TIMER - i) * 1000); //starting with 5
        })
      );
      count++;
    }
    await Promise.all(promiseList).then(() => {
      document.cookie = `jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      setLoggedInfo("");
      nav("/login");
    }); //expires immediately. The day is the very beginning of the timeDate for first computer
  };

  const handleClear = () => {
    setSearchTerm("");
    const searchBar = document.getElementsByClassName("student-search-bar")[0];
    if (searchBar) {
      searchBar.value = "";
    }
    setCurrentCohort("");
    setCurrentCoverStatus("");
    setCoverLetter("");
    setCurrentResumeStatus("");
    setStudentResume("");
    setLinkedAccountStatus("");
    setLinkedAccount("");
    setNarrativeStatus("");
    setPersonalNarrative("");
    setCurrentAccess("");
    setHunterAccess("");
    setCurrentStatus("");
    setCurrentClearance("");
    setEducationStatus("");
    setSelectedManager("");
    const selectElement = document.getElementById("manager-select");
    selectElement.value = "Career Service Manager";
  };

  function handleFilterToggle() {
    const newToggleFiltersBar = !toggleFiltersBar;
    setToggleFiltersBar(newToggleFiltersBar);
  }
  const propData = {
    handleFilterToggle,
    opacity,
    popUpLogOff,
    toggleFiltersBar,
    galvanizeLogo,
    setSearchTerm,
    searchTerm,
    currentCohort,
    setCurrentCohort,
    setCoverLetter,
    setCurrentCoverStatus,
    currentCoverStatus,
    setStudentResume,
    setCurrentResumeStatus,
    currentResumeStatus,
    setLinkedAccount,
    linkedAccountStatus,
    setLinkedAccountStatus,
    setPersonalNarrative,
    setNarrativeStatus,
    narrativeStatus,
    setHunterAccess,
    currentAccess,
    setCurrentAccess,
    currentStatus,
    setCurrentStatus,
    currentClearance,
    setCurrentClearance,
    educationStatus,
    setEducationStatus,
    selectedManager,
    setSelectedManager,
    handleClear,
    currentCohort,
    coverLetter,
    currentCoverStatus,
    studentResume,
    currentResumeStatus,
    linkedAccount,
    linkedAccountStatus,
    personalNarrative,
    narrativeStatus,
    hunterAccess,
    currentAccess,
    currentStatus,
    currentClearance,
    educationStatus,
    selectedManager,
    handleClear,
    handleLogOff,
    isStudent,
    filterStudents,
    studentInfo,
    managerInfo,
    url,
  };
  if (isStudent) {
    return (
      <Suspense fallback={<div>Loading</div>}>
        {
          <StudentViewCard
            popUpLogOff={popUpLogOff}
            studentInfo={studentInfo}
            handleLogOff={() => handleLogOff()}
            url={url}
          />
        }
      </Suspense>
    );
  } else {
    return (
      <Suspense fallback={<div>Loading</div>}>
        {<AdminViewCards {...propData} />}
      </Suspense>
    );
  }
}
