import React, { useContext } from 'react';
import exportFromJSON from 'export-from-json';
import { StudentsContext } from '../../context/studentsContext';

function Export({ filterStudents, currentCohort, coverLetter, currentCoverStatus, studentResume, currentResumeStatus,  linkedAccount, linkedAccountStatus,  personalNarrative, narrativeStatus, hunterAccess, currentAccess, currentStatus, currentClearance,  educationStatus, selectedManager }) {

  const studentContext = useContext(StudentsContext);
  const students = studentContext.studentsData;

  const filteredStudents = filterStudents(students, currentCohort, coverLetter, currentCoverStatus, studentResume, currentResumeStatus, linkedAccount, linkedAccountStatus, personalNarrative, narrativeStatus, hunterAccess, currentAccess, currentStatus, currentClearance, educationStatus, selectedManager);

  const onExportToCsv = () => {
    
    const firstStudent = filteredStudents[0];
    const milestoneFields = firstStudent.milestones.map((milestone) => milestone.mile_name);
  
    const fields = ['cohort', 'student_first', 'student_last', 'sec_clearance', 'career_status', 'course_status', 'college_degree', ...milestoneFields, 'tscm_first', 'tscm_last'];
    
    const selectedStudents = filteredStudents.map(student => {
      const milestones = student.milestones.reduce((acc, milestone) => {
        acc[milestone.mile_name] = milestone.progress_stat;
        return acc;
      }, {});
  
      return {
        ...student,
        ...milestones,
      };
    });

    const data = selectedStudents;
    const fileName = `${currentCohort}_report`;
    const exportType = exportFromJSON.types.csv;

    exportFromJSON({data, fileName, fields: fields, exportType});
  }

  return (
    <div className='export-button'>
      <button
        onClick={onExportToCsv}
        className='header-buttons'
        id='export'
      >
        Export to CSV
      </button>
    </div>
  )
}

export default Export;