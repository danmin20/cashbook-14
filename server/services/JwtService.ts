import { User } from '../models/user';
import * as jwt from 'jsonwebtoken';

class JwtService {
  generate(user: any) {
    console.log(user);
    const token = jwt.sign({ ...user }, 'asdfasdf', {
      expiresIn: '3000000h',
    });
    return token;
  }

  verify(token: string) {
    return jwt.verify(token, 'asdfasdf') as User;
  }
}

export default new JwtService();
