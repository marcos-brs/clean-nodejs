import { AddContent, DeleteContent, ListContent } from '@/domain/usecases/content';
import { JwtAdapter } from '@/infra/cryptography/adapters/jwt-adapter';
import { addTokenToRequest } from '@/presentation/middlewares';
import { injectable, inject, container } from 'tsyringe';
import { Controller, Delete, Post, Get } from '../../decorators';
import { ok } from '../../helper';
import { validatorMiddleware } from '../../middlewares/validator-middleware';
import { BaseController, HttpRequest, HttpResponse } from '../../protocols';
import { deleteContentSchema, listingSchema} from './schemas';
import { createContentSchema } from './schemas/create-content-schema';

@injectable()
@Controller('/content')
export class ContentController extends BaseController {
  constructor(
    @inject('AddContent')
    private addContent: AddContent,
    @inject('DeleteContent')
    private deleteContent: DeleteContent,
    @inject('ListContent')
    private listContent: ListContent
  ) {
    super();
  }

  @Post('/a', [
    validatorMiddleware(createContentSchema),
    addTokenToRequest(container.resolve(JwtAdapter)),
  ])
  async store(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.addContent.add(req.body);

    return ok(response);
  }

  @Delete('/delete', [
    validatorMiddleware(deleteContentSchema),
    addTokenToRequest(container.resolve(JwtAdapter)),
  ])
  async delete(req: HttpRequest): Promise<HttpResponse> {
    const content: DeleteContent.Params = {
      destination_url: req.body.destination_url,
    };

    const response = await this.deleteContent.delete(content);
    
    return ok(response);
  }
  
  @Get('/list', [validatorMiddleware(listingSchema)])
  async listingContent(req: HttpRequest): Promise<HttpResponse> {
    const response = await this.listContent.list(req.body);

    return ok(response);
  }
}
