import React, { useState, useEffect } from 'react';
import galvanizeLogo from '../../logIn/galvanizeLogo.webp';
import './StudentViewCard.css';

const StudentViewCard = (studentInfo, handleLogOff) => {
  console.log(studentInfo.studentInfo);

  const [currentStudent, setCurrentStudent] = useState({});
  const url = 'http://localhost:8000';
  useEffect(() => {
    async function getUser(){
        if(studentInfo.studentInfo.message){
        await fetch(`${url}/students/${studentInfo.studentInfo.message.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
          .then((response) => response.json())
          .then((data) => {
            setCurrentStudent(data[0]);
            console.log(data); // Log the fetched data here
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        }
        }
        getUser()
    }, [studentInfo]);

  console.log(currentStudent)
  return (
    <>
      <img className="logo" src={galvanizeLogo} alt="Galvanize Logo" />
      <div>
        <div className="studentCard">
            <div className='card-item'><p>{currentStudent.student_first} {currentStudent.student_last}</p> </div>
            <div className='card-item'>Education Level: {currentStudent.college_degree} <p>Personal Narrative: {currentStudent.personal_narrative} </p></div>
            <div className='card-item'>Cohort: {currentStudent.cohort}<p>CSM: {currentStudent.tscm_first} {currentStudent.tscm_last}</p></div>
            <div className='card-item'>LinkedIn: {currentStudent.linkedin}<p>Hunter Account: {currentStudent.hunter_access}</p></div>
            <div className='card-item'>Course Standing: {currentStudent.course_status} <p>Security Clearance: {currentStudent.sec_clearance}</p></div>
            <div className='card-item'>Cover Letter: {currentStudent.cover_letter} <p>Resume: {currentStudent.resume}</p></div>
        </div>
            <div className='contact'>
            <div>Contact your TSCM: {currentStudent.tscm_email}</div>
            </div> 
        
      </div>
      <button onClick={studentInfo.handleLogOff}>log off</button>
    </>
  );
};

export default StudentViewCard;

//career_status: "Searching"
// cohort:  "MCSP-21"
// college_degree:  "Masters in CS/STEM"
// course_status:  "Graduate"
// cover_letter:  "Un-Satisfactory"
// hunter_access: "In-Progress"
// linkedin:  "Un-Satisfactory"
// personal_narrative : "Completed"
// resume :  "In-Progress"
// sec_clearance :  "TOP SECRET"
// student_email :  "student@student.com"
// student_first :  "Bill"
// student_id : 100
// student_last :  "Musk"
// student_password :  "$2b$10$OSL6hfYGj8ZHFr86INDXR.NDZ/X6WZdnXymaVlsI94gl6VTDD86o2"
// tscm_first :  "Guido"
// tscm_id : 7
// tscm_last : "Lindgren"