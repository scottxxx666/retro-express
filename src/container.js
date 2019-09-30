import Bottle from 'bottlejs';
import UserRepository from './services/user/repository';
import UserService from './services/user';
import JwtService from './services/jwt';
import AWS from './aws';

export default function (req, res, next) {
  const bottle = new Bottle();
  bottle.service('docClient', AWS.DynamoDB.DocumentClient);
  bottle.factory('userRepo', (container)=> new UserRepository(container.docClient));
  bottle.service('jwtService', JwtService);
  bottle.factory('userService', (container) => new UserService(container.userRepo, container.jwtService));
  req.container = bottle.container;
  next();
}
