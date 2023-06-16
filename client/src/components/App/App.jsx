import React, { useState, useEffect } from "react";

import { EventsContextProvider } from "../../context/eventsContext";
import { StudentsContextProvider } from "../../context/studentsContext";
import { ManagersContextProvider } from "../../context/managersContext";
import { FieldsContextProvider } from "../../context/fieldsContext";
import CareerServicesHub from "../CareerServicesHub/CareerServicesHub";
import LogInPage from "../logIn/logInPage";

const App = () => {
  const [loggedInfo, setLoggedInfo] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  const [studentInfo, setStudentInfo] = useState({});

  const url = "http://localhost:8000";

  useEffect(() => {
    if (!isStudent) document.body.classList.remove("student-background");
    else document.body.classList.add("student-background");
  }, [isStudent]);
  useEffect(() => {
    const fetchData = async () => {
      const cookies = document.cookie.split(";");
      const found = cookies.find((element) =>
        element.trim().startsWith("jwt=")
      );
      let response;

      //check if its manager token
      response = await fetch(`${url}/managers/login/isAuthorized`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: found ? `Bearer ${found.split("jwt=")[1]}` : "",
        },
      });
      //if not check if its student token
      if (!response.ok) {
        response = await fetch(`${url}/students/login/isAuthorized`, {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: found ? `Bearer ${found.split("jwt=")[1]}` : "",
          }, //student_email student_password\
        });

        //if its still not ok, then throw an error.
        if (!response.ok) {
          throw new Error("Not Authorized");
        } else {
          setIsStudent(true);
          const result = await response.json();
          console.log(result);
          setStudentInfo(result);
          return result;
        }
      }
    };
    fetchData()
      .then((auth) => setLoggedInfo(true))
      .catch((e) => {
        setLoggedInfo(false);
        setStudentInfo({});
        console.log(e);
      }); //fetches data, if no error set loggedInfo, else empty it.
  }, []);

  const handleLogin = async (data) => {
    console.log("handle login reached");
    const cookies = document.cookie.split(";");
    const found = cookies.find((element) => element.trim().startsWith("jwt="));
    // try {
    if (isStudent) {
      const response = await fetch(`${url}/students/login/isAuthorized`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: found ? `Bearer ${found.split("jwt=")[1]}` : "",
        }, //student_email student_password\
      });
      const result = await response.json();
      setStudentInfo(result);
      console.log(result);
      console.log(studentInfo);
    }
    setLoggedInfo(data);
    console.log(data);
    // } catch (e) {
    //   setLoggedInfo(false);
    //   setStudentInfo({})
    // } //fetches data, if no error set loggedInfo, else empty it.
  };
  const handleLogOff = () => {
    document.cookie = `jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`; //expires immediately. The day is the very beginning of the timeDate for first computer

    setLoggedInfo("");
  };

  return (
    <EventsContextProvider loggedInfo={loggedInfo}>
      <StudentsContextProvider
        loggedInfo={loggedInfo}
        isStudent={isStudent}
        studentInfo={studentInfo}
      >
        <ManagersContextProvider loggedInfo={loggedInfo}>
          <FieldsContextProvider>
            {loggedInfo ? (
              <CareerServicesHub
                handleLogOff={handleLogOff}
                loggedInfo={loggedInfo}
                isStudent={isStudent}
                studentInfo={studentInfo}
              />
            ) : (
              <LogInPage
                handleLogin={handleLogin}
                setIsStudent={setIsStudent}
                isStudent={isStudent}
              />
            )}
          </FieldsContextProvider>
        </ManagersContextProvider>
      </StudentsContextProvider>
    </EventsContextProvider>
  );
};

export default App;
