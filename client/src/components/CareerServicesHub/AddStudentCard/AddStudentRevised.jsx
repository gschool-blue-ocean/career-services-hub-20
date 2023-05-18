import React, { useContext, useState, useRef } from "react";
import "./AddStudentCard.css";
import { ManagersContext } from "../../../context/managersContext";
import { StudentsContext } from "../../../context/studentsContext";

function AddStudentRevised({
  setAddStudent,
  handleAddStudentModalToggle,
  handleUpdateNewStudent,
}) {
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000"
      : "https://career-services-server.onrender.com";

  const managersContext = useContext(ManagersContext);
  const managerInputRef = useRef();
  const mcspInputRef = useRef();
  const studentFirstInputRef = useRef();
  const studentLastInputRef = useRef();
  const clearanceInputRef = useRef();
  const educationInputRef = useRef();

  const studentContext = useContext(StudentsContext);
  const students = studentContext.studentsData;

  const managers = managersContext.managersData;
  const secClearance = ["None", "SECRET", "TOP SECRET", "TOP SECRET//SCI"];
  const addEducation = [
    "None",
    "Associate's in CS/STEM",
    "Associate's Not in CS/STEM",
    "Bachelor's in CS/STEM",
    "Bachelor's Not in CS/STEM",
    "Masters in CS/STEM",
    "Masters Not in CS/STEM",
  ];

  const firstStudent = students[0];
  const milestoneFields = firstStudent.milestones.map(
    (milestone) => milestone.mile_name
  );
  const milestoneArray = milestoneFields.map((milestone) => milestone);

  const addNewStudent = async () => {
    const newStudentObj = {
      course_status: "Student",
      career_status: "Not Started",
      cohort: "MCSP-" + mcspInputRef.current.value,
      tscm_id: managerInputRef.current.value,
      student_first: studentFirstInputRef.current.value,
      student_last: studentLastInputRef.current.value,
      college_degree: educationInputRef.current.value,
      sec_clearance: clearanceInputRef.current.value,
    };
    try {
      const response = await fetch(`${url}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudentObj),
      });

      const addedStudent = await response.json();

      //Adding Milestones to Student
      milestoneArray.forEach((milestone_name) => {
        const newMilestone = {
          mile_name: milestone_name,
          progress_stat: "In-Progress",
        };

        fetch(`${url}/students/${addedStudent.student_id}/milestones`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMilestone),
        });
      });
      return addedStudent;
    } catch (error) {
      console.log(error);
    } finally {
      setAddStudent(false);
    }
    handleUpdateNewStudent(newStudentObj);

    handleAddStudentModalToggle();
  };

  return (
    <div className="add-container">
      <div className="add-subcontainer">
        <div id="add-text">MCSP:</div>
        <span>
          {" "}
          {" "}
          <input
            type="number"
            className="import-input-MCSP"
            ref={mcspInputRef}
          />{" "}
        </span>
      </div>
      <div className="add-subcontainer">
        <div id="add-text">Manager:</div>
        <select className="import-input-manager" ref={managerInputRef}>
          <option>Select a Career Service Manager</option>
          {managers.map((manager) => {
            return (
              <option value={manager.tscm_id}>
                {manager.tscm_first}, {manager.tscm_last}{" "}
              </option>
            );
          })}
        </select>
      </div>
      <div className="add-subcontainer">
        <div id="add-text">First Name:</div>
        <input
          type="text"
          placeholder="first name"
          ref={studentFirstInputRef}
        />
      </div>
      <div className="add-subcontainer">
        <div id="add-text">Last Name:</div>
        <input type="text" placeholder="last name" ref={studentLastInputRef} />
      </div>
      <div className="add-subcontainer">
        <div id="add-text">Education:</div>
        <select ref={educationInputRef}>
          <option>Select Education</option>
          {addEducation.map((education, index) => {
            return (
              <option key={index} value={education}>
                {education}
              </option>
            );
          })}
        </select>
      </div>
      <div className="add-subcontainer">
        <div id="add-text">Security Clearance:</div>
        <select ref={clearanceInputRef}>
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
      <div className="submit-student-button">
      <button className="header-buttons" onClick={addNewStudent}>Add New Student</button>
      </div>
    </div>
  );
}

export default AddStudentRevised;
