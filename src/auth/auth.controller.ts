import { Body, Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/guards/admin.guard';
import { DoctorService } from 'src/shared/Doctor.service';
import { PatientService } from 'src/shared/Patient.service';
import { StaffService } from 'src/shared/Staff.service';
import { SuperAdminService } from 'src/shared/SuperAdmin.service';

import { UserService } from '../shared/user.service';
import { LoginAdminPayload, LoginDoctorPayload, LoginPatientPayload, LoginStaffPayload, Payload } from '../types/payload';
import { LoginAdminDTO, LoginDoctorDTO, LoginDTO, LoginPatientDTO, LoginStaffDTO, RegisterAdminDTO, RegisterDoctorDTO, RegisterDTO, RegisterPatientDTO, RegisterStaffDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private superAdminService: SuperAdminService,
    private doctorService: DoctorService,
    private staffService: StaffService,
    private patientService: PatientService,
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

  // Doctor
  @Post('register/doctor')
  async registerDoctor(@Body() userDTO: RegisterDoctorDTO) {
    const user = await this.doctorService.create(userDTO);
    return { 'message': 'Doctor created successfully' };
  }
  @Post('login/doctor')
  async loginDoctor(@Body() userDTO: LoginDoctorDTO) {
    const user = await this.doctorService.findByLogin(userDTO);
    const payload: LoginDoctorPayload = {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      id: user.id,
    };
    const token = await this.authService.signPayload(payload);
    return { token };
  }

  // Staff
  @Post('register/staff')
  async registerStaff(@Body() userDTO: RegisterStaffDTO) {
    const user = await this.staffService.create(userDTO);
    return { 'message': 'Staff created successfully' };
  }
  @Post('login/staff')
  async loginStaff(@Body() userDTO: LoginStaffDTO) {
    const user = await this.staffService.findByLogin(userDTO);
    const payload: LoginStaffPayload = {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      id: user.id,
    };
    const token = await this.authService.signPayload(payload);
    return { token };
  }

  // Patient
  @Post('register/patient')
  async registerPatient(@Body() userDTO: RegisterPatientDTO) {
    const user = await this.patientService.create(userDTO);
    return { 'message': 'Patient created successfully' };
  }
  @Post('login/patient')
  async loginPatient(@Body() userDTO: LoginPatientDTO) {
    const user = await this.patientService.findByLogin(userDTO);
    const payload: LoginPatientPayload = {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      id: user.id,
    };
    const token = await this.authService.signPayload(payload);
    return { token };
  }

  @Get('users')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async getAllUsers(@Request() req) {
    console.log('*****')
    console.log(req);
    const { patients, doctors, staff } = await this.superAdminService.getAllUsers();
    return { patients, doctors, staff };
  }

  // Activate users => superadmin
  // @Post('activate/staff')
  // @Post('activate/doctor')
  // @Post('activate/patient')

  // Assign permissions => admin
  // @Post('add/permission')

  // Create appointment
}
