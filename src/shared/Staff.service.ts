import { HttpException, HttpStatus, Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LoginStaffDTO, RegisterStaffDTO } from '../auth/auth.dto';
import { Repository } from 'typeorm';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Staff from 'src/entities/Staff';

@Injectable()
export class StaffService {
    constructor(@InjectRepository(Staff) private staffRepo: Repository<Staff>) { }

    // user register
    async create(userDTO: RegisterStaffDTO): Promise<Staff> {
        try {
            const { firstName, lastName, address, password } = userDTO;
            const user = await this.staffRepo.findOne({ firstName });
            if (user) {
                throw new HttpException('Staff already exists', HttpStatus.BAD_REQUEST);
            }

            const newUser = new Staff();
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.address = address;
            newUser.password = password;
            newUser.isActive = false;
            /*const errors = await validate(newUser);
            if(errors && errors.length > 0){
              throw new BadRequestException(errors);
            } */
            newUser.hashPassword();
            return await this.staffRepo.save(newUser);
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    async findByLogin(userDTO: LoginStaffDTO) {
        const { firstName, lastName, password } = userDTO;
        const user = await this.staffRepo.findOne({ firstName, lastName });
        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        if (user.checkIfUnencryptedPasswordIsValid(password)) {
            return this.sanitizeUser(user);
        } else {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }

    findOne(id: number): Observable<any> {
        return from(this.staffRepo.findOne({ id })).pipe(
            map((user: any) => {
                const { password, ...result } = user;
                return result;
            })
        )
    }

    sanitizeUser(user: Staff) {
        const obj = { ...user };
        delete obj['password'];
        return obj;
    }
}
