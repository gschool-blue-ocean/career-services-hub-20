import React, { useState, useEffect } from "react";
import "./App.module.css";

import { EventsContextProvider } from "../../context/eventsContext";
import { StudentsContextProvider } from "../../context/studentsContext";
import { ManagersContextProvider } from "../../context/managersContext";
import { FieldsContextProvider } from "../../context/fieldsContext";
import CareerServicesHub from "../CareerServicesHub/CareerServicesHub";
import LogInPage from "../logIn/logInPage";

const App = () => {
  const [loggedInfo, setLoggedInfo] = useState(false);
  const [isStudent,setIsStudent] = useState(false);
  const url = 'http://localhost:8000'

  useEffect(()=>{
    if (!isStudent) document.body.classList.remove('student-background');
    else document.body.classList.add('student-background');
  },[isStudent])
  useEffect(() => {
        const fetchData = async()=>{
          const cookies = document.cookie.split(";");
          const found = cookies.find(element=> element.trim().startsWith('jwt='))
          let response;

            //check if its manager token
            response = await fetch(`${url}/managers/login/isAuthorized`, {
              method: "GET",
            
              headers: {
                "Content-Type": "application/json", 
                Authorization:(found?`Bearer ${found.split('jwt=')[1]}`:''),
              },
            });
            //if not check if its student token
            if (!response.ok){
              response = await fetch(`${url}/students/login/isAuthorized`, {
                method: "GET",
              
                headers: {
                  "Content-Type": "application/json", 
                  Authorization:(found?`Bearer ${found.split('jwt=')[1]}`:''),
                },//student_email student_password
              });
              //if its still not ok, then throw an error.
              if (!response.ok)  {
                  throw new Error('Not Authorized')
                }
                setIsStudent(true);
                const result = await response.json(); console.log(result)
                return result;
              }
            }
          fetchData().then(auth=>setLoggedInfo(true)).catch(e=>setLoggedInfo(false)) //fetches data, if no error set loggedInfo, else empty it.

      },[])

      

  const handleLogin = (data) => {
    try {
      setLoggedInfo(data);
    } catch (e) {
      setLoggedInfo(false);
    } //fetches data, if no error set loggedInfo, else empty it.
  };
  const handleLogOff = () => {
    document.cookie = `jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`; //expires immediately. The day is the very beginning of the timeDate for first computer

    setLoggedInfo("");
  };

  return (
    <EventsContextProvider loggedInfo={loggedInfo}>
      <StudentsContextProvider loggedInfo={loggedInfo} isStudent={isStudent}>
        <ManagersContextProvider loggedInfo={loggedInfo}>
          <FieldsContextProvider>
            {loggedInfo ? (
                <CareerServicesHub handleLogOff={handleLogOff} loggedInfo={loggedInfo} isStudent={isStudent}/>
            ) : <LogInPage handleLogin={handleLogin} setIsStudent={setIsStudent} isStudent={isStudent}/> }
          </FieldsContextProvider>
        </ManagersContextProvider>
      </StudentsContextProvider>
    </EventsContextProvider>
  );
};

export default App;
