export default class Repository {
  _tableName = 'retrospectives';
  _pkPrefix = 'ROOM-';

  constructor(documentClient) {
    this._client = documentClient;
  }

  async create(userId, roomId) {
    const params = {
      TransactItems: [{
        Put: {
          TableName: this._tableName,
          Item: {
            pk: 'HOST-' + userId,
            sk: new Date().toString(),
            room: roomId,
          }
        }
      }, {
        Put: {
          TableName: this._tableName,
          Item: {
            pk: this._pkPrefix + roomId,
            sk: userId,
            status: 'READY',
            columns: ['Went well', 'To Improve', 'Action Items']
          }
        }
      }]
    };
    return await this._client.transactWrite(params).promise();
  }
}