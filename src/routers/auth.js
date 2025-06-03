import { Router } from 'express';
import express from 'express';
import { registerSchema, loginSchema } from '../validation/auth.js';
import { registerController, loginController, refreshController, logoutController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();
const jsonParser = express.json();


router.post('/register', jsonParser, validateBody(registerSchema), ctrlWrapper(registerController));
router.post('/login', jsonParser, validateBody(loginSchema), ctrlWrapper(loginController));
router.post('/refresh', authenticate, ctrlWrapper(refreshController));
router.post('/logout', authenticate, ctrlWrapper(logoutController));

export default router;
