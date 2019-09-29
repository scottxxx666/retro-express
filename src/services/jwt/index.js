import jwt from 'jsonwebtoken';

export default class JwtService {
  sign(data) {
    return jwt.sign({data}, 'secret-key', {expiresIn: '1h'});
  }
}