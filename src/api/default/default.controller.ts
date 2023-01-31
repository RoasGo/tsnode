import { Request, Response } from 'express';

import Logger from '../../lib/logger';
import { to } from '../../helpers/fetch.helper';
import { BadRequest, Created, NotFound, Ok } from '../../helpers/http.helper';
import { throwDBError } from '../../helpers/error.helper';
import { execute } from './default.service';

const logger = Logger.getLogger('default-controller');

export default class UserController {
  constructor() { }

  public async find(req: Request, res: Response) {
    const { query } = req.body;
    if (!query) {
      return BadRequest(res, { message: 'No query provided' });
    }

    const [error, result] = await to(execute(query));
    if (error) {
      throwDBError(error.message);
    }

    if (!result) {
      return NotFound(res, { message: 'No result founded' });
    }

    return Ok(res, result);
  }

  public async register(req: Request, res: Response) {
    const { query } = req.body;
    if (!query) {
      return BadRequest(res, { message: 'No query provided' });
    }

    const [error, result] = await to(execute(query));
    if (error) {
      throwDBError(error.message);
    }

    return Created(res, result);
  }

  public async update(req: Request, res: Response) {
    const { query } = req.body;
    const [error, result] = await to(execute(query));
    if (error) {
      throwDBError(error.message);
    }

    return Ok(res, result);
  }

  public async delete(req: Request, res: Response) {
    const { query } = req.body;
    const [error, result] = await to(execute(query));
    if (error) {
      throwDBError(error.message);
    }

    return Ok(res, result);
  }
}
