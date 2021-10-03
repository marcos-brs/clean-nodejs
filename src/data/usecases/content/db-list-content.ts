import { injectable, inject } from 'tsyringe';
import { ListContent } from '@/domain/usecases/content/list-content';
import { ContentRepository } from '@/infra/db/content/repositories';

@injectable()
export class DbListContent implements ListContent {
  constructor(
    @inject('ContentRepository')
    private contentRepository: ContentRepository
  ) {}

  async list(contentData: ListContent.Params): Promise<ListContent.Result> {
    const { pageIndex, pageSize } = contentData;

    return this.contentRepository.findAllPaginated(pageIndex, pageSize);
  }
}
