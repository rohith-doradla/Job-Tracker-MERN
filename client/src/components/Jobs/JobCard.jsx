import React from 'react';
import { useRef } from 'react';

import api from '../../api/axios';

import EditJobModal from '../Jobs/EditJobModal.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function JobCard({ job, fetchJobs }) {
  const editJobDialog = useRef();

  async function handleEditJob() {
    editJobDialog.current.showModal();
  }

  async function handleDeleteJob(e) {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this Job?')) return;

    try {
      const url = `/jobs/${job.id}`;
      const res = await api.delete(url);
      await fetchJobs();
    } catch (error) {
      console.log(error.response?.data?.error || error.message);
    }
  }

  return (
    <>
      <EditJobModal ref={editJobDialog} job={job} />
      <div
        onClick={handleEditJob}
        className="group relative card card-hover overflow-hidden  mt-4 border border-l-4 border-indigo-600"
      >
        <div
          onClick={handleDeleteJob}
          className="absolute inset-0 from-indigo-700/20 group-hover:opacity-100 transition-opacity flex items-end justify-end pb-6 gap-3 pointer-events-none"
        >
          <button className="p-2.5 backdrop-blur-sm text-scale-700 hover:text-rose-600 rounded-xl  transition-all hover:scale-105 disabled:opacity-50 mr-2 pointer-events-auto">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
        <div className="p-5">
          <h2 className="text-slate-900">{job.jobName}</h2>
          <p className="text-xs text-slate-500">{job.companyName}</p>
        </div>
        <p className="text-xs text-slate-500 flex justify-end mr-2">
          {job.createdAt
            ? new Date(job.createdAt).toISOString().split('T')[0]
            : ''}
        </p>
      </div>
    </>
  );
}

export default JobCard;
