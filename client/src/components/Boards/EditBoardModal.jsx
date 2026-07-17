import React from 'react';

import { useState } from 'react';

import BoardForm from '../Boards/BoardForm.jsx';

function EditBoardModal({ board, setEditBoard, fetchBoards }) {


  return (
    <div>
      <div
        onClick={() => {
          setEditBoard(null);
        }}
        className="fixed bg-black/40 backdrop-blur-sm inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white rounded 2xl shadow-2xl w-full max-w-3xl my-8 animate-fade-in"
        >
          <div className="flex items-center justify-between p-6 pb-0">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Edit Board
              </h2>
            </div>
            {/* <button
                onClick={() => {
                  setEditBoard(null);
                }}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
              >
                <FontAwesomeIcon icon={faX} />
              </button> */}
          </div>

          <div className="p-6">
            <BoardForm
              initialData={board}
              onSuccess={() => {
                setEditBoard(null);
                fetchBoards();
              }}
              onCancel={() => {
                setEditBoard(null);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBoardModal;
