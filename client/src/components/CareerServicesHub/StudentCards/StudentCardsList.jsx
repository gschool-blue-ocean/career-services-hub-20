import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { StudentsContext } from "../../../context/studentsContext";
import AddStudent from "../AddStudentCard/AddStudentCard";
import StudentCard from "./StudentCard";
import "./StudentCardList.css";

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
}) {
  const studentContext = useContext(StudentsContext);
  let students = studentContext.studentsData;
  const [currentStudents, setCurrentStudents] = useState(['', students]);
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
  useEffect(() => {
    setCurrentStudents(students);
  }, [students]);

  function handleUpdateNewStudent(newStudentObj) {
    const newCurrentStudents = currentStudents.push(newStudentObj);
    setCurrentStudents(newCurrentStudents);
  }

  function handleUpdateExistingStudent(existingStudentObj) {
    const updatedStudents = filteredStudents.map((student) => {

        if (student.student_id === existingStudentObj.student_id) {
          return existingStudentObj;
        }
        return student;
    });

    filteredStudents = updatedStudents;
    setCurrentStudents(updatedStudents);
  }

  return (
    <>
      <div className="student-card-container">
        <AddStudent
          filterStudents={filterStudents}
          handleUpdateNewStudent={handleUpdateNewStudent}
        />
        {filterStudents != null
          ? filteredStudents.map((student) => {
              if (student.student_first === "Test") {
                return <div key ="test" className="loading-card">Loading...</div>;
              } else {
                return (
                  <div key={student.student_id}>
                    <StudentCard 
                    currentStudents={currentStudents}
                    handleUpdateExistingStudent={handleUpdateExistingStudent}
                    student={student} />
                  </div>
                );
              }
            })
          : "Loading"}
      </div>
    </>
  );
}
