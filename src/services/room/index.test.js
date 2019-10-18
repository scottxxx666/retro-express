import Service from './index';
import Repository from './repository';
import ResourceNotFoundError from '../../errors/resource-not-found';
import uuid from '../../utils/uuid';

jest.mock('./repository');
jest.mock('../../utils/uuid')

let service;
let fakeRepo;

describe('find', () => {
  beforeEach(() => {
    fakeRepo = new Repository();
    service = new Service(fakeRepo);
  });

  test('Given existed room id Should return room info', async () => {
    fakeRepo.find.mockReturnValue('room-info');
    const result = await service.find('room-id');
    expect(fakeRepo.find).toHaveBeenCalledWith('room-id');
    expect(result).toBe('room-info');
  });

  test('Given non-existed room id Should throw Error', async () => {
    fakeRepo.find.mockRejectedValue(new ResourceNotFoundError());
    await expect(service.find('non-existed-room-id')).rejects.toStrictEqual(new ResourceNotFoundError);
  });

});

describe('create', () => {
  beforeEach(() => {
    fakeRepo = new Repository();
    service = new Service(fakeRepo);
    uuid
  });

  test('Give user id Should return new room id', async () => {
    uuid.mockReturnValue('new-room-id');
    const result = await service.create('user-id');
    expect(fakeRepo.create).toHaveBeenCalledWith('user-id', 'new-room-id')
    expect(result).toStrictEqual({ id: 'new-room-id' });
  });
});
