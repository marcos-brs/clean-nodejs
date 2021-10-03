import { getModelForClass } from '@typegoose/typegoose';
import { MongoBaseRepository } from '@/shared/infra/db/repositories';
import { Content } from '@/domain/models/content';
import { ContentSchema } from '@/domain/models/content/content-mongo';
import { ContentRepository } from './content-repository';

export class MongoAccountRepository
  extends MongoBaseRepository<Content, ContentSchema>
  implements ContentRepository
{
  constructor() {
    super();
    this.ormRepository = getModelForClass(ContentSchema);
  }

  public async findByDestinationUrl(url: string): Promise<Content | null> {
    const content = await this.ormRepository.findOne({ url });

    if (content === null) return null;

    return content.toObject() as Content;
  }

  public async findAllPaginated(
    pageIndex: number,
    pageSize: number
  ): Promise<Content[]> {
    const contents = await this.ormRepository
      .find()
      .limit(pageSize)
      .skip((pageIndex - 1) * pageSize);

    return contents as unknown as Content[];
  }
}
