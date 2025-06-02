import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import { routes } from './core/routes/index.routes';
import { setupSwagger } from './config/swagger';
import { errorHandler } from './core/middlewares/error-handling';
import { ENV_CONFIG } from './config/env';

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);
setupSwagger(app);

app.use(errorHandler);

app.listen(ENV_CONFIG.APP_PORT, () => {
  console.log(`🚀 Server running on http://localhost:${ENV_CONFIG.APP_PORT}`);
});
