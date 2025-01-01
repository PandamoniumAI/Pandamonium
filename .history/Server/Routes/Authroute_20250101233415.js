import express from 'express';
import { registerUser, logoutUser } from '../Controllers/Login';

const router = express.Router();

router.post('/register', registerUser);
router.post('/logout', logoutUser);

export default router;
