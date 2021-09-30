import { Content } from '@/domain/models/content';
import { BaseRepository } from '@/shared/infra/db/repositories';

export interface ContentRepository extends BaseRepository<Content> {
  findByDestinationUrl(url: string): Promise<Content>;
}
