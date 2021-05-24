import { Controller, Get } from '../decorators';
import { validatorMiddleware } from '../middlewares/validator-middleware';
import { BaseController, HttpRequest, HttpResponse } from '../protocols';
import { testeSchema } from './schemas/teste-controller-schema';

@Controller('/teste')
export class TesteController extends BaseController {
  @Get('/', [validatorMiddleware(testeSchema)])
  async teste(req: HttpRequest): Promise<HttpResponse> {
    return {
      statusCode: 200,
      body: { ok: true },
    };
  }
}
