import { Router } from 'express';

import {
  getSection,
  createSection,
  updateSection,
  deleteSection,
} from '../controllers/sectionController.js';

import protect from '../middleware/auth.js';

const sectionRouter = Router();

sectionRouter.get('/list', protect, getSections);
sectionRouter.post('/save', protect, createSecion);
sectionRouter.put('/:sectionId', protect, updateSection);
sectionRouter.delete('/:sectionId', protect, deleteSection);

export default sectionRouter;
