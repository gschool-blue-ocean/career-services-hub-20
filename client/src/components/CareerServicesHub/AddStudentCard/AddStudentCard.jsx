import React, { useState } from "react";
import "./AddStudentCard.css";
import Add_Student_Modal from "./AddStudentModal";

// Component for adding a new student
function AddStudent({ handleUpdateNewStudent }) {
  const [addStudent, setAddStudent] = useState(false);

  // Function to toggle the add student modal
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
        setAddStudent={setAddStudent}
        handleUpdateNewStudent={handleUpdateNewStudent}
      ></Add_Student_Modal>
    </div>
  );
}

export default AddStudent;