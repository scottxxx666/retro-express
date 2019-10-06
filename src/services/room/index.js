import uuid from '../../utils/uuid';

export default class Service {
  constructor(roomRepo) {
    this._repo = roomRepo;
  }

  async create(userId) {
    const id = uuid();
    await this._repo.create(userId, id);
    return { id };
  }

  async find(roomId) {
    return await this._repo.find(roomId);
  }
}