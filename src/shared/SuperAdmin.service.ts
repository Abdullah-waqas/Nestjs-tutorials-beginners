import { HttpException, HttpStatus, Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection } from "typeorm";
import { getManager } from 'typeorm';
import { AssignPermissionDTO, LoginAdminDTO, RegisterAdminDTO } from '../auth/auth.dto';
import { Repository } from 'typeorm';
import SuperAdmin from '../entities/SuperAdmin';
import Users from 'src/entities/Users';
import UsersPermission from 'src/entities/UsersPermission';

@Injectable()
export class SuperAdminService {
  constructor(
    @InjectRepository(SuperAdmin) private adminRepo: Repository<SuperAdmin>,
    @InjectRepository(Users) private usersRepo: Repository<Users>,
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
      const entityManager = getManager();
      const users = await entityManager.query('  select users.id, users.roleId, users.firstName, users.lastName, roles.type, users.address, users.isActive from users LEFT join roles on users.roleId = roles.id');
      return users;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  findOne(id: number): Promise<any> {
    return this.adminRepo.findOne({ id })
  }

  sanitizeUser(user: SuperAdmin) {
    const obj = { ...user };
    delete obj['password'];
    return obj;
  }
}
