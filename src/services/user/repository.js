import User from './user';

export default class Repository {
  async getId(platform, openId) {
    const document = await User.findOne({ platform, openId });
    return document === null ? null : document.id;
  }

  async create(platform, openId, id) {
    await User.create({ platform, openId, id });
    return id;
  }
}
