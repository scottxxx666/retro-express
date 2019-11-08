import User from './user';

export default class Repository {
  async find(platform, openId) {
    return await User.findOne({ platform, openId });
  }

  async create(platform, openId, id) {
    return await User.create({ platform, openId, id });
  }
}
