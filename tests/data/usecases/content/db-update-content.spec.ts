import { DbUpdateContent } from '@/data/usecases/content';
import { MemoryContentRepository } from '@/infra/db/content/repositories';

describe('DbUpdateContent', () => {


  it('Should update a content object from db', async () => {
    const contentRepository = new MemoryContentRepository();
    const dbUpdateContent = new DbUpdateContent(
      contentRepository,
    );

    await contentRepository.create({
      _id: 'any_id',
      title: 'any_title',
      description: 'any_description',
      posted_at: new Date(),
      destination_url: 'any_url',
      owner_id: 'any_owner_id',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: new Date()
    });

    await dbUpdateContent.update({
      destination_url: 'any_url',
      title: 'another_name',
    });

    const content = await contentRepository.findByDestinationUrl('any_url');

    expect(content?.title).toEqual('another_name');
  });
});
