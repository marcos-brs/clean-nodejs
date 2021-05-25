import { injectable, inject } from 'tsyringe';
import { AddRole } from '../../domain/usecases/add-role';
import { Controller, Get, Post } from '../decorators';
import { BadRequest } from '../errors';
import { badRequest, ok } from '../helper';
import { validatorMiddleware } from '../middlewares/validator-middleware';
import { BaseController, HttpRequest, HttpResponse } from '../protocols';
import { createRoleSchema } from './schemas/create-role-schema';

@injectable()
@Controller('/role')
export class RoleController extends BaseController {
  constructor(
    @inject('AddRole')
    private addRole: AddRole
  ) {
    super();
  }

  @Post('/', [validatorMiddleware(createRoleSchema)])
  async createRole(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.addRole.add(req.body);

    if (!response)
      return badRequest(
        new BadRequest('message.error', 'Problema na criação da função')
      );

    return ok({ success: response });
  }
}
