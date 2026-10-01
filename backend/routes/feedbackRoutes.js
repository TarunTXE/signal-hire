import express from 'express';
import { addFeedback, getFeedbackByPortfolio } from '../controllers/feedbackController.js';

const router = express.Router();

// Public routes for submitting and fetching feedback
router.route('/:portfolioId')
  .post(addFeedback)
  .get(getFeedbackByPortfolio);

export default router;
