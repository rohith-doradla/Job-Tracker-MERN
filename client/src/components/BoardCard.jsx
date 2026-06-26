import React, { useState } from 'react';

import { Link } from 'react-router-dom';

// import { dummyBoardsData } from '../data';

import api from '../api/axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

function BoardCard({ board, onEdit, onDelete }) {
  const [error, setError] = useState();

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this board?')) return;

    try {
      const url = `/boards/${board.id}`;

      const res = await api.delete(url);
      onDelete();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  }

  return (
    <div className="group relative card card-hover overflow-hidden">
      <div className="relative top-3 left-3 flex gap-2">
        {board.isDeleted && (
          <span className="bg-red-500/60 font-medium text-white px-2.5 py-1 text-xs rounded">
            Deleted
          </span>
        )}
      </div>

      {!board.isDeleted && (
        <div className="absolute inset-0 bg-linear-to-t from-indigo-700/20 group-hover:opacity-100 transition-opacity flex items-end justify-end pb-6 gap-3 pointer-events-none">
          <button
            onClick={() => onEdit(board)}
            className="p-2.5 bg-white/90 backdrop-blur-sm text-slate-700 hover:text-indigo-600 rounded-xl shadow-lg transition-all hover:scale-105 pointer-events-auto"
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button
            onClick={handleDelete}
            className="p-2.5 bg-white/90 backdrop-blur-sm text-slate-700 hover:text-rose-600 rounded-xl shadow-lg transition-all hover:scale-105 disabled:opacity-50 mr-2 pointer-events-auto"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )}

      <div className="p-5">
        <h3 className="text-slate-900">
          {board.isDeleted ? (
            board.boardName
          ) : (
            <Link to={`${board._id}`}>{board.boardName}</Link>
          )}
        </h3>
        <p className="text-xs text-slate-500">
          {board.createdAt
            ? new Date(board.createdAt).toISOString().split('T')[0]
            : ''}
        </p>
      </div>
    </div>
  );
}

export default BoardCard;
