import { container } from 'tsyringe';
import { DbAddAccount } from '../../data/usecases/db-add-account';
import { Controller, Get, Post } from '../decorators';
import { BadRequest } from '../errors';
import { badRequest, ok } from '../helper';
import { validatorMiddleware } from '../middlewares/validator-middleware';
import { BaseController, HttpRequest, HttpResponse } from '../protocols';
import { createAccountSchema } from './schemas/create-account-schema';

@Controller('/account')
export class AccountController extends BaseController {
  @Post('/', [validatorMiddleware(createAccountSchema)])
  async createAccount(req: HttpRequest): Promise<HttpResponse> {
    const dbAddAccount = container.resolve(DbAddAccount);
    const response = await dbAddAccount.add(req.body);

    if (!response)
      return badRequest(
        new BadRequest('message.error', 'Problema na criação de usuário')
      );

    return ok({ success: response });
  }
}
