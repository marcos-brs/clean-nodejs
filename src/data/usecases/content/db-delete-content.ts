import { injectable, inject } from 'tsyringe';
import { Uuid } from '@/infra/uuid/protocols';
import { DeleteContent } from '@/domain/usecases/content';
import { ContentRepository } from '@/infra/db/content/repositories';
import { ContentNotFound } from '@/domain/errors';

@injectable()
export class DbDeleteContent implements DeleteContent {
  constructor(
    @inject('Uuid')
    private uuid: Uuid,
    @inject('ContentRepository')
    private contentRepository: ContentRepository,
    @inject('DeleteContent')
    private deleteContent: DeleteContent
  ) {}

  async delete(content: DeleteContent.Params): Promise<DeleteContent.Result> {
    const contentToDelete = await this.contentRepository.findByDestinationUrl(
      content.destination_url
    );
    if (!contentToDelete) {
      throw new ContentNotFound();
    }

    await this.contentRepository.delete(contentToDelete._id);

    return true;
  }
}
