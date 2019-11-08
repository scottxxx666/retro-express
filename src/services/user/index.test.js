import Service from './index';
import Repository from './repository';

jest.mock('./repository');

describe('Login', () => {
  let fakeRepo;
  let fakeJwt;
  let service;

  beforeEach(() => {
    fakeRepo = new Repository();
    fakeJwt = { sign: jest.fn() };
    service = new Service(fakeRepo, fakeJwt);
  });

  test('Return jwt token if success', async () => {
    fakeJwt.sign.mockReturnValueOnce('jwt-token');
    fakeRepo.find.mockReturnValueOnce('user');
    const result = await service.login();
    expect(result).toBe('jwt-token');
  });

  test('Given existed open id Then return token contains user id', async () => {
    fakeRepo.find.mockReturnValueOnce({ id: 'user-id' });
    await service.login('platform', 'open-id');
    expect(fakeRepo.find).toHaveBeenCalledWith('platform', 'open-id');
    expect(fakeJwt.sign).toHaveBeenCalledWith({ id: 'user-id' });
  });

  test('Given new open id Then return token contains new user id', async () => {
    fakeRepo.find.mockReturnValueOnce(null);
    fakeRepo.create.mockReturnValueOnce({ id: 'new-user-id' });
    await service.login('platform', 'new-open-id');
    expect(fakeJwt.sign).toHaveBeenCalledWith({ id: 'new-user-id' });
  });

});
