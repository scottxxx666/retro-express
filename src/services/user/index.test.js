import Service from './index';
import Repository from './repository';

jest.mock('./repository');

describe('Login', () => {
  let fakeRepo;
  let fakeJwt;
  let service;

  beforeEach(() => {
    fakeRepo = new Repository();
    fakeJwt = { sign: jest.fn(), };
    service = new Service(fakeRepo, fakeJwt);
  });

  test('Return jwt token if success', async () => {
    fakeJwt.sign.mockReturnValueOnce('jwt-token');
    const result = await service.login();
    expect(result).toBe('jwt-token');
  });

  test('Given existed open id Then return token contains user id', async () => {
    fakeRepo.getId.mockReturnValueOnce('user-id');
    await service.login('platform', 'open-id');
    expect(fakeRepo.getId).toHaveBeenCalledWith('platform', 'open-id');
    expect(fakeJwt.sign).toHaveBeenCalledWith({ id: 'user-id' });
  });

  test('Given new open id Then return token contains new user id', async () => {
    fakeRepo.getId.mockReturnValueOnce(null);
    fakeRepo.create.mockReturnValueOnce('new-user-id');
    await service.login('platform', 'new-open-id');
    expect(fakeJwt.sign).toHaveBeenCalledWith({ id: 'new-user-id' });
  });

});
