import React, { useContext, useRef, useEffect } from "react";
import { ManagersContext } from "../../../context/managersContext";
import { FieldsContext } from "../../../context/fieldsContext";
import SearchBar from "../SearchFunction/Search";
import "./filter.css";

function Filter({
  searchTerm,
  setSearchTerm,
  currentCohort,
  setCurrentCohort,
  setCoverLetter,
  setCurrentCoverStatus,
  currentCoverStatus,
  setStudentResume,
  currentResumeStatus,
  setCurrentResumeStatus,
  setLinkedAccount,
  linkedAccountStatus,
  setLinkedAccountStatus,
  setPersonalNarrative,
  narrativeStatus,
  setNarrativeStatus,
  setHunterAccess,
  currentAccess,
  setCurrentAccess,
  currentStatus,
  setCurrentStatus,
  currentClearance,
  setCurrentClearance,
  educationStatus,
  setEducationStatus,
  setSelectedManager,
  setSelectedManagerFull,
  handleClear,
}) {
  const managersContext = useContext(ManagersContext);
  const managers = managersContext.managersData;
  const managerInputRef = useRef();

  const fieldsContext = useContext(FieldsContext);
  const fields = fieldsContext.fieldsData;

  let cohorts = fields.cohort;
  const secClearance = fields.sec_clearance;
  const courseStatus = fields.course_status;
  const progress_stat = fields.milestoneProgress;
  const ed_status = fields.college_degree;

  useEffect(() => {
    cohorts = fieldsContext.fieldsData.cohort;
  }, [fieldsContext.update]);
  const handleSearch = (searchTerm) => {};

  const handleCheckedCover = (e) => {
    setCurrentCoverStatus(e.target.value);
    setCoverLetter("Cover Letter");
  };

  const handleCheckedResume = (e) => {
    setCurrentResumeStatus(e.target.value);
    setStudentResume("Resume");
  };

  const handleLinkedAccount = (e) => {
    setLinkedAccountStatus(e.target.value);
    setLinkedAccount("LinkedIn");
  };

  const handleNarrativeStatus = (e) => {
    setNarrativeStatus(e.target.value);
    setPersonalNarrative("Personal Narrative");
  };

  const handleHunterAccess = (e) => {
    setCurrentAccess(e.target.value);
    setHunterAccess("Hunter Access");
  };

  const handleManagerChange = (e) => {
    const selectedManagerId = parseInt(e.target.value);
    const selectManager = managers.find(
      (manager) => manager.tscm_id === selectedManagerId
    );

    if (selectManager) {
      setSelectedManager(selectManager.tscm_first);
    }
  };

  return (
    <div id="filt_container">
      <SearchBar
        onSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="clear-filters-button" id="clear">
        <button onClick={handleClear} className="header-buttons">
          Clear Filters
        </button>
      </div>
      <div id="filt_subcontainer">
        <h1 id="filt_title">Select a MCSP</h1>
        <select
          value={currentCohort}
          onChange={(e) => setCurrentCohort(e.target.value)}
        >
          <option value="">Select a MCSP</option>
          {cohorts.map((cohort, index) => {
            return (
              <option key={index} value={cohort}>
                {cohort}
              </option>
            );
          })}
        </select>
      </div>
      <div id="filt_subcontainer">
        <h1 id="filt_title">Cover Letter</h1>
        <select value={currentCoverStatus} onChange={handleCheckedCover}>
          <option value="">Any Status</option>
          {progress_stat.map((docStatus, index) => {
            return (
              <option key={index} value={docStatus}>
                {docStatus}
              </option>
            );
          })}
        </select>
      </div>
      <div id="filt_subcontainer">
        <h1 id="filt_title">Resume</h1>
        <select value={currentResumeStatus} onChange={handleCheckedResume}>
          <option value="">Any Status</option>
          {progress_stat.map((docStatus, index) => {
            return (
              <option key={index} value={docStatus}>
                {docStatus}
              </option>
            );
          })}
        </select>
      </div>
      <div id="filt_subcontainer">
        <h1 id="filt_title">LinkedIn Account</h1>
        <select value={linkedAccountStatus} onChange={handleLinkedAccount}>
          <option value="">Any Status</option>
          {progress_stat.map((docStatus, index) => {
            return (
              <option key={index} value={docStatus}>
                {docStatus}
              </option>
            );
          })}
        </select>
      </div>
      <div id="filt_subcontainer">
        <h1 id="filt_title">Personal Narrative</h1>
        <select value={narrativeStatus} onChange={handleNarrativeStatus}>
          <option value="">Any Status</option>
          {progress_stat.map((docStatus, index) => {
            return (
              <option key={index} value={docStatus}>
                {docStatus}
              </option>
            );
          })}
        </select>
      </div>
      <div id="filt_subcontainer">
        <h1 id="filt_title">Hunter Account</h1>
        <select value={currentAccess} onChange={handleHunterAccess}>
          <option value="">Any Status</option>
          {progress_stat.map((docStatus, index) => {
            return (
              <option key={index} value={docStatus}>
                {docStatus}
              </option>
            );
          })}
        </select>
      </div>
      <div id="filt_subcontainer">
        <h1 id="filt_title">Current Course Standing</h1>
        <select
          value={currentStatus}
          onChange={(e) => setCurrentStatus(e.target.value)}
        >
          <option value="">Student/Graduate</option>
          {courseStatus.map((schoolStat, index) => {
            return (
              <option value={schoolStat} key={index}>
                {schoolStat}
              </option>
            );
          })}
        </select>
      </div>
      <div id="filt_subcontainer">
        <h1 id="filt_title">Security Clearance</h1>
        <select
          value={currentClearance}
          onChange={(e) => setCurrentClearance(e.target.value)}
        >
          <option value="">Select a Security Clearance</option>
          {secClearance.map((security, index) => {
            return (
              <option key={index} value={security}>
                {security}
              </option>
            );
          })}
        </select>
      </div>
      <div id="filt_subcontainer">
        <h1 id="filt_title">Education Background</h1>
        <select
          value={educationStatus}
          onChange={(e) => setEducationStatus(e.target.value)}
        >
          <option value="">Level of Education</option>
          {ed_status.map((education, index) => {
            return (
              <option key={index} value={education}>
                {education}
              </option>
            );
          })}
        </select>
      </div>
      <div id="filt_subcontainer">
        <h1 id="filt_title">Service Career Manager</h1>
        <select
          ref={managerInputRef}
          onChange={handleManagerChange}
          id="manager-select"
        >
          <option>Career Service Manager</option>
          {managers.map((manager, index) => {
            return (
              <option key={index} value={manager.tscm_id}>
                {manager.tscm_first}, {manager.tscm_last}{" "}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default Filter;
