import express from 'express';
import { AuthController } from '../controllers/AuthController';

const router = express.Router();

router.get('/login', AuthController.login);
router.get('/callback', AuthController.callback);

// router.post('/token', AuthController.token);
// router.post('/register', AuthController.register);

export default router;
