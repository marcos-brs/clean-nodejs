import { UpdateVoluntary } from '@/domain/usecases/voluntary';
import { Controller, Patch } from '@/presentation/decorators';
import { ok } from '@/presentation/helper';
import { validatorMiddleware } from '@/presentation/middlewares';
import { HttpRequest, HttpResponse } from '@/presentation/protocols';
import { BaseController } from '@/presentation/protocols/controller';
import { inject, injectable } from 'tsyringe';
import { updateSchema } from './schemas/update';

@injectable()
@Controller('/voluntary')
export class VoluntaryController extends BaseController {
  constructor(
    @inject('UpdateVoluntary')
    private updateVoluntary: UpdateVoluntary
  ) {
    super();
  }

  @Patch('/update', [validatorMiddleware(updateSchema)])
  async patchVoluntary(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.updateVoluntary.update(req.body);

    return ok(response);
  }
}
