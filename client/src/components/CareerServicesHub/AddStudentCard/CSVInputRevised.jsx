import React, { useState, useContext, useRef } from "react";
import ImportResults from "../Excel Import Button/ImportResults";
import { ManagersContext } from "../../../context/managersContext";
import "../Excel Import Button/CSVInputModal.css"

import exportFromJSON from 'export-from-json';

function CSVInputRevised({setAddStudent , handleAddStudentModalToggle, handleUpdateNewStudent}) {
  // Have a temp object hold a single new student from the bulk being imported
  const initialStudents = [
    {
      First: "Bob",
    },
  ];

  // Set all local states needed for this component
  const [file, setFile] = useState();
  const [newStudents, setNewStudents] = useState(initialStudents);
  const [resultsToggle, setResultsToggle] = useState(false);
  const [importManager, setImportManager] = useState(1);
  const [importMCSP, setImportMCSP] = useState(1);

  // We have html inputs in this components, so useRef will allow as to reference and extract their value
  const managerInputRef = useRef();
  const mcspInputRef = useRef();

  // FileReader() allows you to take in data from a file (in this case .csv) and break it into a JavaScript datatype
  const fileReader = new FileReader();

  // Use managers context to get the latest list of Career Service Managers
  const managersContext = useContext(ManagersContext);
  const managers = managersContext.managersData;

  // When a new .csv is uploaded to the import modal, update local state with latest file
  function handleFileUpload(e) {
    setFile(e.target.files[0]);
  }

  // Once Submit button is pressed, read in the MCSP/Service Manager input fields and the .csv file that was attached 
  function handleSubmit(e) {
    e.preventDefault();

    // Grab current values from input fields to get MCSP and Career Service Manager and set the state
    const newImportManager = managerInputRef.current.value;
    const newImportMCSP = Number(mcspInputRef.current.value);
    setImportManager(newImportManager);
    setImportMCSP(newImportMCSP);

    // If file was attached, call csvFileToArray to convert data into Array
    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };
      fileReader.readAsText(file);
    }
  }

  // Convert .csv data into Array of students
  const csvFileToArray = (string) => {
    var array = string.toString().split(",");  // Since its a csv file, seperate the data using commas
    var data = [];

    // For each row in the input csv file
    for (const element of array) {
      let row = element.toString().split("\n");  // Split apart into an element in the array using the new-line character
      for (const element2 of row) // For each cell in that row
        data.push(element2);   // Push into a string into that array
    }

    // Establish heading array using the first few elements in the data array (HARDCODED since we are assuming the user will follow the provided csv template)
    var heading = [data[0], data[1], data[2].replaceAll("\r", "")]; // Extract the column headers (assuming this is a excel file with 3 headers)
    var ans_array = [];

    // Step through the rest of the array, that should be data and no more headers
    for (var i = heading.length; i < data.length; i += heading.length) {
      var obj = {};
      for (var j = 0; j < heading.length; j++) {
        if (!data[i + j]) {
          data[i + j] = "N/A"; // If cell was empty in original csv submission, file it with N/A
        }
        obj[heading[j].replaceAll(" ", "_")] = data[i + j].replaceAll("\r", ""); // Any cells with two words, replace the space with underscore
      }
      ans_array.push(obj);
    }
    setNewStudents(ans_array);  // Once complete, set local state to the resultant array
    const newResultsToggle = !resultsToggle; // Invert Results Flag 
    setResultsToggle(newResultsToggle);  // Set new results flag to signal the import is finished
  };

  // Once csv template button is clicked, generate and download an example csv the user can use to import more students
  function excelImportTemplate(){
    const fields = ['student_first', 'student_last', 'sec_clearance'];     // Set the headers of the template
    const data = [{student_first :'David', student_last : 'Garcia', sec_clearance : 'TOP SECRET//SCI'}]; // Set a single example data row
    const fileName = `ImportStudentTemplate`;  // Give it a filename
    const exportType = exportFromJSON.types.csv;  // Give it a file type of csv

    exportFromJSON({data, fileName, fields: fields, exportType});   // Call the method that will generate and download csv in clients browser
  }

  return (
    <div className="import-modal-container">
      <div className="import-modal-description-container">
        <span className="import-modal-description-text">
          {" "}
          Please choose a MCSP/Career Service Manager and upload a .csv file
          with information about the students
        </span>
        <a className="import-modal-description-text header-buttons" onClick={excelImportTemplate}>
          {" "}
          Click for csv template{" "}
        </a>
      </div>
      <div className="import-button-container">
        <div className="import-button-container-inputs">
          <div className="import-button-input-MCSP">
            <span>
              {" "}
              MCSP :{" "}
              <input
                type="number"
                className="import-input-MCSP"
                ref={mcspInputRef}
              />{" "}
            </span>
          </div>
          <select className="import-input" ref={managerInputRef}>
            <option>Select a Career Service Manager</option>
            {managers.map((manager) => {
              return (
                <option value={manager.tscm_id} key={manager.tscm_id}>
                  {manager.tscm_first}, {manager.tscm_last}{" "}
                </option>
              );
            })}
          </select>
          <div className="import-file-input-container">
            <input className='header-buttons' type="file" accept=".csv" onChange={handleFileUpload} />
          </div>
        </div>
        <input
          className="header-buttons"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        />
      </div>
      <div className={resultsToggle ? "container-on" : "container-off"}>
        <ImportResults
          setAddStudent={setAddStudent}
          newStudents={newStudents}
          importManager={importManager}
          importMCSP={importMCSP}
          handleAddStudentModalToggle={handleAddStudentModalToggle}
          handleUpdateNewStudent={handleUpdateNewStudent}
        />
      </div>
    </div>
  );
}

export default CSVInputRevised;