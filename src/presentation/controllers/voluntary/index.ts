import { inject, injectable } from 'tsyringe';
import { AddVoluntary, UpdateVoluntary } from '@/domain/usecases/voluntary';
import { Controller, Patch, Post } from '@/presentation/decorators';
import { ok } from '@/presentation/helper';
import { validatorMiddleware } from '@/presentation/middlewares';
import { HttpRequest, HttpResponse } from '@/presentation/protocols';
import { BaseController } from '@/presentation/protocols/controller';
import { signupSchema, updateSchema } from './schemas';

@injectable()
@Controller('/voluntary')
export class VoluntaryController extends BaseController {
  constructor(
    @inject('UpdateVoluntary')
    private updateVoluntary: UpdateVoluntary,
    @inject('AddVoluntary')
    private addVoluntary: AddVoluntary
  ) {
    super();
  }

  @Patch('/update', [validatorMiddleware(updateSchema)])
  async patchVoluntary(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.updateVoluntary.update(req.body);

    return ok(response);
  }

  @Post('/signup', [validatorMiddleware(signupSchema)])
  async createVoluntary(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.addVoluntary.add(req.body);

    return ok(response);
  }
}
