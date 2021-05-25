import { injectable, inject } from 'tsyringe';
import { AddAccount } from '../../domain/usecases/add-account';
import { Controller, Delete, Get, Post, Put } from '../decorators';
import { BadRequest } from '../errors';
import { badRequest, ok } from '../helper';
import { validatorMiddleware } from '../middlewares/validator-middleware';
import { BaseController, HttpRequest, HttpResponse } from '../protocols';
import { createAccountSchema } from './schemas/create-account-schema';

@injectable()
@Controller('/account')
export class AccountController extends BaseController {
  constructor(
    @inject('AddAccount')
    private addAccount: AddAccount
  ) {
    super();
  }

  @Post('/', [validatorMiddleware(createAccountSchema)])
  async listAllAccounts(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.addAccount.add(req.body);

    if (!response)
      return badRequest(
        new BadRequest('message.error', 'Problema na criação de usuário')
      );

    return ok({ success: response });
  }

  @Post('/', [validatorMiddleware(createAccountSchema)])
  async createAccount(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.addAccount.add(req.body);

    if (!response)
      return badRequest(
        new BadRequest('message.error', 'Problema na criação de usuário')
      );

    return ok({ success: response });
  }

  @Put('/', [validatorMiddleware(createAccountSchema)])
  async updateAccount(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.addAccount.add(req.body);

    if (!response)
      return badRequest(
        new BadRequest('message.error', 'Problema na criação de usuário')
      );

    return ok({ success: response });
  }

  @Delete('/', [validatorMiddleware(createAccountSchema)])
  async deleteAccount(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.addAccount.add(req.body);

    if (!response)
      return badRequest(
        new BadRequest('message.error', 'Problema na criação de usuário')
      );

    return ok({ success: response });
  }
}
