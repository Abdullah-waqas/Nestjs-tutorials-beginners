import { HttpException, HttpStatus, Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LoginPatientDTO, RegisterPatientDTO } from '../auth/auth.dto';
import { Repository } from 'typeorm';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Patient from 'src/entities/Patient';

@Injectable()
export class PatientService {
    constructor(@InjectRepository(Patient) private patientRepo: Repository<Patient>) { }

    // user register
    async create(userDTO: RegisterPatientDTO): Promise<Patient> {
        try {
            const { firstName, lastName, address, password } = userDTO;
            const user = await this.patientRepo.findOne({ firstName });
            if (user) {
                throw new HttpException('Patient already exists', HttpStatus.BAD_REQUEST);
            }

            const newUser = new Patient();
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
            return await this.patientRepo.save(newUser);
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    async findByLogin(userDTO: LoginPatientDTO) {
        const { firstName, lastName, password } = userDTO;
        const user = await this.patientRepo.findOne({ firstName, lastName });
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
        return from(this.patientRepo.findOne({ id })).pipe(
            map((user: any) => {
                const { password, ...result } = user;
                return result;
            })
        )
    }

    sanitizeUser(user: Patient) {
        const obj = { ...user };
        delete obj['password'];
        return obj;
    }
}
