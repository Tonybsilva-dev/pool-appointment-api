import { Router } from 'express';
import { authenticateUserController } from '../controllers/authenticate-user-controller';
import { validateAuthenticateUser } from '../validators/authenticate-user-validator';

export const authRoutes = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica um usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token JWT
 *       400:
 *         description: Credenciais inválidas
 */
authRoutes.post('/login', validateAuthenticateUser, authenticateUserController);
