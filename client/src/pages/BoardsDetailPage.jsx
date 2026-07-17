import React from 'react';

import { useState, useCallback, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import SectionCard from '../components/SectionCard';

// import { dummySectionData } from '../data';

import api from '../api/axios';

import { v4 as uuidv4 } from 'uuid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function BoardsDetailPage() {
  const [board, setBoard] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState([]);
  const [error, setError] = useState('');

  const { id } = useParams();

  const fetchBoard = useCallback(async () => {
    try {
      const url = `/boards/${id}`;
      const res = await api.get(url);
      setBoard(res.data.data);
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  const fetchSections = useCallback(async () => {
    // const currentBoardSections = dummySectionData.filter(
    //   (d) => d.boardId === id,
    // );

    // (setLoading(true), setSections(currentBoardSections));

    // setTimeout(() => {
    //   setLoading(false);
    // }, 1000);

    try {
      const url = `/sections/list/${id}`;

      const res = await api.get(url);

      setSections(res.data.data);
    } catch (e) {
      console.log('Failed to fetch Sections');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBoard();
    fetchSections();
  }, [fetchBoard, fetchSections]);

  async function handleAddSection() {
    // const newSection = {
    //   boardId: id,
    //   _id: uuidv4(),
    //   sectionName: 'Section Name',
    // };

    // const updatedSection = [...sections, newSection];

    try {
      await api.post(`/sections/save/${id}`, { sectionName: 'Section Name' });
      fetchSections();
    } catch (error) {
      setError(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="page-title">
        <h2>{board?.boardName}</h2>
      </div>

      {loading ? (
        <div>
          {/* </Loading />*/}
          Loading...
          <div />
        </div>
      ) : (
        <div
          className="flex
        flex-row
        sm:flex-row
        justify-between
        items-start
        sm:items-center"
        >
          <div className="flex flex-row sm:flex-row justify-between items-start sm-items-center">
            {sections.map((s) => (
              <SectionCard
                key={s._id}
                id={s._id}
                section={s}
                fetchSections={fetchSections}
              />
            ))}
          </div>

          <div className="bg-white py-2 px-2 border border-white-400 rounded flex items-center gap-2 w-0 sm:w-auto ">
            <button onClick={handleAddSection}>
              <FontAwesomeIcon icon={faPlus} />
              Add Section
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BoardsDetailPage;
