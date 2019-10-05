import OpenId from './models/open-id';

export default class Repository {
  _tableName = 'retrospectives';
  _pkPrefix = 'OPEN-ID-';

  async getId(platform, openId) {
    const result = await OpenId.get({ pk: this._pkPrefix + openId, sk: platform });
    return result === undefined ? null : result.userId;
  }

  async create(platform, openId, id) {
    await OpenId.create({ pk: this._pkPrefix + openId, sk: platform });
    return id;
  }
}