import { Router } from 'express';
import { createUserController } from '../controllers/create-user-controller';
import { validateCreateUser } from '../validators/create-user-validator';

export const userRoutes = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum:
 *                   - ACTIVE
 *                   - INACTIVE
 *                   - BLOCKED
 *                   - PENDING
 *     responses:
 *       201:
 *         description: Usuário criado
 *       400:
 *         description: Erro de validação
 */
userRoutes.post('/', validateCreateUser, createUserController);
