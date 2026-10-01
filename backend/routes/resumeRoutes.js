import express from 'express';
import multer from 'multer';
import { uploadResume } from '../controllers/resumeController.js';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 4 * 1024 * 1024 }, // 4 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF files are allowed'));
  },
});

// No auth on purpose, so guests can use it too
router.post('/upload', (req, res) => {
  upload.single('resume')(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    uploadResume(req, res);
  });
});

export default router;