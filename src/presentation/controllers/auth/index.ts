import { injectable, inject } from 'tsyringe';
import { SignIn } from '../../../domain/usecases';
import { Controller, Delete, Get, Post, Put } from '../../decorators';
import { BadRequest } from '../../errors';
import { badRequest, ok } from '../../helper';
import { validatorMiddleware } from '../../middlewares/validator-middleware';
import { BaseController, HttpRequest, HttpResponse } from '../../protocols';
import { signInControllerSchema } from './schemas';

@injectable()
@Controller('/auth')
export class AuthController extends BaseController {
  constructor(
    @inject('SignIn')
    private signIn: SignIn
  ) {
    super();
  }

  @Post('/', [validatorMiddleware(signInControllerSchema)])
  async login(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.signIn.auth(req.body);

    if (!response)
      return badRequest(
        new BadRequest('message.error', 'Problema ao logar na conta')
      );

    return ok(response);
  }
}
