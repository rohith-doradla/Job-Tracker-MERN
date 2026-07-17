import React from 'react';

import { useState, useRef, useCallback, useEffect } from 'react';

import api from '../api/axios';

import AddJobModal from './Jobs/AddJobModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faCheck,
  faTrash,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import JobCard from './Jobs/JobCard';

function SectionCard({ section, fetchSections }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newSection, setNewSection] = useState(section.sectionName);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [jobs, setJobs] = useState([]);

  const addJobDialog = useRef();

  async function handleEditSection() {
    if (!isEditing) {
      return setIsEditing(true);
    }

    try {
      await api.put(`/sections/${section._id}`, {
        sectionName: newSection,
      });

      await fetchSections();
    } catch (err) {
      setError(error.response?.data?.error || error.message);
    } finally {
      setIsEditing(false);
    }
  }

  function handleEditChange(e) {
    setNewSection(e.target.value);
  }

  async function hanldeDelete() {
    if (!confirm('Are you sure you want to delete this Section?')) return;

    try {
      const url = `/sections/${section.id}`;

      const res = await api.delete(url);
      await fetchSections();
    } catch (error) {
      setError(error.response?.data?.error || e.message);
    }
  }

  function handleAddJob() {
    addJobDialog.current.showModal();
  }

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const url = `/jobs/list/${section.id}`;

      const res = await api.get(url);

      setJobs(res.data.data);
    } catch (error) {
      console.log('Failed to fetch boards');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      <AddJobModal
        ref={addJobDialog}
        sectionId={section.id}
        fetchJobs={fetchJobs}
      />
      <div className="group relative card card-hover  w-72  h-screen flex flex-col">
        <div
          className="flex
        flex-row
        sm:flex-row
        justify-around
        items-start
        sm:items-center
        gap-4 
        mt-4"
        >
          <div>
            {isEditing ? (
              <input value={newSection} onChange={handleEditChange} />
            ) : (
              <h3 className="text-slate-900">{newSection}</h3>
            )}
          </div>

          <div
            className="flex
        flex-row
        sm:flex-row
        justify-between
        items-start
        sm:items-center
        gap-4 
        "
          >
            <button onClick={handleEditSection}>
              {isEditing ? (
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-emerald-600 rounded-xl transition-all hover:scale-105 pointer-events-auto"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faPen}
                  className="hover:text-indigo-600
                rounded-xl
           
                transition-all
                hover:scale-105
                pointer-events-auto"
                />
              )}
            </button>

            <button onClick={hanldeDelete}>
              <FontAwesomeIcon
                icon={faTrash}
                className="hover:text-rose-600
                rounded-xl
          
                transition-all
                hover:scale-105
                pointer-events-auto"
              />
            </button>
          </div>
        </div>
        <div
          onClick={handleAddJob}
          className="bg-white py-2 px-4 border border-white-400 rounded  flex items-center gap-2 w-full sm:w-auto justify-center mt-4 "
        >
          <button>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto  min-h-0">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} fetchJobs={fetchJobs} />
          ))}
        </div>
      </div>
    </>
  );
}

export default SectionCard;
