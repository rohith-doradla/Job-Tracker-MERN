import { Router } from 'express';

import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';

import protect from '../middleware/auth.js';

const jobRouter = Router();

jobRouter.get('/list/:sectionId', protect, getJobs);
jobRouter.post('/save/:sectionId', protect, createJob);
jobRouter.put('/:jobId', protect, updateJob);
jobRouter.delete('/:jobId', protect, deleteJob);

export default jobRouter;
