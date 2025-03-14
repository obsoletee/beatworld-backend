import { Router } from 'express';
import {
  getAllSongs,
  getFeaturedSongs,
  getMadeForYouSongs,
  getTrendingSongs,
  updatePlays,
} from '../controller/song.controller.js';
import { protectRoute, requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', protectRoute, requireAdmin, getAllSongs);
router.get('/featured', getFeaturedSongs);
router.get('/made-for-you', getMadeForYouSongs);
router.get('/trending', getTrendingSongs);
router.patch('/updatePlays/:id', updatePlays);
export default router;
