import pdf from 'pdf-parse/lib/pdf-parse.js';
import { parseResumeWithAI } from '../utils/parseResumeWithAI.js';
import { toPortfolioDraft } from '../utils/profileMapper.js';

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a PDF file' });
    }

    const data = await pdf(req.file.buffer);
    const text = (data.text || '').trim();

    if (text.length < 50) {
      return res.status(422).json({
        message:
          'Could not read text from this PDF. It may be a scanned image.',
      });
    }

    const parsed = await parseResumeWithAI(text);
    const draft = toPortfolioDraft(parsed);

    res.json({ pages: data.numpages, draft });
  } catch (error) {
    console.error('Resume upload error:', error.message);
    res
      .status(500)
      .json({ message: 'Failed to parse the resume. Please try again.' });
  }
};