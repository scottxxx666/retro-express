export default class Repository {
  _tableName = 'Retrospectives';

  _pkPrefix = 'Room_';

  _hostPrefix = 'Host_';

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
            sk: `CreatedAt_${new Date().toISOString()}`,
            room: roomId,
          },
        },
      }, {
        Put: {
          TableName: this._tableName,
          Item: {
            pk: this._pkPrefix + roomId,
            sk: this._hostPrefix + userId,
            currentStage: 0,
            stages: ['Went well', 'To Improve', 'Action Items'],
          },
        },
      }],
    };
    return await this._client.transactWrite(params).promise();
  }

  async find(roomId) {
    const params = {
      TableName: this._tableName,
      KeyConditionExpression: 'pk = :roomId and begins_with(sk, :hostPrefix)',
      ExpressionAttributeValues: {
        ':roomId': this._pkPrefix + roomId,
        ':hostPrefix': this._hostPrefix,
      },
    };
    const { stages, currentStage } = await this._client.find(params);
    return { stages, currentStage };
  }
}
