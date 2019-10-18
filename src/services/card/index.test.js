import Service from './index';
import Repository from './repository';

jest.mock('./repository');

let service;
let fakeRepo;

beforeEach(() => {
  fakeRepo = new Repository;
  service = new Service(fakeRepo);
});

describe('list', () => {
  test('Given room id and stage id Should return cards and counts', async () => {
    fakeRepo.list.mockReturnValue({ Items: 'cards', Count: 0 });
    expect(await service.list('room-id', 'stage-id')).toStrictEqual({ data: 'cards', count: 0 });
    expect(fakeRepo.list).toHaveBeenCalledWith('room-id', 'stage-id');
  });
});

describe('create', () => {
  test('Should return new card id', async () => {
    expect(await service.create()).toEqual(expect.objectContaining({ id: expect.any(String) }));
  });

  test('Need room id, stage id, user id, content', async () => {
    await service.create('room-id', 'stage-id', 'user-id', 'content');
    expect(fakeRepo.create).toHaveBeenCalledWith('room-id', 'stage-id', expect.any(String), 'user-id', 'content');
  });

});
