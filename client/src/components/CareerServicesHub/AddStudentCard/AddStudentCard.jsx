import React, { useState } from "react";
import "./AddStudentCard.css";
import Add_Student_Modal from "./AddStudentModal";


function AddStudent({ handleUpdateNewStudent }) {
  const [addStudent, setAddStudent] = useState(false);
  

  function handleAddStudentModalToggle() {
    setAddStudent((prevState) => !prevState);
  }

  return (
    <div className="btnWrapper" id="add-card">
      <button onClick={handleAddStudentModalToggle} id="add-card-name">
        &#x271A;
      </button>
      <Add_Student_Modal
        addStudent={addStudent}
        handleAddStudentModalToggle={handleAddStudentModalToggle}
      >
        <button onClick={() => setBtnSwitch(true)}>Bulk Import</button>
        <button onClick={() => setBtnSwitch(false)}>Single Student</button>
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
      </Add_Student_Modal>
    </div>
  );
}

export default AddStudent;