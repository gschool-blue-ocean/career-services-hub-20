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
    const managerFirst = managers[newStudentObj.tscm_id - 1].tscm_first;
    const managerLast = managers[newStudentObj.tscm_id - 1].tscm_last;
    newStudentObj.tscm_first = managerFirst;
    newStudentObj.tscm_last = managerLast;

    try {
      const response = await fetch(`${url}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudentObj),
      });

      const addedStudent = await response.json();
      newStudentObj.milestones = [];
      //Adding Milestones to Student
      milestoneArray.forEach((milestone_name) => {
        const newMilestone = {
          mile_name: milestone_name,
          progress_stat: "In-Progress",
        };
        newStudentObj.milestones.push(newMilestone);
        fetch(`${url}/students/${addedStudent.student_id}/milestones`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMilestone),
        });
      });
      handleUpdateNewStudent(newStudentObj);
      return addedStudent;
    } catch (error) {
      console.log(error);
    } finally {
      setAddStudent(false);
    }

    handleAddStudentModalToggle();
  };

  return (
    <div className="add-container">
      <div className="add-subcontainer">
        <h1 id="add-text">Select MCSP</h1>
        <span>
          {" "}
          MCSP:{" "}
          <input
            type="number"
            className="import-input-MCSP"
            ref={mcspInputRef}
          />{" "}
        </span>
      </div>
      <div className="add-subcontainer">
        <h1 id="add-text">Managers</h1>
        <select className="import-input" ref={managerInputRef}>
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
        <h1 id="add-text">Enter First Name:</h1>
        <input
          type="text"
          placeholder="first name"
          ref={studentFirstInputRef}
        />
      </div>
      <div className="add-subcontainer">
        <h1 id="add-text">Enter Last Name:</h1>
        <input type="text" placeholder="last name" ref={studentLastInputRef} />
      </div>
      <div className="add-subcontainer">
        <h1 id="add-text">Education:</h1>
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
        <h1 id="add-text">Security Clearance:</h1>
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
      <button onClick={addNewStudent}>Add New Student</button>
    </div>
  );
}

export default AddStudentRevised;
