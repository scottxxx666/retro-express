export default class Repository {
  constructor(documentClient){
    this.docClient = documentClient;
  }
  async getId(platform, openId) {
    const params = {
      TableName: 'retrospectives',
      KeyConditionExpression: 'pk = :openId and sk = :platform',
      ExpressionAttributeValues: {
        ':openId': openId,
        ':platform': platform,
      },
    };
    const data= await this.docClient.query(params).promise();
    return data.Count === 0 ? null : data.Items[0].pk;
  }
  async create(platform, openId, id) {
    const params = {
      TableName: 'retrospectives',
      Item: {
        'pk': openId,
        'sk': platform,
        'userId': id,
      }
    };
    await this.docClient.put(params).promise();
    return id;
  }
}