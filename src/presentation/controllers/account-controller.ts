import { Controller, Get, Post } from '../decorators';
import { ok } from '../helper';
import { validatorMiddleware } from '../middlewares/validator-middleware';
import { BaseController, HttpRequest, HttpResponse } from '../protocols';
import { createAccountSchema } from './schemas/create-account-schema';

@Controller('/account')
export class AccountController extends BaseController {
  @Post('/', [validatorMiddleware(createAccountSchema)])
  async createAccount(req: HttpRequest): Promise<HttpResponse> {
    return ok(req.body);
  }
}
