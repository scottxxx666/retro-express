import AWS from '../aws';
import ResourceNotFoundError from '../errors/resource-not-found';

export default class Client extends AWS.DynamoDB.DocumentClient {
  async find(params) {
    const data = await this.query(params).promise();
    if (data.Count === 0) {
      throw new ResourceNotFoundError();
    }
    return data.Items[0];
  }
}