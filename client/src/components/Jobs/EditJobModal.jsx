import React, { useState } from 'react';
import api from '../../api/axios';

function EditJobModal({ ref, job }) {
  const [editJob, setEditJob] = useState(job);

  const [loading, setLoading] = useState(false);

  async function handleUpdateJob(e) {
    setLoading(true);
    const updatedFormData = new FormData(e.currentTarget);

    try {
      const url = `/jobs/${job.id}`;
      const res = await api.put(url, updatedFormData);
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <dialog ref={ref}>
      <div className="animate-fade-in">
        {/* {editJob && ( */}
        <div className="fixed bg-black/40 backdrop-blur-sm inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="relative bg-white rounded 2xl shadow-2xl w-full max-w-3xl my-8 animate-fade-in">
            <div className="flex items-center justify-between p-6 pb-0">
              <div className="p-6">
                <form
                  action=""
                  onClick={handleUpdateJob}
                  className="space-y-6 max-w-3xl animate-fade-in"
                >
                  <div className="flex flex-row ssm:flex-row justify-between items-start sm:items-center gap-4 ">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">
                        {editJob.jobName}
                      </h2>
                      <p>{editJob.companyName}</p>
                    </div>
                    <div className="flex flex-row sm:flex-row justify-between items-start sm:items-center gap-4 ">
                      <button
                        type="submit"
                        className="btn-primary flex items-center justify-center"
                      >
                        Update Job
                      </button>
                      <button
                        type="button"
                        onClick={() => ref.current.close()}
                        // className="btn-primary flex items-center justify-center"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>

                  {/* <div>
                    <button>Edit</button>
                    <button>Contacts</button>
                    <button>Document</button>
                  </div> */}
                  <div>
                    <div className="flex flex-row sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <label htmlFor="companyName">Company</label>
                        <input
                          type="text"
                          placeholder="Company"
                          required
                          name="companyName"
                          defaultValue={editJob.companyName}
                        />
                      </div>
                      <div>
                        <label htmlFor="jobName">Job Name</label>
                        <input
                          type="text"
                          placeholder="Job Name"
                          required
                          name="jobName"
                          defaultValue={editJob.jobName}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="location">Location</label>
                      <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        defaultValue={editJob.location}
                      />
                    </div>
                    <div>
                      <label htmlFor="jobLink">Job Link</label>
                      <input
                        type="text"
                        placeholder="Job Link"
                        name="jobLink"
                        defaultValue={editJob.jobLink}
                      />
                    </div>
                    <div>
                      <label htmlFor="description">Description</label>
                      <textarea
                        rows="5"
                        cols="33"
                        name="description"
                        defaultValue={editJob.description}
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* )} */}
      </div>
    </dialog>
  );
}

export default EditJobModal;
