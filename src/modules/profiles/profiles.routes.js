
import express from 'express';

import { editMyProfile, fetchMyProfile } from './profiles.controller.js';
import { authenticateUser } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.get('/me', authenticateUser, fetchMyProfile);
router.patch('/me', authenticateUser, editMyProfile)

export default router;
