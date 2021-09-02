import { inject, injectable } from 'tsyringe';
import { Controller, Post, Delete, Get } from '@/presentation/decorators';
import {
  BaseController,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols';
import { validatorMiddleware } from '@/presentation/middlewares';
import { AddVoluntary } from '@/domain/usecases/voluntary/add-voluntary';
import { ok } from '@/presentation/helper';
import { signupSchema } from './schemas';

@injectable()
@Controller('/voluntary')
export class VoluntaryController extends BaseController {
  constructor(
    @inject('AddVoluntary')
    private addVoluntary: AddVoluntary
  ) {
    super();
  }

  @Post('/signup', [validatorMiddleware(signupSchema)])
  async createVoluntary(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.addVoluntary.add(req.body);

    return ok(response);
  }
}
