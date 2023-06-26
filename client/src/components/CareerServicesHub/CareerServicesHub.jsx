import React, { useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";

import "./CareerServicesHub.css";

import galvanizeLogo from "../logIn/galvanizeLogo.webp";
const StudentViewCard = React.lazy(() =>
  import("./StudentCards/StudentViewCard")
);
const AdminViewCards = React.lazy(() => import("./AdminViewCards"));

export default function CareerServicesHub({
  loggedInfo,
  isStudent,
  studentInfo,
  managerInfo,
  setLoggedInfo,
  setManagerInfo,
  setStudentInfo,
  setIsStudent,
  url,
}) {
  const [popUpLogOff, setPopUpLogOff] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const cookies = document.cookie.split(";");
      const found = cookies.find((element) =>
        element.trim().startsWith("jwt=")
      );
      let response;

      //check if its manager token
      response = await fetch(`${url}/login/isAuthorized`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: found ? `Bearer ${found.split("jwt=")[1]}` : "",
        }, //student_email student_password\
      });
      //if not check if its student token
      // if (!response.ok){
      //   response = await fetch(`${url}/students/login/isAuthorized`, {
      //     method: "GET",

      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization:(found?`Bearer ${found.split('jwt=')[1]}`:''),

      // },//student_email student_password\

      // });
      //if its still not ok, then throw an error.
      if (!response.ok) {
        throw new Error("Not Authorized");
      } else {
        const result = await response.json();
        console.log(result);
        if (!result.message.isAdmin) {
          setIsStudent(true);
          console.log(result);
          setStudentInfo(result);
        } else setManagerInfo(result.message);
        return result;
      }
    };
    // else {
    //   const result = await response.json();
    //   setManagerInfo(result.message);
    //   setStudentInfo(result.message);
    // }
    // }
    fetchData()
      .then((auth) => setLoggedInfo(true))
      .catch((e) => {
        setLoggedInfo(false);
        if (!loggedInfo) nav("/login");
      }); //fetches data, if no error set loggedInfo, else empty it.
  }, []);

  useEffect(() => {
    setOpacity(1);
  }, [isStudent]);
  /*
    The handle clear functions set all states back to the original configuration of the state.
    To reset/clear out the input bar for the search bar make sure searchTerm has propped drilled down to the grandchild.
    If the input bar's className is changed in the Search.jsx file, it needs to be changed to update the variable searchBar.
    If the Service Career Manager's select's id is changed on the Filter_com.jsx file, it must be changed to update the variable selectElement
  */
  const handleLogOff = async () => {
    const LOGOFF_TIMER = 6;
    const promiseList = [];
    let count = 0;
    for (
      let i = LOGOFF_TIMER;
      i > 0;
      i-- //from 6 to 1
    ) {
      promiseList.push(
        new Promise((resolve) => {
          setTimeout(() => {
            setPopUpLogOff(i - 1); //starting with 0
            resolve();
          }, (LOGOFF_TIMER - i) * 1000); //starting with 5
        })
      );
      count++;
    }
    await Promise.all(promiseList).then(() => {
      document.cookie = `jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      setLoggedInfo("");
      nav("/login");
    }); //expires immediately. The day is the very beginning of the timeDate for first computer
  };

  if (isStudent) {
    return (
      <Suspense fallback={<div>Loading</div>}>
        {
          <StudentViewCard
            popUpLogOff={popUpLogOff}
            studentInfo={studentInfo}
            handleLogOff={() => handleLogOff()}
            url={url}
          />
        }
      </Suspense>
    );
  } else {
    return (
      <Suspense fallback={<div>Loading</div>}>
        {
          <AdminViewCards
            url={url}
            managerInfo={managerInfo}
            setManagerInfo={setManagerInfo}
            popUpLogOff={popUpLogOff}
            galvanizeLogo={galvanizeLogo}
            isStudent={isStudent}
            opacity={opacity}
            handleLogOff={() => handleLogOff()}
          />
        }
      </Suspense>
    );
  }
}
