import React, { useState, useEffect } from "react";
import "./StudentCard.css";
import StudentModal from "./StudentModal";

// Component responsible for rendering a student card
export default function StudentCard({
  currentStudents,
  handleUpdateExistingStudent,
  student,
}) {
  const [milestoneProgress, setMilestoneProgress] = useState("Un-Satisfactory"); // State for milestone progress status
  const [modalToggle, setModalToggle] = useState(false); // State for modal toggle
  let count = 0;
  let unSatisfactoryFlag = false;

  useEffect(() => {
    // Calculate the milestone progress and update the state
    student.milestones.forEach((milestone) => {
      if (milestone.progress_stat == "Un-Satisfactory") {
        unSatisfactoryFlag = true; // Set the flag if any milestone is unsatisfactory
        return;
      } else if (milestone.progress_stat == "In-Progress") {
        count = count + 1; // Increment count for milestones in progress
      }
    });

    // Update the milestone progress based on the count and unsatisfactory flag
    if (unSatisfactoryFlag == true) {
      // leave the state as default (un-satisfactory)
    } else if (count > 0) {
      setMilestoneProgress("In-Progress"); // Set the state as in-progress
    } else {
      setMilestoneProgress("Completed"); // Set the state as completed
    }
  }, [student, currentStudents]);

  // Function to handle modal toggle
  function handleModalToggle() {
    let newModalToggle = !modalToggle; // Toggle the modal state
    setModalToggle(newModalToggle); // Update the modal state
  }

  return (
    <>
      <div
        onClick={handleModalToggle}
        className={
          milestoneProgress == "Un-Satisfactory"
            ? "un-satisfactory-card student-card"
            : milestoneProgress == "In-Progress"
            ? "in-progress-card student-card"
            : "completed-card student-card"
        }
      >
        <span className="student-card-name">
          {student.student_first} {student.student_last[0]} .
        </span>
        <span className="student-card-cohort">{student.cohort}</span>
        <span className="student-card-manager">
          {student.tscm_first} {student.tscm_last[0]} .
        </span>
      </div>
      <div className={modalToggle ? "modal-on" : "modal-off"}>
        <StudentModal
          handleUpdateExistingStudent={handleUpdateExistingStudent}
          handleModalToggle={handleModalToggle}
          student={student}
        />
      </div>
    </>
  );
}
