import Bottle from 'bottlejs';
import UserRepository from './services/user/repository';
import RoomRepository from './services/room/repository';
import CardRepository from './services/card/repository';
import LikeRepository from './services/card/like-repository';
import UserService from './services/user';
import RoomService from './services/room';
import CardService from './services/card';
import JwtService from './services/jwt';
import docClient from './utils/client';

export default function (req, res, next) {
  const bottle = new Bottle();
  bottle.service('docClient', docClient);
  bottle.factory('userRepo', () => new UserRepository());
  bottle.factory('roomRepo', (container) => new RoomRepository(container.docClient));
  bottle.factory('cardRepo', (container) => new CardRepository(container.docClient));
  bottle.factory('likeRepo', (container) => new LikeRepository(container.docClient));
  bottle.service('jwtService', () => JwtService);
  bottle.factory('userService', (container) => new UserService(container.userRepo, container.jwtService));
  bottle.factory('roomService', (container) => new RoomService(container.roomRepo));
  bottle.factory('cardService', (container) => new CardService(container.cardRepo, container.likeRepo));
  req.container = bottle.container;
  next();
}
