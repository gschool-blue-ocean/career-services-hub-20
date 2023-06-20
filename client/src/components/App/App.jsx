import React, { useState, useEffect, Suspense } from "react";
import {BrowserRouter,Routes,Route,useNavigate} from "react-router-dom";

import { EventsContextProvider } from "../../context/eventsContext";
import { StudentsContextProvider } from "../../context/studentsContext";
import { ManagersContextProvider } from "../../context/managersContext";
import { FieldsContextProvider } from "../../context/fieldsContext";
const CareerServicesHub = React.lazy(() => import("../CareerServicesHub/CareerServicesHub"));
import RegisterForm from "../logIn/RegisterForm";
import LogInPage from "../logIn/logInPage";

const App = () => {
  const [loggedInfo, setLoggedInfo] = useState(false);
  const [isStudent,setIsStudent] = useState(false);

  const [studentInfo, setStudentInfo] = useState({});
  
  const url = 'http://localhost:8000'

  useEffect(()=>{
    if (!isStudent) document.body.classList.remove('student-background');
    else document.body.classList.add('student-background');
  },[isStudent])

  return (
    
    <EventsContextProvider loggedInfo={loggedInfo}>
      <StudentsContextProvider loggedInfo={loggedInfo} isStudent={isStudent} studentInfo={studentInfo} >
        <ManagersContextProvider loggedInfo={loggedInfo}>
          <FieldsContextProvider>
            <BrowserRouter>
            
            <Routes>
              <Route path='/login' element={<LogInPage setIsStudent={setIsStudent} isStudent={isStudent} setStudentInfo={setStudentInfo} setLoggedInfo={setLoggedInfo}/>}></Route>
              <Route path="/" element={<Suspense fallback={<div>Loading...</div>}>
                <CareerServicesHub setIsStudent={setIsStudent} loggedInfo={loggedInfo} isStudent={isStudent} studentInfo={studentInfo} setLoggedInfo={setLoggedInfo} setStudentInfo={setStudentInfo}/>
                </Suspense>}>
              </Route>
              <Route path='/register' element={<RegisterForm setIsStudent={setIsStudent}/>} />
            </Routes>
            {/* {loggedInfo ? (
                <CareerServicesHub handleLogOff={handleLogOff} loggedInfo={loggedInfo} isStudent={isStudent} studentInfo={studentInfo}/>
            ) : <LogInPage handleLogin={handleLogin} setIsStudent={setIsStudent} isStudent={isStudent} /> } */}
            </BrowserRouter>
          </FieldsContextProvider>
        </ManagersContextProvider>
      </StudentsContextProvider>
    </EventsContextProvider>
  
  );
};

export default App;
