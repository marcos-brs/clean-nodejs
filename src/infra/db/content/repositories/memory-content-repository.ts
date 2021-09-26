import { Content } from '@/domain/models/content';
import { MemoryBaseRepository } from '@/shared/infra/db/repositories';
import { ContentRepository } from './content-repository';

export class MemoryContentRepository
  extends MemoryBaseRepository<Content>
  implements ContentRepository
{
  constructor() {
    super();
  }

  public async findByDestinationUrl(url: string): Promise<Content | null> {
    const foundData = this.model.find(data => data.destination_url === url);

    if (!foundData) {
      return null;
    }

    return foundData;
  }
}
