import Service from './index';
import Repository from './repository';
import LikeRepository from './like-repository';
import TimesLimitExceededError from '../../errors/times-limited-exceeded';

jest.mock('./repository');
jest.mock('./like-repository');

let service;
let fakeRepo;
let fakeLikeRepo;

beforeEach(() => {
  fakeRepo = new Repository;
  fakeLikeRepo = new LikeRepository();
  service = new Service(fakeRepo, fakeLikeRepo);
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

  describe('vote like', () => {
    test('Need room-id, stage-id, card-id, user-id to like card', async () => {
      await service.vote('room-id', 'stage-id', 'card-id', 'user-id', 'LIKE');
      expect(fakeLikeRepo.like).toHaveBeenCalledWith('room-id', 'stage-id', 'card-id', 'user-id');
    });

    test('If user already liked this card Should not like and return true', async () => {
      fakeLikeRepo.alreadyVote.mockReturnValue(true);
      const result = await service.vote('room-id', 'stage-id', 'card-id', 'user-id', 'LIKE');
      expect(fakeLikeRepo.like).not.toHaveBeenCalled();
      expect(result).toBe(true);
    });

    test('If user already voted 3 times Should not like and throw Violet', async () => {
      fakeLikeRepo.countVote.mockReturnValue(3);
      await expect(service.vote('room-id', 'stage-id', 'card-id', 'user-id', 'LIKE'))
        .rejects.toStrictEqual(new TimesLimitExceededError());
    });
  });

  describe('vote unlike', () => {
    test('Need room-id, stage-id, card-id, user-id to unlike card', async () => {
      fakeLikeRepo.alreadyVote.mockReturnValue(true);
      await service.vote('room-id', 'stage-id', 'card-id', 'user-id', 'UNLIKE');
      expect(fakeLikeRepo.unlike).toHaveBeenCalledWith('room-id', 'stage-id', 'card-id', 'user-id');
    });

    test('If user already unliked or not like this card Should not unlike and return true', async () => {
      fakeLikeRepo.alreadyVote.mockReturnValue(false);
      expect(fakeLikeRepo.unlike).not.toHaveBeenCalled();
      const result = await service.vote('room-id', 'stage-id', 'card-id', 'user-id', 'UNLIKE');
      expect(result).toBe(true);
    });
  });
});
