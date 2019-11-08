import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
  platform: 'string',
  openId: 'string',
  id: 'string',
});

schema.index({ platform: 1, openId: 1 }, { unique: true });

export default mongoose.model('user', schema);
