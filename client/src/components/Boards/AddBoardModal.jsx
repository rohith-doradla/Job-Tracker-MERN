import React from 'react';

import { useState } from 'react';

import BoardForm from '../Boards/BoardForm';

function AddBoardModal({ setAddBoard, fetchBoards }) {
  return (
    <div>
      <div
        onClick={() => {
          setAddBoard(false);
        }}
        className="fixed bg-black/40 backdrop-blur-sm inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
      >
        <div className="fixed inset-0" />
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white rounded 2xl shadow-2xl w-full max-w-3xl my-8 animate-fade-in"
        >
          <div className="flex items-center justify-between p-6 pb-0">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                New Board
              </h2>
            </div>
            {/* <button
                onClick={() => {
                  setAddBoard(false);
                }}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
              >
                <FontAwesomeIcon icon={faX} />
              </button> */}
          </div>

          <div className="p-6">
            <BoardForm
              onSuccess={() => {
                setAddBoard(false);
                fetchBoards();
              }}
              onCancel={() => {
                setAddBoard(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBoardModal;
