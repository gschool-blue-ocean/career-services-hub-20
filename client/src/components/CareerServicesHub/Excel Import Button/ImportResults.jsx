import React, { useContext } from "react";
import "./ImportResults.css";
import { StudentsContext } from "../../../context/studentsContext";
import { ManagersContext } from "../../../context/managersContext";

export default function ImportResults({
  setAddStudent,
  newStudents,
  importManager,
  importMCSP,
  handleAddStudentModalToggle,
  handleUpdateNewStudent,
}) {
  // This allows the app to run in both development (locally) and deployed (on render)
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000"
      : "https://career-services-server.onrender.com";

  const studentContext = useContext(StudentsContext);
  const students = studentContext.studentsData; // Grab all students from studentsContext which is the result of pinging the API

  const managersContext = useContext(ManagersContext);
  const managers = managersContext.managersData; // Grab all managers from managersContext which is the result of pinging the API

  let headerArray = Object.keys(newStudents[0]); // Extract only the keys from the object, we will use it to contain the headers of the table
  // let milestoneArray = []; // Create blank Array to hold all the required milestones

  // // If students is not null, then create an add the milestones names to the Milestone Array from a student that currently exists
  // // this helps avoid hardcoding what the milestones are in the event they change
  // if (students) {
  //   students[0].milestones.forEach((milestone) => {
  //     milestoneArray.push(milestone.mile_name);
  //   });
  // }

  // Once the "Upload Students" button is clicked, this will take in all the bulk import and call a POST request for each student/milestones
  function handleUploadClick() {
    // Temp object "newStudents" will hold all the needed values for the student POST Request
    newStudents.map((student) => {
      student.career_status = "Not Started"; //Adding Career Status to Student
      student.course_status = "Student"; // Adding Course Status to Student
      student.tscm_id = importManager; // Adding MCSP/Cohort to Student
      student.cohort = `MCSP-${importMCSP}`; // Adding Identified Career Manager to Student
      student.college_degeree = `Unknown`; // Adding Identified Career Manager to Student
      student.cover_letter = "Un-Satisfactory";
      student.resume = "Un-Satisfactory";
      student.linkedin = "Un-Satisfactory";
      student.personal_letter = "Un-Satisfactory";
      student.hunter_access = "Un-Satisfactory";

      // Need Managers First/Last Name to display card correctly using the managersContext
      const managerFirst = managers[student.tscm_id - 1].tscm_first;
      const managerLast = managers[student.tscm_id - 1].tscm_last;
      student.tscm_first = managerFirst;
      student.tscm_last = managerLast;

      // POST request to add students to SQL database
      fetch(`${url}/students`, {
        method: "POST",
        body: JSON.stringify(student),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          handleUpdateNewStudent(student); // Pass the student to the handle function in Students Cards to re-render page without refreshing

          // Close the Student Add Card
          handleAddStudentModalToggle();
          setAddStudent(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  return (
    <>
      <div className="import-results-table">
        <div className="results-student-row header-row">
          {headerArray.map((header) => {
            return (
              <span className="results-student-cell header" key={header}>
                {header}
              </span>
            );
          })}
          <span className="results-student-cell header">Career Status</span>
          <span className="results-student-cell header">Course Status</span>
          <span className="results-student-cell header">MCSP</span>
          <span className="results-student-cell header">Career Manager </span>
          <span className="results-student-cell header"> College Degree </span>
        </div>
        {newStudents.map((student) => {
          return (
            <div className="results-student-row" key={student.student_id}>
              <span className="results-student-cell">
                {student.student_first}
              </span>
              <span className="results-student-cell">
                {student.student_last}
              </span>
              <span className="results-student-cell">
                {student.sec_clearance}
              </span>
              <span className="results-student-cell"> Not Started </span>
              <span className="results-student-cell"> Student </span>
              <span className="results-student-cell"> MCSP-{importMCSP} </span>
              <span className="results-student-cell">
                {" "}
                {managers
                  ? `${managers[importManager - 1].tscm_first}, ${
                      managers[importManager - 1].tscm_last
                    }`
                  : ""}{" "}
              </span>
              <span className="results-student-cell"> Unknown </span>
            </div>
          );
        })}
      </div>
      <div className="results-upload-button-container">
        <button className="header-buttons" onClick={handleUploadClick}>
          {" "}
          Upload Students{" "}
        </button>
      </div>
    </>
  );
}
