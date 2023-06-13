import React, { useRef, useContext } from "react";
import { FieldsContext } from "../../../context/fieldsContext";
import { StudentsContext } from "../../../context/studentsContext";
import "./StudentModal.css";
import { ManagersContext } from "../../../context/managersContext";
export default function StudentModal({
  handleUpdateExistingStudent,
  handleModalToggle,
  student,
}) {
  // URL for API based on the environment (development or production)
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000"
      : "https://career-services-server.onrender.com";

  // Accessing the fields data from the FieldsContext
  const fieldsContext = useContext(FieldsContext);
  const fields = fieldsContext.fieldsData;

  // Accessing the managers data from the ManagersContext
  const managersContext = useContext(ManagersContext);
  const managers = managersContext.managersData;

  // Accessing the students data from the StudentContext
  const studentContext = useContext(StudentsContext);
  const setUpdate = studentContext.setUpdate;
  const update = studentContext.update;

  // Options for different fields obtained from the fields data
  const milestoneProgressOptions = fields.milestoneProgress;
  const careerStatusOptions = fields.career_status;
  const courseStatusOptions = fields.course_status;
  const clearanceStatusOptions = fields.sec_clearance;
  const degreeStatusOptions = fields.college_degree;

  // References for form input elements
  const coverLetterInputRef = useRef();
  const resumeInputRef = useRef();
  const linkedInInputRef = useRef();
  const narrativeInputRef = useRef();
  const huntrInputRef = useRef();
  const careerInputRef = useRef();
  const courseInputRef = useRef();
  const clearanceInputRef = useRef();
  const degreeInputRef = useRef();

  // Function to handle updating the student data
  function handleUpdateStudent(e) {
    // Creating a new updated student object
    let newUpdatedStudent = {};
    let existingStudentObj = {};
    // let milestones = [];
    // existingStudentObj.milestones = [];

    // Copying the existing milestones with their data
    // student.milestones.forEach((milestone) => {
    //   let newMilestone = {};
    //   newMilestone.mile_name = milestone.mile_name;
    //   newMilestone.mile_id = milestone.mile_id;
    //   newMilestone.student_id = milestone.student_id;
    //   milestones.push(newMilestone);
    // });

    // Updating the progress status for each milestone based on the selected values
    newUpdatedStudent.cover_letter = coverLetterInputRef.current.value;
    newUpdatedStudent.resume = resumeInputRef.current.value;
    newUpdatedStudent.linkedin = linkedInInputRef.current.value;
    newUpdatedStudent.personal_narrative = narrativeInputRef.current.value;
    newUpdatedStudent.hunter_access = huntrInputRef.current.value;

    // Updating other fields in the updated student object
    newUpdatedStudent.career_status = careerInputRef.current.value;
    newUpdatedStudent.course_status = courseInputRef.current.value;
    newUpdatedStudent.sec_clearance = clearanceInputRef.current.value;
    newUpdatedStudent.college_degree = degreeInputRef.current.value;
    newUpdatedStudent.tscm_id = student.tscm_id;
    newUpdatedStudent.student_first = student.student_first;
    newUpdatedStudent.student_last = student.student_last;
    newUpdatedStudent.cohort = student.cohort;
    newUpdatedStudent.student_id = student.student_id;
    existingStudentObj = newUpdatedStudent;
    // existingStudentObj.milestones = milestones;

    // Setting the first and last name of the manager for the student
    existingStudentObj.tscm_first =
      managers[newUpdatedStudent.tscm_id - 1].tscm_first;
    existingStudentObj.tscm_last =
      managers[newUpdatedStudent.tscm_id - 1].tscm_last;
    handleUpdateExistingStudent(existingStudentObj);

    fetch(`${url}/students/${newUpdatedStudent.student_id}`, {
      method: "PATCH",
      body: JSON.stringify(newUpdatedStudent),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //Adding Milestones to Student
        // milestones.forEach((milestone) => {
        //   fetch(
        //     `${url}/students/${data.student_id}/milestones/${milestone.mile_id}`,
        //     {
        //       method: "PATCH",
        //       body: JSON.stringify(milestone),
        //       headers: {
        //         "Content-type": "application/json; charset=UTF-8",
        //       },
        //     }
        //   )
        //     .then((response) => response.json())
        //     .then((data) => {
        //       // Update Context with response
        //     })
        //     .catch(function (error) {
        //       console.log(error);
        //     });
        // });
        setUpdate(!update);
      })
      .catch(function (error) {
        console.log(error);
      });

    handleModalToggle();
  }
  // Function to reset the form input elements with student data
  function resetStudentModalForms() {
    coverLetterInputRef.current.value = student.cover_letter;
    resumeInputRef.current.value = student.resume;
    linkedInInputRef.current.value = student.linkedin;
    narrativeInputRef.current.value = student.personal_narrative;
    huntrInputRef.current.value = student.hunter_access;
    careerInputRef.current.value = student.career_status;
    courseInputRef.current.value = student.course_status;
    clearanceInputRef.current.value = student.sec_clearance;
  }

  return (
    <>
      <div className="modal-overlay-container">
        <div
          onClick={() => {
            handleModalToggle(), resetStudentModalForms();
          }}
          className="student-backdrop"
        ></div>

        <div className="student-tracker-modal">
          <div className="student-tracker-modal-name">
            {student.student_first} {student.student_last}
          </div>
          <div className="student-tracker-modal-mcsp">{student.cohort}</div>

          <br />
          <div className="student-tracker-modal-milestones-div">Milestones</div>
          <div className="student-tracker-modal-cover-status">
            <label htmlFor="cover-status">Cover Letter: </label>
            <select name="Cover Letter Status" ref={coverLetterInputRef}>
              <option value={student.cover_letter}>
                {student.cover_letter}
              </option>
              {milestoneProgressOptions.map((option) => {
                if (option != student.cover_letter) {
                  return (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          <div className="student-tracker-modal-resume-status">
            <label htmlFor="resume-status">Resume: </label>
            <select name="Resume Status" ref={resumeInputRef}>
              <option value={student.resume}>
                {student.resume}
              </option>
              {milestoneProgressOptions.map((option) => {
                if (option != student.resume) {
                  return (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          <div className="student-tracker-modal-linked-status">
            <label htmlFor="linked-status">Linked In Profile: </label>
            <select name="Linked In Status" ref={linkedInInputRef}>
              <option value={student.linkedin}>
                {student.linkedin}
              </option>
              {milestoneProgressOptions.map((option) => {
                if (option != student.linkedin) {
                  return (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          <div className="student-tracker-modal-narrative-status">
            <label htmlFor="narrative-status">Personal Narrative: </label>
            <select name="Narrative Status" ref={narrativeInputRef}>
              <option value={student.personal_narrative}>
                {student.personal_narrative}
              </option>
              {milestoneProgressOptions.map((option) => {
                if (option != student.personal_narrative) {
                  return (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          <div className="student-tracker-modal-huntr-status">
            <label htmlFor="huntr-status">Huntr Access: </label>
            <select name="Huntr Status" ref={huntrInputRef}>
              <option value={student.hunter_access}>
                {student.hunter_access}
              </option>
              {milestoneProgressOptions.map((option) => {
                if (option != student.hunter_access) {
                  return (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  );
                }
              })}
            </select>
          </div>

          <br />
          <div className="student-tracker-modal-additional-information">
            Additional Information
          </div>
          <div className="student-tracker-modal-career-status">
            <label htmlFor="career-status">Career Status: </label>
            <select name="Career Status" ref={careerInputRef}>
              <option value={student.career_status}>
                {student.career_status}
              </option>
              {careerStatusOptions.map((option) => {
                if (option != student.career_status) {
                  return (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          <div className="student-tracker-modal-course-status">
            <label htmlFor="course-status">Course Status: </label>
            <select name="Course Status" ref={courseInputRef}>
              <option value={student.course_status}>
                {student.course_status}
              </option>
              {courseStatusOptions.map((option) => {
                if (option != student.course_status) {
                  return (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          <div className="student-tracker-modal-clearance-status">
            <label htmlFor="clearance-status">Clearance Status: </label>
            <select name="Clearance Status" ref={clearanceInputRef}>
              <option value={student.sec_clearance}>
                {student.sec_clearance}
              </option>
              {clearanceStatusOptions.map((option) => {
                if (option != student.sec_clearance) {
                  return (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          <div className="student-tracker-modal-degree-status">
            <label htmlFor="degree-status">Degree Status: </label>
            <select name="Degree Status" ref={degreeInputRef}>
              <option value={student.college_degree}>
                {student.college_degree}
              </option>
              {degreeStatusOptions.map((option) => {
                if (option != student.college_degree) {
                  return (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          <br />
          <div className="update-student-container">
            <button className="header-buttons" onClick={handleUpdateStudent}>
              Update Student
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
