import React, { useState, useEffect, createContext, useContext } from "react";
import { StudentsContext } from './studentsContext';

export const FieldsContext = createContext();

export function FieldsContextProvider ({children}) {
    const [fieldsData, setFieldsData] = useState({
        cohort : [],
        milestoneNames: [],
        milestoneProgress : [],
        course_status : [],
        career_status : [],
        sec_clearance : [],
        college_degree : []
    });

    const studentContext = useContext(StudentsContext);
    const students = studentContext.studentsData;

    students.forEach(student => {
        const newFieldsData = fieldsData; 

        if (newFieldsData.cohort.indexOf(student.cohort) == -1)
            newFieldsData.cohort.push(student.cohort); 

        if (newFieldsData.course_status.indexOf(student.course_status) == -1)
            newFieldsData.course_status.push(student.course_status); 

        if (newFieldsData.career_status.indexOf(student.career_status) == -1)
            newFieldsData.career_status.push(student.career_status); 

        if (newFieldsData.sec_clearance.indexOf(student.sec_clearance) == -1)
            newFieldsData.sec_clearance.push(student.sec_clearance); 
        
        if (newFieldsData.college_degree.indexOf(student.college_degree) == -1)
            newFieldsData.college_degree.push(student.college_degree);
    });    

    students[0].milestones.forEach(milestone => {
        const newFieldsData = fieldsData; 

        if (newFieldsData.milestoneNames.indexOf(milestone.mile_name) == -1)
            newFieldsData.milestoneNames.push(milestone.mile_name); 

        if (newFieldsData.milestoneProgress.indexOf(milestone.progress_stat) == -1)
            newFieldsData.milestoneProgress.push(milestone.progress_stat); 
    });

       return(
        <FieldsContext.Provider value={{fieldsData}}>
            {children}
        </FieldsContext.Provider>
    );
}