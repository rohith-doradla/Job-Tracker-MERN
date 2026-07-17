import React from 'react';

import { useState } from 'react';

import api from '../../api/axios';

function AddJobModal({ sectionId, fetchJobs, ref }) {
  // const [addJob, setAddJob] = useState(false);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);

    // const data = {
    //   companyName: formData.get('companyName'),
    //   jobName: formData.get('jobName'),
    //   description: formData.get('description'),
    // };

    try {
      const url = `/jobs/save/${sectionId}`;

      await api.post(url, formData);

      await fetchJobs();

      // e.currentTarget.reset();

      form.reset();

      // if (ref && ref.current) {
      ref.current.close();
      // }
    } catch (error) {
      console.log(error.response?.data.error || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <dialog ref={ref}>
      <div className="animate-fade-in">
        {/* {addJob && ( */}
        <div className="fixed bg-black/40 backdrop-blur-sm inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0" />
          <div className="relative  bg-white rounded 2xl shadow-2xl w-lg max-w-3xl my-8 animate-fade-in">
            <div className="flex items-center justify-between p-6 pb-0">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Add Job
                </h2>
              </div>
            </div>
            <div className="p-6">
              <form
                action=""
                // method="dialog"
                onSubmit={handleSubmit}
                className="space-y-6 max-w-3xl animate-fade-in"
              >
                <div>
                  <label htmlFor="companyName">Company</label>
                  <input
                    type="text"
                    placeholder="Company"
                    required
                    name="companyName"
                  />
                </div>
                <div>
                  <label htmlFor="jobName">Job Title</label>
                  <input
                    type="text"
                    placeholder="Job Title"
                    required
                    name="jobName"
                  />
                </div>
                <div>
                  <label htmlFor="description">Description</label>
                  <textarea rows="5" cols="33" name="description"></textarea>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
                  <button type="button" onClick={() => ref.current.close()}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex items-center justify-center"
                  >
                    {loading ? 'Adding...' : 'Add Job'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* )} */}
      </div>
    </dialog>
  );
}

export default AddJobModal;
