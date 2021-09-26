import { MemoryContentRepository } from '@/infra/db/content/repositories';
import { Uuidv4Adapter } from '@/infra/uuid/adapters';
import { DbAddContent } from '@/data/usecases/content';

describe('DbAddContent', () => {
  it('Should add a content to db', async () => {
    const uuid = new Uuidv4Adapter();
    const contentRepository = new MemoryContentRepository();
    const dbAddContent = new DbAddContent(uuid, contentRepository);

    await dbAddContent.add({
      title: 'any_title',
      description: 'any_description',
      posted_at: new Date(),
      destination_url: 'any_url',
      owner_id: 'any_owner_id',
    });
    const account = await contentRepository.findByDestinationUrl('any_url');

    expect(account?.title).toEqual('any_title');
    expect(account?.description).toEqual('any_description');
    expect(account?.owner_id).toEqual('any_owner_id');
    expect(account?.destination_url).toEqual('any_url');
  });
});
