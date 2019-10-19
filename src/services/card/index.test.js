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

  describe('_like', () => {
    test('Need room-id, stage-id, card-id, user-id to like card', async () => {
      await service._like('room-id', 'stage-id', 'card-id', 'user-id');
      expect(fakeRepo.like).toHaveBeenCalledWith('room-id', 'stage-id', 'card-id', 'user-id');
    });

    test('If user already liked this card Should return false', async () => {
      fakeRepo.alreadyVote.mockReturnValue(true);
      expect(await service._like()).toBe(false);
    });

    test('If user already voted 3 times Should return false', async () => {
      fakeRepo.countVote.mockReturnValue(3);
      expect(await service._like()).toBe(false);
    });
  });

  describe('_unlike', () => {
    test('Need room-id, stage-id, card-id, user-id to unlike card', async () => {
      fakeRepo.alreadyVote.mockReturnValue(true);
      await service._unlike('room-id', 'stage-id', 'card-id', 'user-id');
      expect(fakeRepo.unlike).toHaveBeenCalledWith('room-id', 'stage-id', 'card-id', 'user-id');
    });

    test('If user already unliked or not like this card Should return false', async () => {
      fakeRepo.alreadyVote.mockReturnValue(false);
      expect(await service._unlike()).toBe(false);
    });
  });
});
