import React, {useContext} from 'react';
import { StudentsContext } from '../../../context/studentsContext';
import AddStudent from '../AddStudentCard/AddStudentCard';
import StudentCard from './StudentCard';
import './StudentCardList.css'

export default function StudentCardslist ({ filterStudents, currentCohort, coverLetter, currentCoverStatus, studentResume, currentResumeStatus,  linkedAccount, linkedAccountStatus, personalNarrative, narrativeStatus, hunterAccess, currentAccess, currentStatus, currentClearance, educationStatus, currentFirstManager, currentLastManager }) {

  const studentContext = useContext(StudentsContext);
  const students = studentContext.studentsData;
  //console.log(students);

  const filteredStudents = filterStudents(students, currentCohort, coverLetter, currentCoverStatus, studentResume, currentResumeStatus, linkedAccount, linkedAccountStatus, personalNarrative, narrativeStatus, hunterAccess, currentAccess, currentStatus, currentClearance,  educationStatus, currentFirstManager, currentLastManager);
  
  return (
    <>
        <div className='student-card-container'>
            <AddStudent />
            {filterStudents != null ? filteredStudents.map((student) => {
                {/* console.log(student); */}
            return(
                <div key={student.student_id}>
                    <StudentCard  student={student}/>
                </div>
            )
            }) : "Loading"}
        </div>
    </>
  )
}

