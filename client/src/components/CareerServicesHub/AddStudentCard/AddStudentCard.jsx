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
      </Add_Student_Modal>
    </div>
  );
}

export default AddStudent;