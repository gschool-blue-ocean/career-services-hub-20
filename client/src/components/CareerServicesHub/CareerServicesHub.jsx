import React, { useState, useEffect } from "react";

import StudentCardsList from "./StudentCards/StudentCardsList";
import "./CareerServicesHub.css";
import StudentViewCard from "./StudentCards/StudentViewCard";

import Export from "./Export";
import "./Filter/filter.css";
import Filter from "./Filter/Filter_Com";
import galvanizeLogo from "../logIn/galvanizeLogo.webp";

export default function CareerServicesHub({
  handleLogOff,
  isTransitioning,
  setIsTransitioning,
  loggedInfo,
  isStudent,
  studentInfo 
}) {
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

  const [toggleFiltersBar, setToggleFiltersBar] = useState(true);
  const [opacity, setOpacity] = useState(0);
 

  useEffect(() => {
    setOpacity(1);
    if(isStudent)console.log('is a student')
    else console.log('not student')
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
  if(isStudent){
    return (
      <StudentViewCard studentInfo={studentInfo} handleLogOff={handleLogOff}/>
    )
  }else{

    return (
      <div style={{ opacity: opacity, transition: "opacity 2s" }}>
        <div className="body_container">
          <div className="left_container">
            <div
              className={
                toggleFiltersBar
                  ? "left-container-filters"
                  : "collapsed-filters-container"
              }
            >
              <img className="logo" src={galvanizeLogo}></img>
  
              <Filter
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                currentCohort={currentCohort}
                setCurrentCohort={setCurrentCohort}
                setCoverLetter={setCoverLetter}
                setCurrentCoverStatus={setCurrentCoverStatus}
                currentCoverStatus={currentCoverStatus}
                setStudentResume={setStudentResume}
                setCurrentResumeStatus={setCurrentResumeStatus}
                currentResumeStatus={currentResumeStatus}
                setLinkedAccount={setLinkedAccount}
                linkedAccountStatus={linkedAccountStatus}
                setLinkedAccountStatus={setLinkedAccountStatus}
                setPersonalNarrative={setPersonalNarrative}
                setNarrativeStatus={setNarrativeStatus}
                narrativeStatus={narrativeStatus}
                setHunterAccess={setHunterAccess}
                currentAccess={currentAccess}
                setCurrentAccess={setCurrentAccess}
                currentStatus={currentStatus}
                setCurrentStatus={setCurrentStatus}
                currentClearance={currentClearance}
                setCurrentClearance={setCurrentClearance}
                educationStatus={educationStatus}
                setEducationStatus={setEducationStatus}
                selectedManager={selectedManager}
                setSelectedManager={setSelectedManager}
                handleClear={handleClear}
              />
              <Export
                filterStudents={filterStudents}
                currentCohort={currentCohort}
                coverLetter={coverLetter}
                currentCoverStatus={currentCoverStatus}
                studentResume={studentResume}
                currentResumeStatus={currentResumeStatus}
                linkedAccount={linkedAccount}
                linkedAccountStatus={linkedAccountStatus}
                personalNarrative={personalNarrative}
                narrativeStatus={narrativeStatus}
                hunterAccess={hunterAccess}
                currentAccess={currentAccess}
                currentStatus={currentStatus}
                currentClearance={currentClearance}
                educationStatus={educationStatus}
                selectedManager={selectedManager}
              />
              <div className="profile-container">
                <button className="header-buttons" onClick={handleLogOff}>
                  Logout
                </button>
              </div>
            </div>
            <button
              className="collapse-filter-button"
              onClick={handleFilterToggle}
            >
              {" "}
              &#8646;{" "}
            </button>
          </div>
          <div className="right_container">
            <StudentCardsList
              filterStudents={filterStudents}
              currentCohort={currentCohort}
              coverLetter={coverLetter}
              currentCoverStatus={currentCoverStatus}
              studentResume={studentResume}
              currentResumeStatus={currentResumeStatus}
              linkedAccount={linkedAccount}
              linkedAccountStatus={linkedAccountStatus}
              personalNarrative={personalNarrative}
              narrativeStatus={narrativeStatus}
              hunterAccess={hunterAccess}
              currentAccess={currentAccess}
              currentStatus={currentStatus}
              currentClearance={currentClearance}
              educationStatus={educationStatus}
              selectedManager={selectedManager}
              handleClear={handleClear}
              isStudent={isStudent}
            />
          </div>
        </div>
      </div>
     
    );
  }
  }
  
  
  
  
