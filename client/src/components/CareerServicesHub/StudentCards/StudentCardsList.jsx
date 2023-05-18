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
  const students = studentContext.studentsData;
  const [currentStudents, setCurrentStudents] = useState(students);
  useEffect(() => {
    setCurrentStudents(students);
  }, [students]);
  const filteredStudents = filterStudents(
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

  function handleUpdateNewStudent(newStudentObj) {
    const newCurrentStudents = currentStudents.push(newStudentObj);
    setCurrentStudents(newCurrentStudents);
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
                return <div className="loading-card">Loading...</div>;
              } else {
                return (
                  <div key={student.student_id}>
                    <StudentCard student={student} />
                  </div>
                );
              }
            })
          : "Loading"}
      </div>
    </>
  );
}
