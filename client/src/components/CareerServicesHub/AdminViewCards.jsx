import React, {useEffect, useRef} from 'react'
import Filter from "./Filter/Filter_Com";
import Export from "./Export";
import StudentCardsList from "./StudentCards/StudentCardsList";
import io from 'socket.io-client'

import "./Filter/filter.css";
function AdminViewCards({opacity,
    popUpLogOff,
    handleFilterToggle,
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
    filterStudents,
    coverLetter,
    studentResume,
    linkedAccount,
    personalNarrative,
    hunterAccess,
    handleLogOff,
    studentInfo,
    isStudent}) 
    {
        const url = "http://localhost:8000";
        const socketRef = useRef(null);
        useEffect(()=>{
            socketRef.current = io(url,{
            transports: ['websocket'],
            reconnection: true,            // Enable reconnection attempts
            reconnectionAttempts: 5,       // Limit the number of reconnection attempts
            reconnectionDelay: 1000,       // Initial delay between reconnection attempts (in milliseconds)
            reconnectionDelayMax: 5000,    // Maximum delay between reconnection attempts (in milliseconds)
          });
          socketRef.current.emit('adminConnects',studentInfo);
          socketRef.current.on('changed',(data)=>{
            console.log(data.message);
          });
            return ()=>{
              socketRef.current.disconnect();
            }
        },[]) //triggers when page loads.
    return (
        <div style={{ opacity: opacity, transition: "opacity 2s" }}>
        {popUpLogOff >0 ?<div className='login-popup'>Successfully logged off. Navigating in {popUpLogOff}s...</div>:null}
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
                <button className="header-buttons" onClick={()=>handleLogOff()}>
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
export default AdminViewCards