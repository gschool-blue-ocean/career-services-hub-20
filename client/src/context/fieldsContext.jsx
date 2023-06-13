import React, { useState, useEffect, createContext, useContext } from "react";
import { StudentsContext } from "./studentsContext";

export const FieldsContext = createContext();

export function FieldsContextProvider({ children }) {
  // Create state that will dynamically hold all the possible options for the filter fields
  const [fieldsData, setFieldsData] = useState({
    cohort: [],
    milestoneNames: ["Cover Letter",
    "Resume",
    "LinkedIn",
    "Personal Narrative",
    "Hunter Access",],
    milestoneProgress: ["In-Progress", "Completed", "Un-Satisfactory"],
    course_status: ["Student", "Graduate"],
    career_status: ["Searching", "Hired", "Not Started"],
    sec_clearance: ["Undetermined",
    "None",
    "SECRET",
    "TOP SECRET",
    "TOP SECRET//SCI",],
    college_degree: ["Undetermined",
    "None",
    "Associate in CS/STEM",
    "Associate Not in CS/STEM",
    "Bachelor in CS/STEM",
    "Bachelor Not in CS/STEM",
    "Masters in CS/STEM",
    "Masters Not in CS/STEM",],
  });

  const newFieldsData = fieldsData;

  // Need to utilize studentsContext for each possible option
  const studentContext = useContext(StudentsContext);
  const students = studentContext.studentsData;

  // UseEffect will ensure this code runs each time students changes
  useEffect(() => {
    // First ensure that students array is greater than 1 meaning we have all our students from the API
    if (students.length > 1) {
      // Loop through every student from studentsContext
      students.forEach((student) => {
        // If the current student cohort value doesnt exist inside newFieldsData.cohort, add it to array of options
        if (newFieldsData.cohort.indexOf(student.cohort) == -1)
          newFieldsData.cohort.push(student.cohort);
      });
      newFieldsData.cohort.sort();

        // If the current student course_status value doesnt exist inside newFieldsData.course_status, add it to array of options
        // if (newFieldsData.course_status.indexOf(student.course_status) == -1)
        //   newFieldsData.course_status.push(student.course_status);

        // If the current student career_status value doesnt exist inside newFieldsData.career_status, add it to array of options
        // if (newFieldsData.career_status.indexOf(student.career_status) == -1)
        //   newFieldsData.career_status.push(student.career_status);

        // If the current student sec_clearance value doesnt exist inside newFieldsData.sec_clearance, add it to array of options
        // if (newFieldsData.sec_clearance.indexOf(student.sec_clearance) == -1)
        //   newFieldsData.sec_clearance.push(student.sec_clearance);

        // If the current student college_degree value doesnt exist inside newFieldsData.college_degree, add it to array of options
      //   if (newFieldsData.college_degree.indexOf(student.college_degree) == -1)
      //     newFieldsData.college_degree.push(student.college_degree);
      // });

      // const firstTenStudents = [];

      // Add the first ten students to the firstTenStudents Array
      // for (let i = 0; i < 10; i++) {
      //   firstTenStudents[i] = students[i];
      // }

      // Now check for possible options for the Milestone Names and Progress using the first 10 students
      // (we shouldnt need to check for more students since the amount of milestone progress options are limited and the milestone names should be the same for every student)
      // firstTenStudents.forEach((student) => {
      //   student.milestones.forEach((milestone) => {
      //     // If the current milestone name doesnt exist inside newFieldsData.MilestonesNames, add it to array of options
      //     if (newFieldsData.milestoneNames.indexOf(milestone.mile_name) == -1)
      //       newFieldsData.milestoneNames.push(milestone.mile_name);

      //     // If the current milestone progress doesnt exist inside newFieldsData.MilestonesProgress, add it to array of options
      //     if (
      //       newFieldsData.milestoneProgress.indexOf(milestone.progress_stat) ==
      //       -1
      //     )
      //       newFieldsData.milestoneProgress.push(milestone.progress_stat);
      //   });
      // });
    }
  }, [students]);

  return (
    <FieldsContext.Provider value={{ fieldsData }}>
      {children}
    </FieldsContext.Provider>
  );
}
