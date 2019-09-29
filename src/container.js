import Bottle from 'bottlejs';
import UserRepository from './services/user/repository';
import UserService from './services/user';
import JwtService from './services/jwt';

export default function (req, res, next) {
  const bottle = new Bottle();
  bottle.service('userRepo', UserRepository);
  bottle.service('jwtService', JwtService);
  bottle.factory('userService', (container) => new UserService(container.userRepo, container.jwtService));
  req.container = bottle.container;
  next();
}
