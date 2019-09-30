import uuid from 'uuid/v4';

export default class UserService {
  constructor(userRepo, jwt) {
    this.userRepo = userRepo;
    this.jwt = jwt;
  }

  async login(openId, platform) {
    let id = await this.userRepo.getId(platform, openId);
    if (id === null) {
      id = await this.userRepo.create(platform, openId, uuid());
    }
    return this.jwt.sign({ id });
  }
}