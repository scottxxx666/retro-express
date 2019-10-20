export default class Repository {
  _tableName = 'Retrospectives';

  _pkPrefix = 'OpenId_';

  constructor(documentClient) {
    this._client = documentClient;
  }

  async getId(platform, openId) {
    const params = {
      TableName: this._tableName,
      Key: {
        pk: this._pkPrefix + openId,
        sk: platform,
      },
    };
    const data = await this._client.get(params).promise();
    return data.hasOwnProperty('Item') ? data.Item.userId : null;
  }

  async create(platform, openId, id) {
    const params = {
      TableName: this._tableName,
      Item: {
        pk: this._pkPrefix + openId,
        sk: platform,
        userId: id,
      },
    };
    await this._client.put(params).promise();
    return id;
  }
}
