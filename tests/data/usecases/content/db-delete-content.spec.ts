import { MemoryContentRepository } from '@/infra/db/content/repositories';
import { Uuidv4Adapter } from '@/infra/uuid/adapters';
import { DbAddContent, DbDeleteContent } from '@/data/usecases/content';
import { DeleteContent } from '@/domain/usecases/content';

class DbDeleteContentStub implements DeleteContent {
  async delete(content: DeleteContent.Params): Promise<DeleteContent.Result> {
    return Promise.resolve(true);
  }
}

describe('DbDeleteContent', () => {
  it('Should delete a content in db', async () => {
    const uuid = new Uuidv4Adapter();
    const contentRepository = new MemoryContentRepository();
    const deleteContent = new DbDeleteContentStub();
    const dbDeleteContent = new DbDeleteContent(
      uuid,
      contentRepository,
      deleteContent
    );
    const dbAddContent = new DbAddContent(uuid, contentRepository);

    await dbAddContent.add({
      title: 'any_title',
      description: 'any_description',
      posted_at: new Date(),
      destination_url: 'any_url',
      owner_id: 'any_owner_id',
    });
    const account = await contentRepository.findByDestinationUrl('any_url');

    const isDeleted = await dbDeleteContent.delete(account);
    const content = await contentRepository.findByDestinationUrl('any_url');

    expect(content).toBe(null);
    expect(isDeleted).toBe(true);
  });
});
