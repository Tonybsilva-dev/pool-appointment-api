import { Router } from 'express';

import { createUserController, deleteUserController, findAllUsersController, findUserByIdController, updateUserController } from '../controllers';

import { validateCreateUser, validateUpdateUser } from '../validators';
import { validatePagination, validateParamsId } from '@/core/validators';

export const userRoutes = Router();

userRoutes.post('/', validateCreateUser, createUserController);
userRoutes.get('/', validatePagination, findAllUsersController);
userRoutes.get('/:id', validateParamsId, findUserByIdController);
userRoutes.put('/:id', validateParamsId, validateUpdateUser, updateUserController);
userRoutes.delete('/:id', validateParamsId, deleteUserController);
