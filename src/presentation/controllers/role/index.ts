import { injectable, inject } from 'tsyringe';
import {
  AddRole,
  DeleteRole,
  ListRoles,
  UpdateRole,
} from '../../../domain/usecases';
import { Controller, Delete, Get, Post, Put } from '../../decorators';
import { BadRequest } from '../../../shared/errors';
import { badRequest, ok } from '../../helper';
import { validatorMiddleware } from '../../middlewares/validator-middleware';
import { BaseController, HttpRequest, HttpResponse } from '../../protocols';
import {
  createRoleSchema,
  deleteRoleSchema,
  listRolesSchema,
  updateRoleSchema,
} from './schemas';

@injectable()
@Controller('/role')
export class RoleController extends BaseController {
  constructor(
    @inject('AddRole')
    private addAnRole: AddRole,
    @inject('DeleteRole')
    private deleteAnRole: DeleteRole,
    @inject('ListRoles')
    private listAllRoles: ListRoles,
    @inject('UpdateRole')
    private updateAnRole: UpdateRole
  ) {
    super();
  }

  @Get('/', [validatorMiddleware(listRolesSchema)])
  async listRoles(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.listAllRoles.list();

    if (!response)
      return badRequest(
        new BadRequest('message.error', 'Problema ao listar contas')
      );

    return ok({ response });
  }

  @Post('/', [validatorMiddleware(createRoleSchema)])
  async createRole(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.addAnRole.add(req.body);

    if (!response)
      return badRequest(new BadRequest('message.error', 'Problema ao conta'));

    return ok({ success: response });
  }

  @Put('/', [validatorMiddleware(updateRoleSchema)])
  async updateRole(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.updateAnRole.update(req.body);

    if (!response)
      return badRequest(
        new BadRequest('message.error', 'Problema ao atualizar conta')
      );

    return ok({ success: response });
  }

  @Delete('/', [validatorMiddleware(deleteRoleSchema)])
  async deleteRole(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.deleteAnRole.delete(req.body);

    if (!response)
      return badRequest(
        new BadRequest('message.error', 'Problema ao deletar conta')
      );

    return ok({ success: response });
  }
}
