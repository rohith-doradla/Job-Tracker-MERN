import React from 'react';

import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faCheck } from '@fortawesome/free-solid-svg-icons';

function SectionCard({ section }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newSection, setNewSection] = useState(section.sectionName);

  function handleEditSection() {
    setIsEditing((prev) => !prev);
  }

  function handleEditChange(e) {
    setNewSection(e.target.value);
  }

  // function handleJob() {}

  return (
    <div className="group relative card card-hover overflow-hidden w-70 h-screen">
      <div>
        {isEditing ? (
          <input value={newSection} onChange={handleEditChange} />
        ) : (
          <h3 className="text-slate-900">{newSection}</h3>
        )}
      </div>

      <div>
        <button onClick={handleEditSection}>
          {isEditing ? (
            <FontAwesomeIcon icon={faCheck} />
          ) : (
            <FontAwesomeIcon icon={faPen} />
          )}
        </button>
      </div>
{/* 
      <button onClick={handleAddJob}>
        <FontAwesomeIcon icon={faPlus} />
      </button> */}
    </div>
  );
}

export default SectionCard;
