import { injectable, inject } from 'tsyringe';
import {
  DeleteAccount,
  ListAccounts,
  UpdateAccount,
  AddAccount,
  GetAccount,
} from '../../../domain/usecases/account';
import { Controller, Delete, Get, Post, Put } from '../../decorators';
import { ok } from '../../helper';
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
    private updateAnAccount: UpdateAccount,
    @inject('GetAccount')
    private getAccount: GetAccount
  ) {
    super();
  }

  @Get('/list', [validatorMiddleware(listAccountsSchema)])
  async listAccounts(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.listAllAccounts.list();

    return ok(response);
  }

  @Post('/', [validatorMiddleware(createAccountSchema)])
  async createAccount(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.addAnAccount.add(req.body);

    return ok(response);
  }

  @Put('/', [validatorMiddleware(updateAccountSchema)])
  async updateAccount(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.updateAnAccount.update(req.body);

    return ok(response);
  }

  @Delete('/', [validatorMiddleware(deleteAccountSchema)])
  async deleteAccount(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.deleteAnAccount.delete(req.body);
    return ok({ success: response });
  }

  @Get('/', [validatorMiddleware(listAccountsSchema)])
  async show(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.getAccount.get(req.body);

    return ok(response);
  }
}
