import React, {useContext, useState} from 'react';
import { EventsContext } from '../../context/eventsContext';
import { StudentsContext } from '../../context/studentsContext';
import { ManagersContext } from '../../context/managersContext';
import StudentCardsList from './StudentCardsList';
import './CareerServicesHub.css'

import ExcelImportButton from './Excel Import Button/ExcelImportButton'
import Export from './Export';
import '../filter.css';
import Filter_Modal from './Filter_Modal';
import Filter from './Filter_Com';
import SearchBar from './SearchFunction/Search';

export default function CareerServicesHub() {

  const [currentCohort, setCurrentCohort] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentClearance, setCurrentClearance] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const [currentMilestonStatus, setCurrentMilestonStatus] = useState('');
  const [milestoneDocument, setMilestoneDocument] = useState('');

  const eventContext = useContext(EventsContext);
  const events = eventContext.eventsData;
  console.log(events);

  const studentContext = useContext(StudentsContext);
  const students = studentContext.studentsData;
  console.log(students);

  const managersContext = useContext(ManagersContext);
  const managers = managersContext.managersData;
  console.log(managers);

  const handleSearch = (searchTerm) => {
    console.log('Search Term:', searchTerm);
    // Perform your search logic here
  };

  return (
    <div>      
      <div className='filt-wrapper'>
        < ExcelImportButton />
        <Export 
          currentCohort={currentCohort}
          setCurrentCohort={setCurrentCohort}
        />
        <button 
          id='filterBtn'
          onClick={() => setFilterOpen(true)}
          className='header-buttons'
        >
          Filter
        </button>
        <Filter_Modal
          filterOpen={filterOpen}
          onClose={() => setFilterOpen(false)}
        >
          <Filter 
            currentCohort={currentCohort}
            setCurrentCohort={setCurrentCohort}
            currentClearance={currentClearance}
            setCurrentClearance={setCurrentClearance}
            currentStatus={currentStatus}
            setCurrentStatus={setCurrentStatus}
            currentMilestonStatus={currentMilestonStatus}
            setCurrentMilestonStatus={setCurrentMilestonStatus}
            milestoneDocument={milestoneDocument}
            setMilestoneDocument={setMilestoneDocument}
          />
        </Filter_Modal>
      </div>
      <SearchBar onSearch={handleSearch} />
      <StudentCardsList
        currentCohort={currentCohort}
        currentClearance={currentClearance}
        currentStatus={currentStatus}
        milestoneDocument={milestoneDocument}
        currentMilestonStatus={currentMilestonStatus}
      />
    </div>
  )
}