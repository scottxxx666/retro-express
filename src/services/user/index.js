export default class UserService {
  constructor(userRepo, jwt) {
    this.userRepo = userRepo;
    this.jwt = jwt;
  }
  login(openId) {
    const member = this.userRepo.find(openId);
    return this.jwt.sign({member});
  }
}