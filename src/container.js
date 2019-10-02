import Bottle from 'bottlejs';
import UserRepository from './services/user/repository';
import RoomRepository from './services/room/repository';
import UserService from './services/user';
import RoomService from './services/room';
import JwtService from './services/jwt';
import AWS from './aws';

export default function (req, res, next) {
  const bottle = new Bottle();
  bottle.service('docClient', AWS.DynamoDB.DocumentClient);
  bottle.factory('userRepo', (container) => new UserRepository(container.docClient));
  bottle.factory('roomRepo', (container) => new RoomRepository(container.docClient));
  bottle.service('jwtService', JwtService);
  bottle.factory('userService', (container) => new UserService(container.userRepo, container.jwtService));
  bottle.factory('roomService', (container) => new RoomService(container.roomRepo));
  req.container = bottle.container;
  next();
}
