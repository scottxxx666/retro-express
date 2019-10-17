import uuid from '../../utils/uuid';

export default class Service {
  constructor(userRepo, jwt) {
    this.repo = userRepo;
    this.jwt = jwt;
  }

  async login(platform, openId) {
    let id = await this.repo.getId(platform, openId);
    if (id === null) {
      id = await this.repo.create(platform, openId, uuid());
    }
    return this.jwt.sign({ id });
  }
}