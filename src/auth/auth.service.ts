import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import { UserService } from '../shared/user.service';
import { LoginAdminPayload, Payload } from '../types/payload';
import User from 'src/entities/User';
import { LoginDoctorDTO, LoginStaffDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) { }

  async signPayload(payload: Payload | LoginAdminPayload | LoginDoctorDTO | LoginStaffDTO) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '12h' });
  }

  async validateUser(payload: Payload): Promise<User> {
    return await this.userService.findByUserName(payload.username)
  }
}
