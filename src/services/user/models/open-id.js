import dynamoose from 'dynamoose';

export default dynamoose.model('retrospectives', new dynamoose.Schema({
  // Open id, prefix: OPEN-ID
  pk: {
    type: String,
    hashKey: true,
  },
  // Platform
  sk: {
    type: String,
    rangeKey: true,
  },
  userId: {
    type: String,
  },
}));
