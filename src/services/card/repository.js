export default class Repository {
  _tableName = 'Retrospectives';

  _roomPrefix = 'Room_';

  _stagePrefix = 'Stage_';

  _cardPrefix = 'Card_';

  constructor(documentClient) {
    this._client = documentClient;
  }

  async list(roomId, stageId) {
    const params = {
      TableName: this._tableName,
      KeyConditionExpression: 'pk = :roomId and begins_with(sk, :stageId)',
      ExpressionAttributeValues: {
        ':roomId': this._roomPrefix + roomId,
        ':stageId': `${this._stagePrefix + stageId}#${this._cardPrefix}`,
      },
    };
    return await this._client.query(params).promise();
  }

  async create(roomId, stageId, id, userId, content) {
    const params = {
      TableName: this._tableName,
      Item: {
        pk: this._roomPrefix + roomId,
        sk: `${this._stagePrefix + stageId}#${this._cardPrefix}${id}`,
        userId,
        content,
        likes: 0,
        unlikes: 0,
      },
    };
    await this._client.put(params).promise();
    return id;
  }

}
