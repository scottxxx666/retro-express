export default class Repository {
  _tableName = 'retrospectives';
  _pkPrefix = 'ROOM-';
  _skPrefix = 'STAGE-';
  _cardPrefix = '-CARD-';

  constructor(documentClient) {
    this._client = documentClient;
  }

  async list(roomId, stageId) {
    const params = {
      TableName: this._tableName,
      KeyConditionExpression: 'pk = :roomId and begins_with(sk, :stageId)',
      ExpressionAttributeValues: {
        ':roomId': this._pkPrefix + roomId,
        ':stageId': this._skPrefix + stageId + this._cardPrefix,
      }
    };
    return await this._client.query(params).promise();
  }

  async create(roomId, stageId, id, userId, content) {
    const params = {
      TableName: this._tableName,
      Item: {
        pk: this._pkPrefix + roomId,
        sk: this._skPrefix + stageId + this._cardPrefix + id,
        userId: userId,
        content: content,
        likes: 0,
        unlikes: 0,
      }
    };
    await this._client.put(params).promise();
    return id;
  }
}