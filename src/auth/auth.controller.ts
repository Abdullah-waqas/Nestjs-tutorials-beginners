import { Body, Controller, Post, Get, UseGuards, Request, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { hasPermission } from 'src/decorators/permission.decorator';
import { AdminGuard } from 'src/guards/admin.guard';
import { CreateAppointmentGuard } from 'src/guards/CreateAppointment.guard';
import { AppointmentGuard } from 'src/guards/Appointment.guard';
import { SuperAdminService } from 'src/shared/SuperAdmin.service';
import { UsersService } from 'src/shared/Users.service';

import { UserService } from '../shared/user.service';
import { LoginAdminPayload, Payload } from '../types/payload';
import {
  ActivateUserParamDTO,
  AssignPermissionDTO,
  CreateAppointmentDTO,
  DeleteAppointmentParamDTO,
  LoginAdminDTO,
  LoginDTO,
  LoginUserDTO,
  PermissionsEnum,
  RegisterAdminDTO,
  RegisterDTO,
  RegisterUserDTO,
  UpdateAppointmentDTO
} from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private superAdminService: SuperAdminService,
    private usersService: UsersService,
  ) { }

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.findByLogin(userDTO);
    const payload: Payload = {
      username: user.username
    };
    const token = await this.authService.signPayload(payload);
    return { token };
  }

  @Post('register')
  async register(@Body() userDTO: RegisterDTO) {
    const user = await this.userService.create(userDTO);
    return { 'message': 'user created successfully' };
  }

  // Superadmin
  @Post('register/admin')
  async registerAdmin(@Body() userDTO: RegisterAdminDTO) {
    const user = await this.superAdminService.create(userDTO);
    return { 'message': 'admin created successfully' };
  }
  @Post('login/admin')
  async loginAdmin(@Body() userDTO: LoginAdminDTO) {
    const user = await this.superAdminService.findByLogin(userDTO);
    const payload: LoginAdminPayload = {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      id: user.id,
    };
    const token = await this.authService.signPayload(payload);
    return { token };
  }


  // Users
  @Post('register/user')
  async registerUser(@Body() userDTO: RegisterUserDTO) {
    const user = await this.usersService.create(userDTO);
    return { 'message': 'User created successfully' };
  }
  @Post('login/user')
  async loginUser(@Body() userDTO: LoginUserDTO) {
    const user = await this.usersService.findByLogin(userDTO);
    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      id: user.id,
      roleId: user.roleId,
      type: user.type,
      isActive: user.isActive
    };
    const token = await this.authService.signPayload(payload);
    return { token };
  }

  @Get('users')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async getAllUsers(@Request() req) {
    return await this.superAdminService.getAllUsers();
  }

  @Post('activate/user/:userId')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async activateUser(@Param() param: ActivateUserParamDTO) {
    return await this.superAdminService.activateUser(param.userId);
  }


  @Post('assign/permissions')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async assignPermissions(@Body() assignPermDTO: AssignPermissionDTO) {
    return await this.superAdminService.assignPermission(assignPermDTO);
  }

  // Create Appointment
  @hasPermission(PermissionsEnum.CREATE_APPOINTMENT)
  @Post('create/appointment')
  @UseGuards(AuthGuard('jwt'), CreateAppointmentGuard)
  async createAppointment(@Body() assignPermDTO: CreateAppointmentDTO) {
    return await this.usersService.createAppointment(assignPermDTO);
  }

  // Delete Appointment
  @hasPermission(PermissionsEnum.DELETE_APPOINTMENT)
  @Delete('delete/appointment/:appointmentId')
  @UseGuards(AuthGuard('jwt'), AppointmentGuard)
  async deleteAppointment(@Param() assignPermDTO: DeleteAppointmentParamDTO) {
    return await this.usersService.deleteAppointment(Number(assignPermDTO.appointmentId));
  }

  // View Appointments
  @hasPermission(PermissionsEnum.VIEW_APPOINTMENT)
  @Get('get/appointments')
  @UseGuards(AuthGuard('jwt'), AppointmentGuard)
  async getAppointment() {
    return await this.usersService.getAppointments();
  }

  // Update appointment
   @hasPermission(PermissionsEnum.UPDATE_APPOINTMENT)
   @Post('update/appointment')
   @UseGuards(AuthGuard('jwt'), CreateAppointmentGuard)
   async updateAppointment(@Body() updateAppointmentDto: UpdateAppointmentDTO) {
     return await this.usersService.updateAppointment(updateAppointmentDto);
   }
}
