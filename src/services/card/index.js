import uuid from '../../utils/uuid';
import TimesLimitExceededError from '../../errors/times-limited-exceeded';

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

  async vote(roomId, stageId, cardId, userId, action) {
    const map = { LIKE: '_like', UNLIKE: '_unlike' };
    await this[map[action]](roomId, stageId, cardId, userId);
    return true;
  }

  async _like(roomId, stageId, cardId, userId) {
    if (await this._repo.alreadyVote(roomId, stageId, cardId, userId)) {
      return false;
    }
    if (await this._repo.countVote(roomId, stageId, userId) >= 3) {
      throw new TimesLimitExceededError();
    }
    return await this._repo.like(roomId, stageId, cardId, userId);
  }

  async _unlike(roomId, stageId, cardId, userId) {
    if (!await this._repo.alreadyVote(roomId, stageId, cardId, userId)) {
      return false;
    }
    return await this._repo.unlike(roomId, stageId, cardId, userId);
  }
}
