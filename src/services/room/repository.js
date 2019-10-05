export default class Repository {
  _tableName = 'retrospectives';
  _pkPrefix = 'ROOM-';
  _hostPrefix = 'HOST-';

  constructor(documentClient) {
    this._client = documentClient;
  }

  async create(userId, roomId) {
    const params = {
      TransactItems: [{
        Put: {
          TableName: this._tableName,
          Item: {
            pk: this._hostPrefix + userId,
            sk: 'CREATED-AT-' + new Date().toString(),
            room: roomId,
          }
        }
      }, {
        Put: {
          TableName: this._tableName,
          Item: {
            pk: this._pkPrefix + roomId,
            sk: this._hostPrefix + userId,
            status: 'READY',
            stages: ['Went well', 'To Improve', 'Action Items']
          }
        }
      }]
    };
    return await this._client.transactWrite(params).promise();
  }

  async find(roomId) {
    const params = {
      TableName: this._tableName,
      KeyConditionExpression: `pk = :roomId and begins_with(sk, :hostPrefix)`,
      ExpressionAttributeValues: {
        ':roomId': this._pkPrefix + roomId,
        ':hostPrefix': this._hostPrefix
      }
    };
    const { stages, status } = await this._client.list(params);
    return { stages, status };
  }
}