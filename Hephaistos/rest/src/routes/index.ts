import { Router } from 'express';
import UserRouter from './Users';
import AuthRouter from './Auth';
import HephatitosRouter from './Hephaistos';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/auth', AuthRouter);
router.use('/hephaistos', HephatitosRouter);

// Export the base-router
export default router;
