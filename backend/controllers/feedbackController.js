import Feedback from '../models/Feedback.js';

// @desc    Add feedback to a portfolio
// @route   POST /api/feedback/:portfolioId
export const addFeedback = async (req, res) => {
  try {
    const { name, comment, rating } = req.body;
    const { portfolioId } = req.params;

    if (!comment || !rating) {
      return res.status(400).json({ message: 'Comment and rating are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const feedback = new Feedback({
      portfolioId,
      name: name || 'Anonymous',
      comment,
      rating: Number(rating),
    });

    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all feedback for a portfolio
// @route   GET /api/feedback/:portfolioId
export const getFeedbackByPortfolio = async (req, res) => {
  try {
    const { portfolioId } = req.params;
    const feedbackList = await Feedback.find({ portfolioId }).sort({ createdAt: -1 });
    res.json(feedbackList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
