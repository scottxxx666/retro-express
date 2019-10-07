import uuid from '../../utils/uuid';

export default class Service {
  constructor(cardRepo) {
    this._repo = cardRepo;
  }

  async list(roomId, stageId) {
    const { Items: data, Count: count } = await this._repo.list(roomId, stageId);
    return { data, count };
  }

  async create(roomId, stageId, userId, content) {
    const id = uuid();
    await this._repo.create(roomId, stageId, id, userId, content);
    return { id };
  }
}