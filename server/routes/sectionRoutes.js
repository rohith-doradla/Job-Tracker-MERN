import { Router } from 'express';

import {
  getSections,
  createSection,
  updateSection,
  deleteSection,
} from '../controllers/sectionController.js';

import protect from '../middleware/auth.js';

const sectionRouter = Router();

sectionRouter.get('/list/:boardId', protect, getSections);
sectionRouter.post('/save/:boardId', protect, createSection);
sectionRouter.put('/:sectionId', protect, updateSection);
sectionRouter.delete('/:sectionId', protect, deleteSection);

export default sectionRouter;

