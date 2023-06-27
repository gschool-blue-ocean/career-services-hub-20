import React, { useEffect, useRef, useState } from "react";
import Filter from "./Filter/Filter_Com";
import Export from "./Export";
import StudentCardsList from "./StudentCards/StudentCardsList";
import io from "socket.io-client";

import "./AdminViewCards.css";
import "./Filter/filter.css";
function AdminViewCards({
  handleLogOff,
  setManagerInfo,
  managerInfo,
  url,
  popUpLogOff,
  galvanizeLogo,
  isStudent,
  opacity,
}) {
  if (!managerInfo) return <div>Loading</div>;
  const [toggleFiltersBar, setToggleFiltersBar] = useState(true);
  const [messageList, setMessageList] = useState([]);
  const [showNotify, setShowNotify] = useState(false);
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
  const socketRef = useRef(null);
  const buttonRef = useRef(null);
  console.log(socketRef);

  useEffect(() => {
    if (managerInfo.id) {
      const fetchMessage = async () => {
        const response = await fetch(`${url}/message/${managerInfo.id}`);
        const result = await response.json();
        setMessageList(result);
        console.log(result);
      };
      fetchMessage();
      socketRef.current = io(url, {
        transports: ["websocket"],
        reconnection: true, // Enable reconnection attempts
        reconnectionAttempts: 1, // Limit the number of reconnection attempts
        reconnectionDelay: 1000, // Initial delay between reconnection attempts (in milliseconds)
        reconnectionDelayMax: 5000, // Maximum delay between reconnection attempts (in milliseconds)
      });
      socketRef.current.emit("adminConnects", managerInfo);
      socketRef.current.on("changed", (data) => {
        setMessageList((prev) => [...prev, data.message]);
      });
      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [managerInfo]); //triggers when page loads.

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

  const handleRead = (index) => {
    console.log(index);
    const fetchMessage = async () => {
      // const messages = messageList;
      // if (index === 0)
      //   messages.slice(1);
      // else {
      //   messages.slice(0,index).concat(messages.slice(index+1))
      // }
      const response = await fetch(`${url}/message/${messageList[index].id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/JSON" },
      });
      const result = await response.json();
      setMessageList(
        messageList.slice(0, index).concat(messageList.slice(index + 1))
      );
    };
    fetchMessage();
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
  return (
    <div style={{ opacity: opacity, transition: "opacity 2s" }}>
      {popUpLogOff > 0 ? (
        <div className="login-popup">
          Successfully logged off. Navigating in {popUpLogOff}s...
        </div>
      ) : null}
      <div className="admin-view-notification">
        <div
          id="notification-bell"
          onClick={() => setShowNotify((prev) => !prev)}
        >
          {messageList.length < 1 ? null : (
            <div className="notificationsCount">
              <span style={{ marginBottom: "3px" }}>{messageList.length}</span>
            </div>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.5em"
            viewBox="0 0 448 512"
          >
            <style>{`.my-icon { fill: #bfc1c5; }`}</style>
            <path
              className="my-icon"
              d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"
            />
          </svg>
        </div>
        {!showNotify || messageList.length < 1 ? null : (
          <div className="notificationPanel">
            {messageList.map((element, index) => (
              <div key={index}>
                <p>{element.message}</p>
                <p
                  id="viewed-button"
                  ref={buttonRef}
                  onClick={() => handleRead(index)}
                >
                  mark as viewed
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
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
            <div className="auth-container">
              <p className="auth-title">Authorization Code</p>
              <p className="auth-code">{managerInfo.authCode}</p>
            </div>
            {/* {managerInfo?<div className="auth-container">
                <p className="auth-title">Authorization Code</p>
                <p className="auth-code">{managerInfo.authCode}</p>
              </div>:null} */}
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
              <button className="header-buttons" onClick={() => handleLogOff()}>
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
        <div
          className={
            toggleFiltersBar ? "collapsed-right-container" : "right_container"
          }
        >
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
export default AdminViewCards;
