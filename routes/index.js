import { Router } from 'express';
const router = Router();

import RouterMain from './main.js';
import LoginRouter from './login.js';
import AdminRouter from './admin.js';

router.use('/', RouterMain);
router.use('/login', LoginRouter);
router.use('/admin', AdminRouter);

export default router;
