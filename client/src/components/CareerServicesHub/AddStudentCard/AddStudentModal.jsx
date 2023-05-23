import React, { useState } from "react";
import ReactDOM from "react-dom";
import CSVInputRevised from "./CSVInputRevised";
import AddStudentRevised from "./AddStudentRevised";
import "./AddStudentCard.css";

function Add_Student_Modal({ addStudent, handleAddStudentModalToggle, setAddStudent, handleUpdateNewStudent }) {
  // State variable to switch between the bulk import and single student modes
  const [btnSwitch, setBtnSwitch] = useState(true);

  // If addStudent is false, the modal is not visible, so return null
  if (!addStudent) return null;
  // Create a portal to render the modal outside of the component's parent hierarchy
  return ReactDOM.createPortal(
    <>
      <div className="modal-overlay-container">
        <div className="filt_overlay" onClick={handleAddStudentModalToggle} />
        <div className="add_modal">
          <div className="add-modal-buttons-container">
            <div className="add-modal-tab-button-containers">
              <button
                className={
                  btnSwitch ? "header-buttons-active" : "header-buttons"
                }
                onClick={() => setBtnSwitch(true)}
              >
                Bulk Import
              </button>
              <button
                className={
                  btnSwitch ? "header-buttons" : "header-buttons-active"
                }
                onClick={() => setBtnSwitch(false)}
              >
                Single Student
              </button>
            </div>
            <button
              className="header-buttons"
              onClick={handleAddStudentModalToggle}
            >
              X
            </button>
          </div>
          {btnSwitch ? (
            <CSVInputRevised
              setAddStudent={setAddStudent}
              handleAddStudentModalToggle={handleAddStudentModalToggle}
              handleUpdateNewStudent={handleUpdateNewStudent}
            />
          ) : (
            <AddStudentRevised
              setAddStudent={setAddStudent}
              handleAddStudentModalToggle={handleAddStudentModalToggle}
              handleUpdateNewStudent={handleUpdateNewStudent}
            />
          )}
        </div>
      </div>
    </>,
    // Mount the modal under the "portal" element in the DOM
    document.getElementById("portal")
  );
}

export default Add_Student_Modal;
