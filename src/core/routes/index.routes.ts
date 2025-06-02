import { Router } from 'express';
import { userRoutes } from '@/modules/users/presentation/routes/user-routes';

export const routes = Router();

routes.get('/status', (req, res) => {
  res.json({ status: 'ok' });
});

routes.use('/users', userRoutes);