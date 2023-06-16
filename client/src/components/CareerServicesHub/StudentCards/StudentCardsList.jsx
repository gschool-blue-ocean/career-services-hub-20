import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { StudentsContext } from "../../../context/studentsContext";
import AddStudent from "../AddStudentCard/AddStudentCard";
import StudentCard from "./StudentCard";
import "./StudentCardList.css";

// Component responsible for displaying a list of student cards with filtering options
export default function StudentCardslist({
  filterStudents,
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
  selectedManager,
  isStudent,
}) {
  const studentContext = useContext(StudentsContext);
  let students = studentContext.studentsData;
  const [currentStudents, setCurrentStudents] = useState(students);
  let filteredStudents = filterStudents(
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
  );

  // Update the currentStudents state whenever the students list changes
  useEffect(() => {
    setCurrentStudents(students);
  }, [students]);

  // Function to handle updating the list with a new student object
  function handleUpdateNewStudent(newStudentObj) {
    const newCurrentStudents = currentStudents.push(newStudentObj); // Add the new student to the current list
    setCurrentStudents(newCurrentStudents); // Update the state with the new list
  }

  // Function to handle updating an existing student object in the list
  function handleUpdateExistingStudent(existingStudentObj) {
    console.log(existingStudentObj);
    const updatedStudents = filteredStudents.map((student) => {
      if (student.student_id === existingStudentObj.student_id) {
        return existingStudentObj; // Replace the existing student with the updated student object
      }
      return student;
    });

    filteredStudents = updatedStudents; // Update the filtered students list
    setCurrentStudents(updatedStudents); // Update the state with the updated list
    console.log(currentStudents);
  }

  return (
    <>
      <div className="student-card-container">
        {/* <AddStudent
          filterStudents={filterStudents}
          handleUpdateNewStudent={handleUpdateNewStudent}
        /> */}
        {filterStudents != null
          ? filteredStudents.map((student) => {
              if (student.student_first === "Test") {
                return (
                  <div key="test" className="loading-card">
                    Loading...
                  </div>
                );
              } else {
                return (
                  <div key={student.student_id}>
                    <StudentCard
                      currentStudents={currentStudents}
                      handleUpdateExistingStudent={handleUpdateExistingStudent}
                      student={student}
                    />
                  </div>
                );
              }
            })
          : "Loading"}
      </div>
    </>
  );
}
