import { inject, injectable } from 'tsyringe';
import {
  AddVoluntary,
  DeleteVoluntary,
  UpdateVoluntary,
  GetVoluntary,
} from '@/domain/usecases/voluntary';
import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
} from '@/presentation/decorators';
import { ok } from '@/presentation/helper';
import { validatorMiddleware } from '@/presentation/middlewares';
import { HttpRequest, HttpResponse } from '@/presentation/protocols';
import { BaseController } from '@/presentation/protocols/controller';
import { signupSchema, getSchema, deleteSchema, updateSchema } from './schemas';

@injectable()
@Controller('/voluntary')
export class VoluntaryController extends BaseController {
  constructor(
    @inject('UpdateVoluntary')
    private updateVoluntary: UpdateVoluntary,
    @inject('AddVoluntary')
    private addVoluntary: AddVoluntary,
    @inject('GetVoluntary')
    private getVoluntary: GetVoluntary,
    @inject('DeleteVoluntary')
    private deleteVoluntary: DeleteVoluntary
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

  @Get('/get', [validatorMiddleware(getSchema)])
  async gettingVoluntary(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.getVoluntary.get(req.body);

    return ok(response);
  }

  @Delete('/delete', [validatorMiddleware(deleteSchema)])
  async destroy(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.deleteVoluntary.delete(req.body);

    return ok(response);
  }
}
