import AWS from '../aws';

export default class Client extends AWS.DynamoDB.DocumentClient {
  async find(params) {
    const data = await this.query(params).promise();
    console.log(data);
    if (data.Count === 0) {
      throw Error('resource not found');
    }
    return data.Items[0];
  }
}