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
}