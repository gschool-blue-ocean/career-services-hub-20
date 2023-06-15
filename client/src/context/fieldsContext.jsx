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
    career_status: ["Searching", "Hired", "Not Currently Searching"],
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
  const [update,setUpdate] = useState(false);
  const newFieldsData = fieldsData;

  // Need to utilize studentsContext for each possible option
  const studentContext = useContext(StudentsContext);
  const students = studentContext.studentsData;

  // UseEffect will ensure this code runs each time students changes
  useEffect(() => {
    // First ensure that students array is greater than 1 meaning we have all our students from the API
    if (students.length > 1) {
      // Loop through every student from studentsContext
      newFieldsData.cohort=[];
      students.forEach((student) => {
        // If the current student cohort value doesnt exist inside newFieldsData.cohort, add it to array of options
        if (newFieldsData.cohort.indexOf(student.cohort) == -1)
          newFieldsData.cohort.push(student.cohort);
      });
      newFieldsData.cohort.sort((a,b)=>{
        if (a === 'Undetermined')
          return 1;
        const numA = parseInt(a.match(/\d+/));
        const numB = parseInt(b.match(/\d+/));
        return numA- numB;
      });
      setFieldsData(newFieldsData);
      setUpdate(!update);
      console.log(fieldsData)
    }
  }, [students,studentContext.update]);

  return (
    <FieldsContext.Provider value={{ fieldsData,setUpdate,update }}>
      {children}
    </FieldsContext.Provider>
  );
}
