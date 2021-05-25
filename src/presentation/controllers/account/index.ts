import { injectable, inject } from 'tsyringe';
import {
  DeleteAccount,
  ListAccounts,
  UpdateAccount,
} from '../../../domain/usecases';
import { AddAccount } from '../../../domain/usecases/add-account';
import { Controller, Delete, Get, Post, Put } from '../../decorators';
import { BadRequest } from '../../errors';
import { badRequest, ok } from '../../helper';
import { validatorMiddleware } from '../../middlewares/validator-middleware';
import { BaseController, HttpRequest, HttpResponse } from '../../protocols';
import {
  createAccountSchema,
  deleteAccountSchema,
  listAccountsSchema,
  updateAccountSchema,
} from './schemas';

@injectable()
@Controller('/account')
export class AccountController extends BaseController {
  constructor(
    @inject('AddAccount')
    private addAnAccount: AddAccount,
    @inject('DeleteAccount')
    private deleteAnAccount: DeleteAccount,
    @inject('ListAccounts')
    private listAllAccounts: ListAccounts,
    @inject('UpdateAccount')
    private updateAnAccount: UpdateAccount
  ) {
    super();
  }

  @Get('/', [validatorMiddleware(listAccountsSchema)])
  async listAccounts(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.listAllAccounts.list();

    if (!response)
      return badRequest(
        new BadRequest('message.error', 'Problema ao listar contas')
      );

    return ok({ response });
  }

  @Post('/', [validatorMiddleware(createAccountSchema)])
  async createAccount(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.addAnAccount.add(req.body);

    if (!response)
      return badRequest(new BadRequest('message.error', 'Problema ao conta'));

    return ok({ success: response });
  }

  @Put('/', [validatorMiddleware(updateAccountSchema)])
  async updateAccount(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.updateAnAccount.update(req.body);

    if (!response)
      return badRequest(
        new BadRequest('message.error', 'Problema ao atualizar conta')
      );

    return ok({ success: response });
  }

  @Delete('/', [validatorMiddleware(deleteAccountSchema)])
  async deleteAccount(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.deleteAnAccount.delete(req.body);

    if (!response)
      return badRequest(
        new BadRequest('message.error', 'Problema ao deletar conta')
      );

    return ok({ success: response });
  }
}
