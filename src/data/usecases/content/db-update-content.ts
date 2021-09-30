import { injectable, inject } from 'tsyringe';
import { UpdateContent } from '@/domain/usecases/content';
import { ContentRepository } from '@/infra/db/content/repositories';
import { ContentNotFound } from '@/domain/errors';

@injectable()
export class DbUpdateContent implements UpdateContent {
  constructor(
    @inject('ContentRepository')
    private contentRepository: ContentRepository
  ) {}

  async update(data: UpdateContent.Params): Promise<UpdateContent.Result> {

    const content = await this.contentRepository.findByDestinationUrl(data.destination_url)

    if (!content) {
      throw new ContentNotFound();
    }

    Object.assign(content, { ...data })

    await this.contentRepository.update(content)

    return content;
  }
}
