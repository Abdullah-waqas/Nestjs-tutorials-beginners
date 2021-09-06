import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { LoginAdminPayload, Payload } from '../types/payload';

@Injectable()
export class AuthService {
  constructor() { }

  async signPayload(payload: Payload | LoginAdminPayload ) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '12h' });
  }

  // async validateUser(payload: Payload): Promise<User> {
  //   return await this.userService.findByUserName(payload.username)
  // }
}
