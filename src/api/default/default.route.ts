import { Router } from 'express';

import Logger from '../../lib/logger';
import Config from '../../utils/config';

import { catchError } from '../../helpers/error.helper';
// import * as AuthMiddleware from '../../middleware/auth-middleware';
import Controller from './default.controller';

const router: Router = Router();
const controller = new Controller();

const logger = Logger.getLogger('default-route');
const config = Config.get();

// const auth = AuthMiddleware.authenticate({ logger, config });

/**
 * Get Default list
 * @route GET /Default
 * @param {string} typeRes.query to: BACKOFFICE - optional
 * @param {string} email.query optional
 * @group Default - operations
 * @operationId findAll
 * @produces application/json
 * @returns {Array.<Entity>} 200 - An array of Default
 * @returns {Error.model} 500 - Unexpected error
 * @security JWT
 */
// Retrieve all Default
router.get('/', catchError(controller.find));

/**
 * Register Entity
 * @route POST /Default
 * @param {EntityRegisterReq.model} body.body.required An object of Entity
 * @group Default - operations
 * @operationId register
 * @produces application/json
 * @returns {EntityRegisterRes.model} 201 - Created
 * @returns {} 404 - Specified Entity not found
 * @returns {Error.model} 500 - Unexpected error
 */
router.post('/', catchError(controller.register));

/**
 * Update Default
 * @route PATCH /Default/{id}/change-Default
 * @param {integer} id.path.required id - eg: 1
 * @param {ChangeDefaultReq.model} body.body.required Defaults of a Entity
 * @group Default - Entity entity operations
 * @operationId changeDefault
 * @produces application/json
 * @returns {Success.model} 200 - Success
 * @returns {} 400 - Invalid current Default
 * @returns {} 404 - Specified Entity not found
 * @returns {Error.model} 500 - Unexpected error
 * @security JWT
 */
// router.patch('/:id/change-Default', auth, catchError(controller.changeDefault));
router.patch('/:id', catchError(controller.update));

/**
 * Delete Default
 * @route PATCH /Default/{id}/change-Default
 * @param {integer} id.path.required id - eg: 1
 * @param {ChangeDefaultReq.model} body.body.required Defaults of a Entity
 * @group Default - Entity entity operations
 * @operationId changeDefault
 * @produces application/json
 * @returns {Success.model} 200 - Success
 * @returns {} 400 - Invalid current Default
 * @returns {} 404 - Specified Entity not found
 * @returns {Error.model} 500 - Unexpected error
 * @security JWT
 */
router.delete('/:id', catchError(controller.delete));

export default router;
