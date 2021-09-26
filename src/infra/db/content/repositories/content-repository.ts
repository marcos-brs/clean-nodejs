import { Content } from '@/domain/models/content';
import { BaseRepository } from '@/shared/infra/db/repositories';

export type ContentRepository = BaseRepository<Content>;
