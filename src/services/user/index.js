import uuid from '../../utils/uuid';

export default class Service {
  constructor(userRepo, jwt) {
    this.repo = userRepo;
    this.jwt = jwt;
  }

  async login(platform, openId) {
    let user = await this.repo.find(platform, openId);
    if (user === null) {
      user = await this.repo.create(platform, openId, uuid());
    }
    return this.jwt.sign({ id: user.id });
  }
}
