import { Router } from 'express';

import {
  getBoards,
  createBoard,
  updateBoard,
  deleteBoard,
} from '../controllers/boardController.js';

import protect from '../middleware/auth.js';

const boardRouter = Router();

boardRouter.get('/list', protect, getBoards);
boardRouter.post('/save', protect, createBoard);
boardRouter.put('/:boardId', protect, updateBoard);
boardRouter.delete('/:boardId', protect, deleteBoard);

export default boardRouter;
