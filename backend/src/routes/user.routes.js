import { Router } from 'express';
import { verifyToken } from '../middleware/auth.middleware';
import { getProfile, getOrderHistory } from '../controllers/user.controller';

const router = Router();
router.get('/profile', verifyToken, getProfile);
router.get('/history', verifyToken, getOrderHistory);
export default router;