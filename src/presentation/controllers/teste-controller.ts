import { Controller, Get } from '../decorators';
import { BaseController, HttpRequest, HttpResponse } from '../protocols';

@Controller('/teste')
export class TesteController extends BaseController {
  @Get('/')
  async teste(req: HttpRequest): Promise<HttpResponse> {
    return {
      statusCode: 200,
      body: { ok: true },
    };
  }
}
