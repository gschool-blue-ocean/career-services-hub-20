import React, { useContext, useEffect, useState } from 'react';
import { FieldsContext } from "../../../context/fieldsContext";

export default function StudentChangeCard({currentStudent, url, setUpdate, socketRef})
{
  const fieldsContext = useContext(FieldsContext);
  const fields = fieldsContext.fieldsData;
  
  // Options for different fields obtained from the fields data
  const milestoneProgressOptions= fields.milestoneProgress;
  const careerStatusOptions=fields.career_status;
  const courseStatusOptions= fields.course_status;
  const clearanceStatusOptions = fields.sec_clearance;
  const degreeStatusOptions = fields.college_degree;
  

  const [first,setFirst] = useState(currentStudent.student_first);
  const [last,setLast] = useState(currentStudent.student_last);
  const [degree,setDegree] = useState(currentStudent.college_degree)
  const [clearance,setClearance] = useState(currentStudent.sec_clearance);
  const [status, setStatus] = useState(currentStudent.course_status);
  const [narrative,setNarrative] = useState(currentStudent.personal_narrative);
  const [coverLetter,setCoverLetter] = useState(currentStudent.cover_letter);
  const [resume,setResume] = useState(currentStudent.resume);
  const [linkedin,setLinkedin] = useState(currentStudent.linkedin);
  const [hunterAccess,setHunterAccess] = useState(currentStudent.hunter_access);
  const [careerStatus,setCareerStatus] = useState(currentStudent.careerStatus)

  const handleSubmitResources= ()=>{
    const fetchData = async()=>{
      const response = await fetch(`${url}/students/${currentStudent.student_id}`, {
        method: "PATCH",
        body: JSON.stringify({
          student_id : currentStudent.student_id,
          student_first : first,
          student_last : last,
          cohort : currentStudent.cohort,
          sec_clearance : clearance,
          career_status : careerStatus,
          course_status : status,
          college_degree : degree,
          cover_letter : coverLetter,
          resume : resume,
          linkedin : linkedin,
          personal_narrative : narrative,
          hunter_access : hunterAccess,
          tscm_id : currentStudent.tscm_id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      
      })
      const result = await response.json();
      setUpdate((prev)=>!prev);
      return result;
    }
    fetchData().then((result)=>{
      if (socketRef.current) {
        console.log(result);
      socketRef.current.emit('data',{studentId: currentStudent.student_id,tscm_id : result.tscm_id})
  
      }
    })
  }
    return (
        <form className='student-profile-data' >
          <div className='profile-background-img'>
            <img src='https://th.bing.com/th/id/R.b173d064715990e210a19f080fde122a?rik=wyy2%2bsDxPMBAGA&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f3%2fe%2fc%2f563599.jpg&ehk=IIlQVDqUjTmsDGCECQSTU1ogn28Flsaf2OWi74E3Ubk%3d&risl=&pid=ImgRaw&r=0'></img>
          </div>
          <div className='profile-info'>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
          <div className='profile-info-data'>
            <h1 style={{margin:0}}>{first} {last}</h1>
            <p style={{color:'var(--student-text-secondary-color)'}}>No Comments here</p>
          </div>
          </div>
          <div style={{display:'flex', justifyContent:'end'}}>
            <div className="student-submit-bt" onClick={handleSubmitResources}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">           
              <path style={{ fill: '#fee4cd' }} d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
            </svg>
            <h5 style={{margin:0}}>Submit</h5>
          </div>
          </div>
          
            
          <div className='student-card-item'>
            <h3>My Information</h3>
            <div>
              <div>
                <h5>First Name</h5>
                <input type='text' value={first} onChange={(e)=>setFirst(e.target.value)}></input>
              </div>
              <div>
                <h5>Last Name</h5>
                <input type='text' value={last} onChange={(e)=>setLast(e.target.value)}></input>
              </div>
              <div>
                <h5>Cohort</h5>
                <p>{currentStudent.cohort}</p>
              </div>
              <div>
                <h5>Security Clearance</h5>
                <select defaultValue={clearance} onChange={(e)=>setClearance(e.target.value)}>
                  {clearanceStatusOptions.map((element,index)=>( 
                    <option key={index} value={element}>{element}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className='student-card-item'>
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

          <div className='student-card-item'>
            <h3>Additional Information</h3>
            <div>
              <div>
                <h5>Education Level</h5>
                <select defaultValue={degree} onChange={(e)=>setDegree(e.target.value)}>
                  {degreeStatusOptions.map((element,index)=>( 
                    <option key={index} value={element}>{element}</option>
                  ))}
                </select>
              </div>
              <div>
                <h5>Course Standing</h5>
                <select defaultValue={status} onChange={(e)=>setStatus(e.target.value)}>
                  {courseStatusOptions.map((element,index)=>( 
                    <option key={index} value={element}>{element}</option>
                  ))}
                </select>
              </div>
              <div>
                <h5>Personal Narrative</h5>
                <select defaultValue={narrative} onChange={(e)=>setNarrative(e.target.value)}>
                  {milestoneProgressOptions.map((element,index)=>( 
                    <option key={index} value={element}>{element}</option>
                  ))}
                </select>
              </div>
              <div>
                <h5>Career Status</h5>
                <select defaultValue={careerStatus} onChange={(e)=>setCareerStatus(e.target.value)}>
                  {careerStatusOptions.map((element,index)=>( 
                    <option key={index} value={element}>{element}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className='student-card-item'>
            <div style={{display:'flex'}}>
              <h3>My Resources</h3>
              <input type='submit' value='Submit'/>
            </div>
            
            <div>
              <div>
                <h5>Cover Letter</h5>
                <select defaultValue={coverLetter} onChange={(e)=>setCoverLetter(e.target.value)}>
                  {milestoneProgressOptions.map((element,index)=>( 
                    <option key={index} value={element}>{element}</option>
                  ))}
                </select>
              </div>
              <div>
                <h5>Resume</h5>
                <select defaultValue={resume} onChange={(e)=>setResume(e.target.value)}>
                  {milestoneProgressOptions.map((element,index)=>( 
                    <option key={index} value={element}>{element}</option>
                  ))}
                </select>
              </div>
              <div>
                <h5>LinkedIn Account</h5>
                <select defaultValue={linkedin} onChange={(e)=>setLinkedin(e.target.value)}>
                  {milestoneProgressOptions.map((element,index)=>( 
                    <option key={index} value={element}>{element}</option>
                  ))}
                </select>
              </div>
              <div>
                <h5>Hunter Account</h5>
                <select defaultValue={hunterAccess} onChange={(e)=>setHunterAccess(e.target.value)}>
                  {milestoneProgressOptions.map((element,index)=>( 
                    <option key={index} value={element}>{element}</option>
                  ))}
                </select>
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
        </form>
    );
}