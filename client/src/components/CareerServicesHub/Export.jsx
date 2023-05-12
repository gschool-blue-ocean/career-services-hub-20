import React, {useContext, useState} from 'react';
import exportFromJSON from 'export-from-json';
import { StudentsContext } from '../../context/studentsContext';

function Export({ filterStudents, currentCohort, coverLetter, currentCoverStatus, studentResume, currentResumeStatus,  linkedAccount, linkedAccountStatus,  personalNarrative, narrativeStatus, hunterAccess, currentAccess, currentStatus, currentClearance,  educationStatus, currentFirstManager, currentLastManager }) {

  const studentContext = useContext(StudentsContext);
  const students = studentContext.studentsData;

  const fields = ['cohort', 'student_first', 'student_last', 'sec_clearance', 'career_status', 'course_status', 'college_degree'];
  const milestoneFields = [{ name: 'mile_name' }, { name: 'progress_stat' }];
  const milestoneColumns = milestoneFields.map(field => `milestones.${field.name}`);
  const allFields = fields.concat(milestoneColumns);

  const filteredStudents = filterStudents(students, currentCohort, coverLetter, currentCoverStatus, studentResume, currentResumeStatus, linkedAccount, linkedAccountStatus, personalNarrative, narrativeStatus, hunterAccess, currentAccess, currentStatus, currentClearance, educationStatus, currentFirstManager, currentLastManager);

  const onExportToCsv = () => {
    const selectedStudents = filteredStudents
      .flatMap(student => {
        return student.milestones.map(milestone => ({
          ...student,
          'milestones.mile_name': milestone.mile_name,
          'milestones.progress_stat': milestone.progress_stat
        }))
    });

    const data = selectedStudents;
    const fileName = `${currentCohort}_report`;
    const exportType = exportFromJSON.types.csv;

    exportFromJSON({data, fileName, fields: allFields, exportType});
  }

  return (
    <div>
      <button
        onClick={onExportToCsv}
        className='header-buttons'
      >
        Export to CSV
      </button>
    </div>
  )
}

export default Export;