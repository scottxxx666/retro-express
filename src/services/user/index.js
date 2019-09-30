export default class UserService {
  constructor(userRepo, jwt) {
    this.userRepo = userRepo;
    this.jwt = jwt;
  }
  async login(openId, platform) {
    const id = await this.userRepo.getId(platform, openId);
    if (id === null) {
      return await this.userRepo.create(platform, openId, 'uid');
    }
    return this.jwt.sign({id});
  }
}