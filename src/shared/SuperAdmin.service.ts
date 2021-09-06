import { HttpException, HttpStatus, Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection } from "typeorm";
import { getManager } from 'typeorm';
import { AssignPermissionDTO, LoginAdminDTO, RegisterAdminDTO } from '../auth/auth.dto';
import { Repository } from 'typeorm';
import SuperAdmin from '../entities/SuperAdmin';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Doctor from 'src/entities/Doctor';
import Staff from 'src/entities/Staff';
import Patient from 'src/entities/Patient';
import Users from 'src/entities/Users';
import UsersPermission from 'src/entities/UsersPermission';

@Injectable()
export class SuperAdminService {
  constructor(
    @InjectRepository(SuperAdmin) private adminRepo: Repository<SuperAdmin>,
    @InjectRepository(Users) private usersRepo: Repository<Users>,
    @InjectRepository(Doctor) private doctorRepo: Repository<Doctor>,
    @InjectRepository(Staff) private staffRepo: Repository<Staff>,
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
    @InjectRepository(UsersPermission) private usersPermissionRepo: Repository<UsersPermission>
  ) { }

  // user register
  async create(userDTO: RegisterAdminDTO): Promise<SuperAdmin> {
    try {
      const { firstName, lastName, address, password } = userDTO;
      const user = await this.adminRepo.findOne({ firstName });
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
      return await this.adminRepo.save(newUser);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  // async findByUserName(username: string): Promise<User> {
  //   try {
  //     const user = await this.adminRepo.findOne({ username });
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
    const user = await this.adminRepo.findOne({ firstName, lastName });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    if (user.checkIfUnencryptedPasswordIsValid(password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  async activateUser(id: number) {
    const user = await this.adminRepo.findOne({ id: id });
    if (!user) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
    // return this.adminRepo.save({ id: Number(id), isActive: false });
    return await getConnection()
      .createQueryBuilder()
      .update(Users)
      .set({
        isActive: true,
      })
      .where("id = :id", { id: id })
      .execute();
  }

  async assignPermission(assignPermDTO: AssignPermissionDTO) {
    const user = await this.usersRepo.findOne({ id: assignPermDTO.userId });
    if (!user) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
    // return this.adminRepo.save({ id: Number(id), isActive: false });
    return await this.usersPermissionRepo.save({
      userId: assignPermDTO.userId,
      permissionId: assignPermDTO.permissionId,
    });
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
      // const [doctors, patients, staff] = await [
      //   await this.doctorRepo.query('Select id, firstName, lastName, address, isActive from doctor'),
      //   await this.patientRepo.query('Select id, firstName, lastName, address, isActive from patient'),
      //   await this.staffRepo.query('Select id, firstName, lastName, address, isActive from staff'),
      // ];
      // return { patients, doctors, staff };
      const entityManager = getManager();
      const users = await entityManager.query('  select users.id, users.roleId, users.firstName, users.lastName, roles.type, users.address, users.isActive from users LEFT join roles on users.roleId = roles.id');
      console.log('//////////');
      console.log(users);
      return users;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  // async getAllUsers(): Promise<{
  //   patients: {
  //     id: number,
  //     firstName: string,
  //     lastName: string,
  //     address: string,
  //     isActive: number
  //   },
  //   doctors: {
  //     id: number,
  //     firstName: string,
  //     lastName: string,
  //     address: string,
  //     isActive: number
  //   },
  //   staff: {
  //     id: number,
  //     firstName: string,
  //     lastName: string,
  //     address: string,
  //     isActive: number
  //   }
  // }> {
  //   try {
  //     // const [doctors, patients, staff] = await [
  //     //   await this.doctorRepo.query('Select id, firstName, lastName, address, isActive from doctor'),
  //     //   await this.patientRepo.query('Select id, firstName, lastName, address, isActive from patient'),
  //     //   await this.staffRepo.query('Select id, firstName, lastName, address, isActive from staff'),
  //     // ];
  //     // return { patients, doctors, staff };
  //     const users = await this.doctorRepo.query('  select users.id, users.roleId, users.firstName, users.lastName, roles.type, users.address, users.isActive from users LEFT join roles on users.roleId = roles.id')
  //     console.log('//////////')
  //     console.log(users);
  //     return users;
  //   } catch (err) {
  //     throw new BadRequestException(err);
  //   }
  // }


  // findOne(id: number): Observable<any> {
  //   return from(this.adminRepo.findOne({ id })).pipe(
  //     map((user: any) => {
  //       const { password, ...result } = user;
  //       return result;
  //     })
  //   )
  // }

  findOne(id: number): Promise<any> {
    return this.adminRepo.findOne({ id })
  }

  sanitizeUser(user: SuperAdmin) {
    const obj = { ...user };
    delete obj['password'];
    return obj;
  }
}
