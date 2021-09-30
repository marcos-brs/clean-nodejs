import { AddContent } from '@/domain/usecases/content';
import { JwtAdapter } from '@/infra/cryptography/adapters/jwt-adapter';
import { addTokenToRequest } from '@/presentation/middlewares';
import { injectable, inject, container } from 'tsyringe';
import { Controller, Post } from '../../decorators';
import { ok } from '../../helper';
import { validatorMiddleware } from '../../middlewares/validator-middleware';
import { BaseController, HttpRequest, HttpResponse } from '../../protocols';
import { createContentSchema } from './schemas/create-content-schema';

@injectable()
@Controller('/content')
export class ContentController extends BaseController {
  constructor(
    @inject('AddContent')
    private addContent: AddContent
  ) {
    super();
  }

  @Post('/', [
    validatorMiddleware(createContentSchema),
    addTokenToRequest(container.resolve(JwtAdapter)),
  ])
  async store(req: HttpRequest): Promise<HttpResponse> {
    const content: AddContent.Params = {
      title: req.body.title,
      description: req.body.description,
      destination_url: req.body.destination_url,
      posted_at: req.body.posted_at,
      owner_id: req.user.id,
    };

    const response = await this.addContent.add(content);

    return ok(response);
  }
}
