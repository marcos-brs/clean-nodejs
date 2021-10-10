import { MemoryContentRepository } from '@/infra/db/content/repositories';
import { DbGetContent } from '@/data/usecases/content';

describe('DbGetContent', () => {
  it('Should get one content', async () => {
    const contentRepository = new MemoryContentRepository();
    const dbGetContent = new DbGetContent(contentRepository);

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

    const content = await dbGetContent.get({destination_url: 'any_url' });

    expect(content._id).toEqual(content1._id);
    expect(content.title).toEqual(content1.title);
  });
});
