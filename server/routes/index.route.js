import express from 'express';
import ratingRoutes from './rating.route';
import userRoutes from './user.route';
import authRoutes from './auth.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount user routes at /users
router.use('/ratings', ratingRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

export default router;
