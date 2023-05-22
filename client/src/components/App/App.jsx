import React, { useState, useEffect } from "react";
import "./App.module.css";

import { EventsContextProvider } from '../../context/eventsContext'
import { StudentsContextProvider } from '../../context/studentsContext'
import { ManagersContextProvider } from '../../context/managersContext'
import { FieldsContextProvider } from '../../context/fieldsContext'
import CareerServicesHub from '../CareerServicesHub/CareerServicesHub'
import LogInPage from '../logIn/logInPage'

const App = () => {
  const [loggedInfo, setLoggedInfo] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      // If a token is stored in local storage, consider the user as logged in.
      setLoggedInfo(token);
    }
  }, [loggedInfo]);

  useEffect(() => {
    if (isTransitioning) {
    setIsTransitioning(false)
      return () => clearTimeout(); // cleanup timer on unmount
    }
  }, [isTransitioning]);

  const handleLogOff = () => {
    console.log("log off started");
    localStorage.removeItem('authToken');
    setIsTransitioning(true);
    setLoggedInfo('');
    console.log("log off completed");
  };

  const handleLogin = (info) => {
    console.log("log in started");
    setIsTransitioning(true);
    setLoggedInfo(info);
      console.log("log in completed");
  };

  return (
    <EventsContextProvider>
      <StudentsContextProvider>
        <ManagersContextProvider>
          <FieldsContextProvider>
            {isTransitioning && loggedInfo ? (
                <CareerServicesHub handleLogOff={handleLogOff} isTransitioning={isTransitioning} setIsTransitioning={setIsTransitioning} loggedInfo={loggedInfo}/>
            ) : null}
            {!isTransitioning && loggedInfo ? (
              <CareerServicesHub handleLogOff={handleLogOff} isTransitioning={isTransitioning} setIsTransitioning={setIsTransitioning} loggedInfo={loggedInfo} />
            ) : null}
            {!loggedInfo ? <LogInPage handleLogin={handleLogin} /> : null}
          </FieldsContextProvider>
        </ManagersContextProvider>
      </StudentsContextProvider>
    </EventsContextProvider>
  );
};

export default App;