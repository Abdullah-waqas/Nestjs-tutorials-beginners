import { HttpException, HttpStatus, Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LoginAdminDTO, RegisterAdminDTO } from '../auth/auth.dto';
import { Repository } from 'typeorm';
import SuperAdmin from '../entities/SuperAdmin';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Doctor from 'src/entities/Doctor';
import Staff from 'src/entities/Staff';
import Patient from 'src/entities/Patient';

@Injectable()
export class SuperAdminService {
  constructor(
    @InjectRepository(SuperAdmin) private userRepo: Repository<SuperAdmin>,
    @InjectRepository(Doctor) private doctorRepo: Repository<Doctor>,
    @InjectRepository(Staff) private staffRepo: Repository<Staff>,
    @InjectRepository(Patient) private patientRepo: Repository<Patient>
  ) { }

  // user register
  async create(userDTO: RegisterAdminDTO): Promise<SuperAdmin> {
    try {
      const { firstName, lastName, address, password } = userDTO;
      const user = await this.userRepo.findOne({ firstName });
      if (user) {
        throw new HttpException('Admin already exists', HttpStatus.BAD_REQUEST);
      }

      const newUser = new SuperAdmin();
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.address = address;
      newUser.password = password;
      /*const errors = await validate(newUser);
      if(errors && errors.length > 0){
        throw new BadRequestException(errors);
      } */
      newUser.hashPassword();
      return await this.userRepo.save(newUser);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  // async findByUserName(username: string): Promise<User> {
  //   try {
  //     const user = await this.userRepo.findOne({ username });
  //     if (user) {
  //       throw new HttpException('User does not exist in system', HttpStatus.UNAUTHORIZED);
  //     }
  //     return user;
  //     }catch(err){
  //       throw new UnauthorizedException(err);
  //     }
  // }

  async findByLogin(userDTO: LoginAdminDTO) {
    const { firstName, lastName, password } = userDTO;
    const user = await this.userRepo.findOne({ firstName, lastName });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    if (user.checkIfUnencryptedPasswordIsValid(password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  async getAllUsers(): Promise<{
    patients: {
      id: number,
      firstName: string,
      lastName: string,
      address: string,
      isActive: number
    },
    doctors: {
      id: number,
      firstName: string,
      lastName: string,
      address: string,
      isActive: number
    },
    staff: {
      id: number,
      firstName: string,
      lastName: string,
      address: string,
      isActive: number
    }
  }> {
    try {
      const [doctors, patients, staff] = await [
        await this.doctorRepo.query('Select id, firstName, lastName, address, isActive from doctor'),
        await this.patientRepo.query('Select id, firstName, lastName, address, isActive from patient'),
        await this.staffRepo.query('Select id, firstName, lastName, address, isActive from staff'),
      ];
      return { patients, doctors, staff };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }



  // findOne(id: number): Observable<any> {
  //   return from(this.userRepo.findOne({ id })).pipe(
  //     map((user: any) => {
  //       const { password, ...result } = user;
  //       return result;
  //     })
  //   )
  // }

  findOne(id: number): Promise<any> {
    return this.userRepo.findOne({ id })
  }

  sanitizeUser(user: SuperAdmin) {
    const obj = { ...user };
    delete obj['password'];
    return obj;
  }
}
