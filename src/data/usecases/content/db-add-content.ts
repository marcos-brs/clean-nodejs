import { injectable, inject } from 'tsyringe';
import { Uuid } from '@/infra/uuid/protocols';
import { AddContent } from '@/domain/usecases/content';
import { ContentRepository } from '@/infra/db/content/repositories';
import { ContentAlreadyRegistered } from '@/domain/errors';

@injectable()
export class DbAddContent implements AddContent {
  constructor(
    @inject('Uuid')
    private uuid: Uuid,
    @inject('ContentRepository')
    private contentRepository: ContentRepository
  ) {}

  async add(content: AddContent.Params): Promise<AddContent.Result> {
    if (
      await this.contentRepository.findByDestinationUrl(content.destination_url)
    ) {
      throw new ContentAlreadyRegistered();
    }

    const { title, description, owner_id, destination_url, posted_at } =
      content;

    const addContent = await this.contentRepository.create({
      _id: this.uuid.generate(),
      title,
      description,
      owner_id,
      destination_url,
      posted_at,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    return addContent;
  }
}
