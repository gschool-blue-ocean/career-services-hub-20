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

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      // If a token is stored in local storage, consider the user as logged in.
      setLoggedInfo(token);
    }
  }, [loggedInfo]);

  const handleLogOff = () => {
    localStorage.removeItem('authToken');
    setLoggedInfo('');
  };

  const handleLogin = (info) => {
    setLoggedInfo(info);
  };

  return (
    <EventsContextProvider>
      <StudentsContextProvider>
        <ManagersContextProvider>
          <FieldsContextProvider>
            {loggedInfo ? (
                <CareerServicesHub handleLogOff={handleLogOff} loggedInfo={loggedInfo}/>
            ) : <LogInPage handleLogin={handleLogin} /> }
          </FieldsContextProvider>
        </ManagersContextProvider>
      </StudentsContextProvider>
    </EventsContextProvider>
  );
};

export default App;