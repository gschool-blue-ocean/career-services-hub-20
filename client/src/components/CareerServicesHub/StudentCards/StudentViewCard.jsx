import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import galvanizeLogo from "../../logIn/galvanizeLogo.webp";
import "./StudentViewCard.css";

import StudentChangeCard from "./StudentChangeCard";

const StudentViewCard = ({ popUpLogOff, handleLogOff, studentInfo, url }) => {
  if (!studentInfo.message) return <div>Loading</div>;
  const socketRef = useRef(null);
  const [currentStudent, setCurrentStudent] = useState({});
  const [studentChange, setStudentChange] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    socketRef.current = io(url, {
      transports: ["websocket"],
      reconnection: true, // Enable reconnection attempts
      reconnectionAttempts: 1, // Limit the number of reconnection attempts
      reconnectionDelay: 1000, // Initial delay between reconnection attempts (in milliseconds)
      reconnectionDelayMax: 5000, // Maximum delay between reconnection attempts (in milliseconds)
    });
    socketRef.current.emit("connects", { id: studentInfo.message.id });
    return () => {
      socketRef.current.disconnect();
    };
  }, []); //triggers when page loads.
  useEffect(() => {
    async function getUser() {
      if (studentInfo.message) {
        await fetch(`${url}/students/${studentInfo.message.id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => response.json())
          .then((data) => {
            setCurrentStudent(data[0]);
            console.log(data); // Log the fetched data here
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }
    getUser();
  }, [studentInfo, update]);
  const handleSend = () => {};
  return (
    <>
      <div className="container">
        {popUpLogOff > 0 ? (
          <div className="login-popup">
            Successfully logged off. Navigating in {popUpLogOff}s...
          </div>
        ) : null}
        <nav className="student-nav">
          <img className="logo" src={galvanizeLogo} alt="Galvanize Logo" />
          <div className="dropdown">
            <button className="dropbtn">Menu</button>
            <div className="dropdown-content">
              <a onClick={() => setStudentChange(false)}>My Profile</a>
              <a onClick={() => setStudentChange(true)}>Change My Profile</a>
              <a onClick={() => handleSend()}>Notification</a>
              <a onClick={handleLogOff}>Log Out</a>
            </div>
          </div>
        </nav>
        <div style={{ display: "flex", overflow: "auto" }}>
          <nav className="student-setting-nav">
            <div style={{ paddingLeft: "50px" }}>
              <h1>Settings</h1>
              <hr />
              <p onClick={() => setStudentChange(false)}>My Profile</p>
              <p onClick={() => setStudentChange(true)}>Change My Profile</p>
              <p onClick={() => handleSend()}>Notification</p>
              <p onClick={handleLogOff}>Log Out</p>
            </div>
          </nav>
          {studentChange ? (
            <StudentChangeCard
              currentStudent={currentStudent}
              socketRef={socketRef}
              url={url}
              setUpdate={setUpdate}
            />
          ) : (
            <div className="student-profile-data">
              <div className="profile-background-img">
                <img src="https://th.bing.com/th/id/R.b173d064715990e210a19f080fde122a?rik=wyy2%2bsDxPMBAGA&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f3%2fe%2fc%2f563599.jpg&ehk=IIlQVDqUjTmsDGCECQSTU1ogn28Flsaf2OWi74E3Ubk%3d&risl=&pid=ImgRaw&r=0"></img>
              </div>
              <div className="profile-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
                <div className="profile-info-data">
                  <h1 style={{ margin: 0 }}>
                    {currentStudent.student_first} {currentStudent.student_last}
                  </h1>
                  <p style={{ color: "var(--student-text-secondary-color)" }}>
                    No Comments here
                  </p>
                </div>
              </div>
              <div className="student-card-item">
                <h3>My Information</h3>
                <div>
                  <div>
                    <h5>First Name</h5>
                    <p>{currentStudent.student_first}</p>
                  </div>
                  <div>
                    <h5>Last Name</h5>
                    <p>{currentStudent.student_last}</p>
                  </div>
                  <div>
                    <h5>Cohort</h5>
                    <p>{currentStudent.personal_narrative}</p>
                  </div>
                  <div>
                    <h5>Security Clearance</h5>
                    <p>{currentStudent.sec_clearance}</p>
                  </div>
                </div>
              </div>

              <div className="student-card-item">
                <h3>TSCM Information</h3>
                <div>
                  <div>
                    <h5>First Name</h5>
                    <p>{currentStudent.tscm_first}</p>
                  </div>
                  <div>
                    <h5>Last Name</h5>
                    <p>{currentStudent.tscm_last}</p>
                  </div>
                  <div>
                    <h5>Email</h5>
                    <p>{currentStudent.tscm_email}</p>
                  </div>
                </div>
              </div>

              <div className="student-card-item">
                <h3>Additional Information</h3>
                <div>
                  <div>
                    <h5>Education Level</h5>
                    <p>{currentStudent.college_degree}</p>
                  </div>
                  <div>
                    <h5>Course Standing</h5>
                    <p>{currentStudent.course_status}</p>
                  </div>
                  <div>
                    <h5>Personal Narrative</h5>
                    <p>{currentStudent.personal_narrative}</p>
                  </div>
                  <div>
                    <h5>Career Status</h5>
                    <p>{currentStudent.career_status}</p>
                  </div>
                </div>
              </div>
              <div className="student-card-item">
                <h3>My Resources</h3>
                <div>
                  <div>
                    <h5>Cover Letter</h5>
                    <p>{currentStudent.cover_letter}</p>
                  </div>
                  <div>
                    <h5>Resume</h5>
                    <p>{currentStudent.resume}</p>
                  </div>
                  <div>
                    <h5>LinkedIn Account</h5>
                    <p>{currentStudent.linkedin}</p>
                  </div>
                  <div>
                    <h5>Hunter Account</h5>
                    <p>{currentStudent.hunter_access}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
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
