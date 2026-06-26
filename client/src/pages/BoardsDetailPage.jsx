import React from 'react';

import { useState, useCallback, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import SectionCard from '../components/SectionCard';

import { dummySectionData } from '../data';

import { v4 as uuidv4 } from 'uuid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function BoardsDetailPage() {
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState([]);

  const { id } = useParams();

  const fetchSections = useCallback(() => {
    const currentBoardSections = dummySectionData.filter(
      (d) => d.boardId === id,
    );

    (setLoading(true), setSections(currentBoardSections));

    setTimeout(() => {
      setLoading(false);
    }, 1000);

  //   try {
  //     const url = '/sections/${section.id}';

  //     const res =await api.get(url)
  //   } catch (error) {}
  }, []);

  useEffect(() => {
    fetchSections();
  }, []);

  function handleAddSection() {
    const newSection = {
      boardId: id,
      _id: uuidv4(),
      sectionName: 'Section Name',
    };

    const updatedSection = [...sections, newSection];

    setSections(updatedSection);
  }

  return (
    <div>
      <div>
        <h2>Board</h2>
      </div>

      {loading ? (
        <div>
          {/* Loading */}
          <div />
        </div>
      ) : (
        <div>
          <div className="flex gap-3">
            {sections.map((s) => (
              <SectionCard key={s._id} id={s._id} section={s} />
            ))}
          </div>

          <button onClick={handleAddSection}>
            <FontAwesomeIcon icon={faPlus} />
            Add Section
          </button>
        </div>
      )}
    </div>
  );
}

export default BoardsDetailPage;
