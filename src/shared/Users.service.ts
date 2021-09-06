import { HttpException, HttpStatus, Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateAppointmentDTO, LoginUserDTO, RegisterUserDTO, UpdateAppointmentDTO } from '../auth/auth.dto';
import { Repository } from 'typeorm';
import Users from 'src/entities/Users';
import Roles from 'src/entities/Roles';
import UsersPermission from 'src/entities/UsersPermission';
import UsersAppointment from 'src/entities/UsersAppointment';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private usersRepo: Repository<Users>,
        @InjectRepository(Roles) private usersRoles: Repository<Roles>,
        @InjectRepository(UsersPermission) private usersPermissions: Repository<UsersPermission>,
        @InjectRepository(UsersAppointment) private usersAppointment: Repository<UsersAppointment>,
    ) { }

    // user register
    async create(userDTO: RegisterUserDTO): Promise<Users> {
        try {
            const { firstName, lastName, address, password, roleId } = userDTO;
            const user = await this.usersRepo.findOne({ firstName });
            if (user) {
                throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
            }

            const newUser = new Users();
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.address = address;
            newUser.password = password;
            newUser.isActive = false;
            newUser.roleId = roleId;
            newUser.hashPassword();
            return await this.usersRepo.save(newUser);
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    async findByLogin(userDTO: LoginUserDTO) {
        const { firstName, lastName, password } = userDTO;
        const user = await this.usersRepo.findOne({ firstName, lastName });
        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        if (user.checkIfUnencryptedPasswordIsValid(password)) {
            const role = await this.usersRoles.findOne({ id: user.roleId });
            console.log(role);
            return { ...this.sanitizeUser(user), ...{ type: role.type } };
        } else {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }

    // findOne(id: number): Observable<any> {
    //     return from(this.usersRepo.findOne({ id })).pipe(
    //         map((user: any) => {
    //             const { password, ...result } = user;
    //             return result;
    //         })
    //     )
    // }

    findOne(id: number): Promise<any> {
        return this.usersRepo.findOne({ id })
    }

    async hasUserPermission(userId: number, permissionId: number) {
        return await this.usersPermissions.findOne({ userId: userId, permissionId: permissionId });
    }

    async createAppointment(assignPermDTO: CreateAppointmentDTO) {
        const userAppointment = new UsersAppointment();
        userAppointment.doctorId = assignPermDTO.doctorId;
        userAppointment.patientId = assignPermDTO.patientId;
        userAppointment.createdBy = assignPermDTO.createdBy;
        userAppointment.appointmentStartDate = assignPermDTO.appointmentStartDate;
        userAppointment.appointmentEndDate = assignPermDTO.appointmentEndDate;
        return await this.usersAppointment.save(userAppointment);
    }

    async updateAppointment(assignPermDTO: UpdateAppointmentDTO) {
        const appointment = await this.usersAppointment.findOne({id: assignPermDTO.id});
        return await this.usersAppointment.save({...appointment, ...assignPermDTO});
    }

    async deleteAppointment(id: number) {
        return await this.usersAppointment.delete({ id: id });
    }

    async getAppointments() {
        return await this.usersAppointment.find();
    }



    sanitizeUser(user: Users) {
        const obj = { ...user };
        delete obj['password'];
        return obj;
    }
}
