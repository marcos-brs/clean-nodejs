import { DbListContent } from '@/data/usecases/content';
import { MemoryContentRepository } from '@/infra/db/content/repositories';

describe('DbListContent', () => {
  it('Should list all contents', async () => {
    const contentRepository = new MemoryContentRepository();
    const dbListContent = new DbListContent(contentRepository);

    const content1 = await contentRepository.create({
      _id: 'any_id',
      title: 'any_title',
      description: 'any_description',
      posted_at: new Date(),
      destination_url: 'any_url',
      owner_id: 'any_owner_id',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    const content2 = await contentRepository.create({
      _id: 'any_id2',
      title: 'any_title2',
      description: 'any_description2',
      posted_at: new Date(),
      destination_url: 'any_url2',
      owner_id: 'any_owner_id2',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    });

    const contents = await dbListContent.list({ pageIndex: 0, pageSize: 2 });

    expect(contents).toEqual([content1, content2]);
  });
});
