import jwt from 'jsonwebtoken';

export default class JwtService {
  static sign(data) {
    return jwt.sign({ data }, 'secret-key', { expiresIn: '1h' });
  }
}
