import express from 'express';
import { AuthController } from '../controllers/AuthController';

const router = express.Router();

router.get('/', AuthController.githubLogin);
router.get('/callback', AuthController.login);

export default router;
