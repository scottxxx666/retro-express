export default class Repository {
  _tableName = 'Retrospectives';
  _roomPrefix = 'Room_';
  _stagePrefix = 'Stage_';
  _cardPrefix = 'Card_';
  _userPrefix = 'User_';
  _likePostfix = 'Like';

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
      }
    };
    return await this._client.query(params).promise();
  }

  async create(roomId, stageId, id, userId, content) {
    const params = {
      TableName: this._tableName,
      Item: {
        pk: this._roomPrefix + roomId,
        sk: `${this._stagePrefix + stageId}#${this._cardPrefix}${id}`,
        userId: userId,
        content: content,
        likes: 0,
        unlikes: 0,
      }
    };
    await this._client.put(params).promise();
    return id;
  }

  async like(roomId, stageId, cardId, userId) {
    const params = {
      TransactItems: [
        {
          Update: {
            TableName: this._tableName,
            Key: {
              pk: this._roomPrefix + roomId,
              sk: `${this._stagePrefix + stageId}#${this._cardPrefix}${cardId}`,
            },
            UpdateExpression: 'set likes = likes + :val',
            ExpressionAttributeValues: {
              ':val': 1
            },
          }
        }, {
          Put: {
            TableName: this._tableName,
            Item: {
              pk: `${this._roomPrefix + roomId}#${this._stagePrefix}${stageId}#${this._userPrefix}${userId}#${this._likePostfix}`,
              sk: this._cardPrefix + cardId,
            }
          }
        }
      ]
    };
    return await this._client.transactWrite(params).promise();
  }

  async unlike(roomId, stageId, cardId, userId) {
    const params = {
        TransactItems: [
          {
            Update: {
              TableName: this._tableName,
              Key: {
                pk: this._roomPrefix + roomId,
                sk: `${this._stagePrefix + stageId}#${this._cardPrefix}${cardId}`,
              },
              UpdateExpression: 'set likes = likes + :val',
              ExpressionAttributeValues: {
                ':val': -1
              },
            }
          }, {
            Delete: {
              TableName: this._tableName,
              Key: {
                pk: `${this._roomPrefix + roomId}#${this._stagePrefix}${stageId}#${this._userPrefix}${userId}#${this._likePostfix}`,
                sk:
                  this._cardPrefix + cardId,
              }
            }
          }
        ]
      }
    ;
    return await this._client.transactWrite(params).promise();
  }

  async alreadyVote(roomId, stageId, cardId, userId) {
    const params = {
      TableName: this._tableName,
      KeyConditionExpression: 'pk = :pk and sk = :sk',
      ExpressionAttributeValues: {
        ':pk': `${this._roomPrefix + roomId}#${this._stagePrefix}${stageId}#${this._userPrefix}${userId}#${this._likePostfix}`,
        ':sk': this._cardPrefix + cardId,
      }
    };
    const result = await this._client.query(params).promise();
    return result.Count >= 1;
  }

  async countVote(roomId, stageId, userId) {
    const params = {
      TableName: this._tableName,
      KeyConditionExpression: 'pk = :pk and begins_with(sk, :skPrefix)',
      ExpressionAttributeValues: {
        ':pk': `${this._roomPrefix + roomId}#${this._stagePrefix}${stageId}#${this._userPrefix}${userId}#${this._likePostfix}`,
        ':skPrefix': this._cardPrefix,
      }
    };
    return (await this._client.query(params).promise()).Count;
  }
}