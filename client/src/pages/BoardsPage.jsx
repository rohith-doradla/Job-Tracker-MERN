import React from 'react';
import { useCallback, useEffect, useState } from 'react';

// import BoardForm from '../components/Boards/BoardForm.jsx';
import AddBoardModal from '../components/Boards/AddBoardModal.jsx';
import EditBoardModal from '../components/Boards/EditBoardModal.jsx';

import BoardCard from '../components/Boards/BoardCard.jsx';

// import { dummyBoardsData } from '../data';

import api from '../api/axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faPlus,
  faX,
} from '@fortawesome/free-solid-svg-icons';

function BoardsPage() {
  const [loading, setLoading] = useState(true);
  const [boards, setBoards] = useState([]);

  const [addBoard, setAddBoard] = useState(false);

  const [search, setSearch] = useState('');

  const [editBoard, setEditBoard] = useState(null);

  const fetchBoards = useCallback(async () => {
    //   (setLoading(true), setBoards(dummyBoardsData));
    //   setTimeout(() => {
    //     setLoading(false);
    //   }, 1000);

    try {
      const url = '/boards/list';

      const res = await api.get(url);

      setBoards(res.data.data);
    } catch (e) {
      console.log('Failed to fetch boards');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  const filtered = boards.filter((board) =>
    `${board.boardName}`.toLowerCase().includes(search.toLowerCase()),
  );

  const activeBoards = filtered.filter((board) => board.isDeleted === false);

  const deletedBoards = filtered.filter((board) => board.isDeleted === true);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="page-title">Job Boards</h1>
        </div>

        {/* Search bar*/}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3.5 top-1/3 transform-translate-y-1/2 text-slate-400 w-4 h-4"
            />
            <input
              type="text"
              placeholder="Search Board"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10"
            />
          </div>
        </div>
      </div>

      {/* Board Cards */}
      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin h-8 w-8 border-2 border-indigo-600 border-t-transparent rounded-full" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 mb-2">
            <button
              onClick={() => {
                setAddBoard(true);
              }}
              className="border rounded-1.5xl flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <FontAwesomeIcon icon={faPlus} />
              Add Board
            </button>

            {activeBoards.length === 0 ? (
              <p className="col-span-full text-center py-16 text-slice-400 bg-white rounded-2xl border border-dashed border-slate-200">
                No Active Boards Found.
              </p>
            ) : (
              activeBoards.map((b) => (
                <BoardCard
                  key={b._id}
                  board={b}
                  onEdit={(e) => {
                    setEditBoard(e);
                  }}
                  onDelete={fetchBoards}
                />
              ))
            )}
          </div>
          <hr />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 mt-2">
            {deletedBoards.length === 0 ? (
              <p className="col-span-full text-center py-16 text-slice-400 bg-white rounded-2xl border border-dashed border-slate-200">
                No Deleted Boards Found.
              </p>
            ) : (
              deletedBoards.map((b) => (
                <BoardCard
                  key={b._id}
                  board={b}
                  onEdit={(e) => {
                    setEditBoard(e);
                  }}
                  onDelete={fetchBoards}
                />
              ))
            )}
          </div>
        </>
      )}

      {/* Add Board */}
      {/* {addBoard && (
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
              </button> 
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
      )} */}

      {addBoard && (
        <AddBoardModal setAddBoard={setAddBoard} fetchBoards={fetchBoards} />
      )}

      {/* Edit Board */}
      {/* {editBoard && (
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
              </button> 
            </div>

            <div className="p-6">
              <BoardForm
                initialData={editBoard}
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
      )} */}

      {editBoard && (
        <EditBoardModal
          board={editBoard}
          setEditBoard={setEditBoard}
          fetchBoards={fetchBoards}
        />
      )}
    </div>
  );
}

export default BoardsPage;
