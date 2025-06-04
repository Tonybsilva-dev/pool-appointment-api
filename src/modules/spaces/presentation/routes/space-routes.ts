import { Router } from 'express'

import { validateCreateSpace } from '../validators/create-space-validator'
import { validateUpdateSpace } from '../validators/update-space-validator'

import { validatePagination, validateParamsId } from '@/core/validators'
import { createSpaceController } from '../controllers/create-space.controller'
import { deleteSpaceController } from '../controllers/delete-space.controller'
import { findAllSpacesController } from '../controllers/find-all-spaces.controller'
import { findSpaceByIdController } from '../controllers/find-space-by-id.controller'
import { updateSpaceController } from '../controllers/update-space.controller'

export const spaceRoutes = Router()

spaceRoutes.post('/', validateCreateSpace, createSpaceController)
spaceRoutes.get('/', validatePagination, findAllSpacesController)
spaceRoutes.get('/:id', validateParamsId, findSpaceByIdController)
spaceRoutes.put('/:id', validateParamsId, validateUpdateSpace, updateSpaceController)
spaceRoutes.delete('/:id', validateParamsId, deleteSpaceController)