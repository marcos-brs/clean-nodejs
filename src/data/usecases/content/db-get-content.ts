import { injectable, inject } from 'tsyringe';
import { ContentNotFound } from '@/domain/errors';
import { GetContent } from '@/domain/usecases/content';
import { ContentRepository } from '@/infra/db/content/repositories';

@injectable()
export class DbGetContent implements GetContent {
  constructor(
    @inject('ContentRepository')
    private contentRepository: ContentRepository
  ) {}

  async get(data: GetContent.Params): Promise<GetContent.Result> {
    const { destination_url } = data;

    const content = await this.contentRepository.findById(destination_url);
    if (!content) {
      throw new ContentNotFound();
    }

    return content;
  }
}
