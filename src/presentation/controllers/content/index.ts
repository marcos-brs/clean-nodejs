import { AddContent, ListContent } from '@/domain/usecases/content';
import { JwtAdapter } from '@/infra/cryptography/adapters/jwt-adapter';
import { addTokenToRequest } from '@/presentation/middlewares';
import { injectable, inject, container } from 'tsyringe';
import { Controller, Post, Get } from '../../decorators';
import { ok } from '../../helper';
import { validatorMiddleware } from '../../middlewares/validator-middleware';
import { BaseController, HttpRequest, HttpResponse } from '../../protocols';
import { listingSchema } from './schemas';
import { createContentSchema } from './schemas/create-content-schema';

@injectable()
@Controller('/content')
export class ContentController extends BaseController {
  constructor(
    @inject('AddContent')
    private addContent: AddContent,
    @inject('ListContent')
    private listContent: ListContent
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

  @Get('/list', [validatorMiddleware(listingSchema)])
  async listingContent(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.listContent.list(req.body);

    return ok(response);
  }
}
