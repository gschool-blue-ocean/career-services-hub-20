import React, { useState, useEffect, createContext } from "react";

export const StudentsContext = createContext();

export function StudentsContextProvider({ children, loggedInfo,isStudent }) {
  //Update hook is used in the use effect for later so that when a component does a task the student state gets updated along with DB
  const [update, setUpdate] = useState(true);
  const [studentsData, setStudentsData] = useState([
    {
      student_first: "Test",
      student_id: 1,
      student_last: "Test",
      career_status: "Searching",
      cohort: "MCSP-18",
      college_degree: "Associate Not in CS/STEM",
      course_status: "Graduate",
      sec_clearance: "Undetermined",
      cover_letter: "Un-Satisfactory",
      resume: "Un-Satisfactory",
      linkedin: "Completed",
      personal_narrative: "Un-Satisfactory",
      hunter_access: "Un-Satisfactory",
      tscm_first: "Cade",
      tscm_id: 6,
      tscm_last: "Nienow",
    },
  ]);

    // This allows the app to run in both development (locally) and deployed (on render)
    const url = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://career-services-server.onrender.com';
    
    // Run once, until page is refreshed
    useEffect(() =>{
        // Get latest students data from SQL database
        const fetchData = async () => {
            try {
              const cookies = document.cookie.split(";");
              const found = cookies.find(element=> element.startsWith('jwt='))
              let response;
                if (isStudent)
                {
                  response = await fetch(`${url}/students/1`,{
                    method:'GET',
                    headers: {'Content-Type': 'application/json', 'Authorization': (found?`Bearer ${found.split('jwt=')[1]}`:'')}
                  })
                  
                }
                else
                {
                  response = await fetch(`${url}/students`);
                }
                
                const students = await response.json();
                setStudentsData(students); // Update state with all students and thier milestones
            } catch (error) {
                console.log(error);
            }
        };
        if (loggedInfo)
          fetchData(); // Execute fetch above
    }, [loggedInfo]);

  return (
    <StudentsContext.Provider value={{ studentsData, setUpdate, update }}>
      {children}
    </StudentsContext.Provider>
  );
}
