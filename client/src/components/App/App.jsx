import React, { useState, useEffect } from "react";
import "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { EventsContextProvider } from '../../context/eventsContext'
import { StudentsContextProvider } from '../../context/studentsContext'
import { ManagersContextProvider } from '../../context/managersContext'
import { FieldsContextProvider } from '../../context/fieldsContext'
import CareerServicesHub from '../CareerServicesHub/CareerServicesHub'
import LogInPage from '../logIn/logInPage'

const App = () => {
  const [loggedInfo, setLoggedInfo] = useState("");
  const [showTransition, setShowTransition] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      // If a token is stored in local storage, consider the user as logged in.
      setLoggedInfo(token);
    }
  }, [loggedInfo]);

  const handleLogOff = () => {
    localStorage.removeItem('authToken')
    setShowTransition('false')
    setLoggedInfo('')
  }

  useEffect(() => {
    if (loggedInfo) {
      document.body.style.background = "linear-gradient(180deg, rgba(21,4,89,1) 22%, rgba(247,130,24,1) 100%)";
    } else {
      document.body.style.background = "linear-gradient(180deg, rgba(21,4,89,1) 22%, rgba(247,130,24,1) 100%)";
    }
  }, [loggedInfo]);

  const handleLogin = (info) => {
    setShowTransition(true);
    setLoggedInfo(info);
  };

  return (
    <Router>
      <EventsContextProvider>
        <StudentsContextProvider>
          <ManagersContextProvider>
            <FieldsContextProvider>
            <Routes>
              <Route
                path="/"
                element={
                  loggedInfo ? (
                    <CareerServicesHub handleLogOff={handleLogOff}/>
                  ) : (
                    <LogInPage handleLogin={handleLogin} />
                  )
                }
              />
              <Route path="/mainpage" element={<CareerServicesHub handleLogOff={handleLogOff}/>} />
            </Routes>
            </FieldsContextProvider>
          </ManagersContextProvider>
        </StudentsContextProvider>
      </EventsContextProvider>
    </Router>
  );
};

export default App;