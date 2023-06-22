import React from "react";
export default function StudentChangeCard({ currentStudent }) {
  return (
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
        <h3>My wefewfwef</h3>
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
      {/* <div className="studentCard">wm
            <div className='card-item'>{currentStudent.student_first} {currentStudent.student_last} </div>
            <div className='card-item'>• Education Level: {currentStudent.college_degree} <p>• Personal Narrative: {currentStudent.personal_narrative} </p></div>
            <div className='card-item'>• Cohort: {currentStudent.cohort}<p>• CSM: {currentStudent.tscm_first} {currentStudent.tscm_last}</p></div>
            <div className='card-item'>• LinkedIn: {currentStudent.linkedin}<p>• Hunter Account: {currentStudent.hunter_access}</p></div>
            <div className='card-item'>• Course Standing: {currentStudent.course_status} <p>• Security Clearance: {currentStudent.sec_clearance}</p></div>
            <div className='card-item'>• Cover Letter: {currentStudent.cover_letter} <p>• Resume: {currentStudent.resume}</p></div>
            <div className='contact'>
            <div>Contact your TSCM: {currentStudent.tscm_email}</div>
          </div> 
        </div> */}
    </div>
  );
}
