import React from 'react';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../api/axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

function BoardForm({ initialData, onSuccess, onCancel }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const isEdit = !!initialData;

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const url = isEdit ? `/boards/${initialData.id}` : '/boards/save';

      const method = isEdit ? 'put' : 'post';
      await api[method](url, formData);
      onSuccess ? onSuccess() : navigate('/boards/list');
    } catch (error) {
      setError(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="space-y-6 max-w-3xl animate-fade-in"
    >
      <div>
        <input
          type="text"
          placeholder=" Board Name (eg., Job Search 2026)"
          required
          name="boardName"
          defaultValue={initialData?.boardName}
        />
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex items-center justify-center"
        >
          {loading && <FontAwesomeIcon icon={faCircleNotch} />}
          {isEdit ? 'Update Board' : 'Create Board'}
        </button>
      </div>
    </form>
  );
}

export default BoardForm;
