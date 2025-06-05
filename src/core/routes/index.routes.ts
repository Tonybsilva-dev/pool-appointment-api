import { Router } from 'express';
import { userRoutes } from '@/modules/users/presentation/routes/user-routes';
import { spaceRoutes } from '@/modules/spaces/presentation/routes/space-routes';
import { ratingRoutes } from '@/modules/ratings/presentation/routes/rating-routes';

export const routes = Router();

routes.get('/status', (req, res) => {
  res.json({ status: 'ok' });
});

routes.use('/users', userRoutes);
routes.use('/spaces', spaceRoutes);
routes.use('/ratings', ratingRoutes);