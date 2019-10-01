export default class Repository {
  constructor(documentClient) {
    this.docClient = documentClient;
  }

  async getId(platform, openId) {
    const params = {
      TableName: 'retrospectives',
      Key: {
        'pk': 'OPEN-ID-' + openId,
        'sk': platform,
      }
    };
    const data = await this.docClient.get(params).promise();
    return data.hasOwnProperty('Item') ? data.Item : null;
  }

  async create(platform, openId, id) {
    const params = {
      TableName: 'retrospectives',
      Item: {
        'pk': 'OPEN-ID-' + openId,
        'sk': platform,
        'userId': id,
      }
    };
    await this.docClient.put(params).promise();
    return id;
  }
}