import express from 'express';
import {
  logChant,
  getUserChants,
  getGuestChants,
  deleteChant,
} from '../controllers/chantController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// For guest or user logging a chant
router.post('/', logChant);

// Fetch chants for logged-in user
router.get('/me', protect, getUserChants);

// Fetch chants for guest via sessionId
router.get('/guest/:sessionId', getGuestChants);

// Optional: allow deleting a chant
router.delete('/:id', protect, deleteChant);

export default router;
