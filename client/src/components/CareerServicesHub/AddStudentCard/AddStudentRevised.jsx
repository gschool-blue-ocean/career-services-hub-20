import React, { useContext, useState, useRef } from "react";
import "./AddStudentCard.css";
import { ManagersContext } from "../../../context/managersContext";
import { StudentsContext } from "../../../context/studentsContext";
import { FieldsContext } from "../../../context/fieldsContext";

function AddStudentRevised({ setAddStudent, handleAddStudentModalToggle, handleUpdateNewStudent }) {
  // Retrieve the API URL based on the environment (development or production)
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000"
      : "https://career-services-server.onrender.com";

  // References to input fields
  const managerInputRef = useRef();
  const mcspInputRef = useRef();
  const studentFirstInputRef = useRef();
  const studentLastInputRef = useRef();
  const clearanceInputRef = useRef();
  const educationInputRef = useRef();

  // Retrieve data from context providers
  const studentContext = useContext(StudentsContext);
  const students = studentContext.studentsData;

  const fieldsContext = useContext(FieldsContext);
  const fields = fieldsContext.fieldsData;

  const managersContext = useContext(ManagersContext);
  const managers = managersContext.managersData;

  // Extract necessary fields from the context data
  const secClearance = fields.sec_clearance;
  const addEducation = fields.college_degree;

  // Get the milestone names from the first student
  const firstStudent = students[0];
  const milestoneFields = firstStudent.milestones.map(
    (milestone) => milestone.mile_name
  );
  const milestoneArray = milestoneFields.map((milestone) => milestone);

  // Function to add a new student
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
    // Retrieve manager's first and last name based on the selected manager ID
    const managerFirst = managers[newStudentObj.tscm_id - 1].tscm_first;
    const managerLast = managers[newStudentObj.tscm_id - 1].tscm_last;
    newStudentObj.tscm_first = managerFirst;
    newStudentObj.tscm_last = managerLast;

    try {
      // Send a POST request to add the new student
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
        // Send a POST request to add the milestone to the new student
        fetch(`${url}/students/${addedStudent.student_id}/milestones`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMilestone),
        });
      });
      // Update the UI with the newly added student
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
        <div id="add-text">MCSP:</div>
        <span>
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
        <button className="header-buttons" onClick={addNewStudent}>
          Add New Student
        </button>
      </div>
    </div>
  );
}

export default AddStudentRevised;
