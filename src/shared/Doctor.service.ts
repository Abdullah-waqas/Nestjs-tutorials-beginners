import { HttpException, HttpStatus, Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LoginDoctorDTO, RegisterDoctorDTO } from '../auth/auth.dto';
import { Repository } from 'typeorm';
import Doctor from 'src/entities/Doctor';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DoctorService {
    constructor(@InjectRepository(Doctor) private doctorRepo: Repository<Doctor>) { }

    // user register
    async create(userDTO: RegisterDoctorDTO): Promise<Doctor> {
        try {
            const { firstName, lastName, address, password } = userDTO;
            const user = await this.doctorRepo.findOne({ firstName });
            if (user) {
                throw new HttpException('Doctor already exists', HttpStatus.BAD_REQUEST);
            }

            const newUser = new Doctor();
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
            return await this.doctorRepo.save(newUser);
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    async findByLogin(userDTO: LoginDoctorDTO) {
        const { firstName, lastName, password } = userDTO;
        const user = await this.doctorRepo.findOne({ firstName, lastName });
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
        return from(this.doctorRepo.findOne({ id })).pipe(
            map((user: any) => {
                const { password, ...result } = user;
                return result;
            })
        )
    }

    sanitizeUser(user: Doctor) {
        const obj = { ...user };
        delete obj['password'];
        return obj;
    }
}
