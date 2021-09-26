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
}
