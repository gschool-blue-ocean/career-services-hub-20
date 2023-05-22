import React, {useRef, useContext} from 'react';
import { FieldsContext } from "../../../context/fieldsContext";
import './StudentModal.css';
import { ManagersContext } from '../../../context/managersContext';
export default function StudentModal({handleUpdateExistingStudent ,handleModalToggle, student}) {

const url = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://career-services-server.onrender.com';

const fieldsContext = useContext(FieldsContext);
const fields = fieldsContext.fieldsData;

const managersContext = useContext(ManagersContext);
const managers = managersContext.managersData;

const milestoneProgressOptions = fields.milestoneProgress;
const careerStatusOptions = fields.career_status;
const courseStatusOptions = fields.course_status;
const clearanceStatusOptions = fields.sec_clearance;
const degreeStatusOptions = fields.college_degree;

const coverLetterInputRef = useRef();
const resumeInputRef = useRef();
const linkedInInputRef = useRef();
const narrativeInputRef = useRef();
const huntrInputRef = useRef();
const careerInputRef = useRef();
const courseInputRef = useRef();
const clearanceInputRef = useRef();
const degreeInputRef = useRef();

function handleUpdateStudent(e) {
    console.log(e.target.value);
    console.log(student.student_id);
    let newUpdatedStudent = {};
    let existingStudentObj = {};
    let milestones=[];
    existingStudentObj.milestones = [];

    student.milestones.forEach(milestone => {
        let newMilestone = {};
        newMilestone.mile_name = milestone.mile_name;
        newMilestone.mile_id = milestone.mile_id;
        newMilestone.student_id = milestone.student_id;
        milestones.push(newMilestone);
    });

    

    milestones[0].progress_stat = coverLetterInputRef.current.value;
    milestones[1].progress_stat = resumeInputRef.current.value;
    milestones[2].progress_stat = linkedInInputRef.current.value;
    milestones[3].progress_stat = narrativeInputRef.current.value;
    milestones[4].progress_stat = huntrInputRef.current.value;
    newUpdatedStudent.career_status = careerInputRef.current.value;
    newUpdatedStudent.course_status = courseInputRef.current.value;
    newUpdatedStudent.sec_clearance = clearanceInputRef.current.value;
    newUpdatedStudent.college_degree = degreeInputRef.current.value;
    newUpdatedStudent.tscm_id = student.tscm_id;
    newUpdatedStudent.student_first = student.student_first;
    newUpdatedStudent.student_last = student.student_last;
    newUpdatedStudent.cohort = student.cohort;
    newUpdatedStudent.student_id = student.student_id;
    existingStudentObj = newUpdatedStudent;
    existingStudentObj.milestones = milestones;
    existingStudentObj.tscm_first = managers[newUpdatedStudent.tscm_id-1].tscm_first;
    existingStudentObj.tscm_last = managers[newUpdatedStudent.tscm_id-1].tscm_last;
    handleUpdateExistingStudent(existingStudentObj);

    fetch(`${url}/students/${newUpdatedStudent.student_id}`,
                {
                    method:"PATCH", 
                    body: JSON.stringify(newUpdatedStudent),
                    headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    }
                }
                )
                .then(response => response.json())
                .then(data => {
                    //Adding Milestones to Student
                    milestones.forEach((milestone) => {
                        fetch(`${url}/students/${data.student_id}/milestones/${milestone.mile_id}`, 
                        {
                            method:"PATCH", 
                            body: JSON.stringify(milestone),
                            headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                            }
                        }
                        )
                        .then(response => response.json())
                        .then(data => {
                            // Update Context with response
                        })
                        .catch(function(error) {
                        console.log(error);
                        }); 
                    })
                })
                .catch(function(error) {
                console.log(error);
                });    

                handleModalToggle();

}


    function resetStudentModalForms() {    
        coverLetterInputRef.current.value = student.milestones[0].progress_stat;
        resumeInputRef.current.value = student.milestones[1].progress_stat;
        linkedInInputRef.current.value = student.milestones[2].progress_stat;
        narrativeInputRef.current.value = student.milestones[3].progress_stat;
        huntrInputRef.current.value = student.milestones[4].progress_stat;
        careerInputRef.current.value = student.career_status;
        courseInputRef.current.value = student.course_status;
        clearanceInputRef.current.value = student.sec_clearance;
    }

    return (
    <>
    <div className='modal-overlay-container'>
    <div onClick={()=>{handleModalToggle(), resetStudentModalForms()}} className='student-backdrop'>
    </div>

    <div className='student-tracker-modal'>
        <div className='student-tracker-modal-name'>
        {student.student_first} {student.student_last}
        </div>
        <div className='student-tracker-modal-mcsp'>
            {student.cohort}
        </div>
        
        <br/>
        <div className='student-tracker-modal-milestones-div'>Milestones</div>
        <div className='student-tracker-modal-cover-status'>
            <label htmlFor='cover-status'>Cover Letter: </label>
            <select name='Cover Letter Status' ref={coverLetterInputRef}>
            <option value={student.milestones[0].progress_stat}>{student.milestones[0].progress_stat}</option>
            {milestoneProgressOptions.map((option) =>{
                if (option != student.milestones[0].progress_stat){
                    return (
                        <option key={option} value={option}>{option}</option>
                    )
                }   
            })}
            </select>

        </div>
        <div className='student-tracker-modal-resume-status'>
            <label htmlFor='resume-status'>Resume: </label>
            <select name='Resume Status' ref={resumeInputRef}>
            <option value={student.milestones[1].progress_stat}>{student.milestones[1].progress_stat}</option>
            {milestoneProgressOptions.map((option) =>{
                if (option != student.milestones[1].progress_stat){
                    return (
                        <option key={option} value={option}>{option}</option>
                    )
                }   
            })}
            </select>
        </div>
        <div className='student-tracker-modal-linked-status'>
            <label htmlFor='linked-status'>Linked In Profile: </label>
            <select name='Linked In Status' ref={linkedInInputRef}>
            <option value={student.milestones[2].progress_stat}>{student.milestones[2].progress_stat}</option>
            {milestoneProgressOptions.map((option) =>{
                if (option != student.milestones[2].progress_stat){
                    return (
                        <option key={option} value={option}>{option}</option>
                    )
                }   
            })}
            </select>
        </div>
        <div className='student-tracker-modal-narrative-status'>
            <label htmlFor='narrative-status'>Personal Narrative: </label>
            <select name='Narrative Status' ref={narrativeInputRef}>
            <option value={student.milestones[3].progress_stat}>{student.milestones[3].progress_stat}</option>
            {milestoneProgressOptions.map((option) =>{
                if (option != student.milestones[3].progress_stat){
                    return (
                        <option key={option} value={option}>{option}</option>
                    )
                }   
            })}
            </select>
        </div>
        <div className='student-tracker-modal-huntr-status'>
            <label htmlFor='huntr-status'>Huntr Access: </label>
            <select name='Huntr Status' ref={huntrInputRef}>
            <option value={student.milestones[4].progress_stat}>{student.milestones[4].progress_stat}</option>
            {milestoneProgressOptions.map((option) =>{
                if (option != student.milestones[4].progress_stat){
                    return (
                        <option key={option} value={option}>{option}</option>
                    )
                }   
            })}
            </select>
        </div>
        
        <br/>
        <div className='student-tracker-modal-additional-information'>Additional Information</div>
        <div className='student-tracker-modal-career-status'>
            <label htmlFor='career-status'>Career Status: </label>
            <select name='Career Status' ref={careerInputRef}>
            <option value={student.career_status}>{student.career_status}</option>
            {careerStatusOptions.map((option) =>{
                if (option != student.career_status){
                    return (
                        <option key={option} value={option}>{option}</option>
                    )
                }   
            })}
            </select>
        </div>
        <div className='student-tracker-modal-course-status'>
            <label htmlFor='course-status'>Course Status: </label>
            <select name='Course Status' ref={courseInputRef}>
            <option value={student.course_status}>{student.course_status}</option>
            {courseStatusOptions.map((option) =>{
                if (option != student.course_status){
                    return (
                        <option key={option} value={option}>{option}</option>
                    )
                }   
            })}
            </select>
        </div>
        <div className='student-tracker-modal-clearance-status'>
            <label htmlFor='clearance-status'>Clearance Status: </label>
            <select name='Clearance Status' ref={clearanceInputRef}>
            <option value={student.sec_clearance}>{student.sec_clearance}</option>
            {clearanceStatusOptions.map((option) =>{
                if (option != student.sec_clearance){
                    return (
                        <option key={option} value={option}>{option}</option>
                    )
                }   
            })}
            </select>
        </div>
        <div className='student-tracker-modal-degree-status'>
            <label htmlFor='degree-status'>Degree Status: </label>
            <select name='Degree Status' ref={degreeInputRef}>
            <option value={student.college_degree}>{student.college_degree}</option>
            {degreeStatusOptions.map((option) =>{
                if (option != student.college_degree){
                    return (
                        <option key={option} value={option}>{option}</option>
                    )
                }   
            })}
            </select>
        </div>
        <br/>
        <div className='update-student-container'>
        <button className='header-buttons' onClick={handleUpdateStudent}>Update Student</button>
        </div>
    </div>
    </div>
    </>
  )
}





