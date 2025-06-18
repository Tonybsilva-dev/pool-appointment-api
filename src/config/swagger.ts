import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    basePath: '/api',
    host: 'localhost:3000',
    schemes: ['http'],
    info: {
      title: 'Pool Appointments API',
      version: '1.0.0',
      description: 'API for managing appointments',
      contact: {
        name: 'Antonio Silva',
        url: 'https://www.linkedin.com/in/tony-silva/',
        email: 'contato@antoniobsilva.com.br',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Local server',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
  },
  apis: ['./src/modules/**/presentation/docs/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
