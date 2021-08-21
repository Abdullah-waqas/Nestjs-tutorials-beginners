import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { HttpExceptionFilter } from './http-exception.filter';
import { LoggingInterceptor } from './logging.interceptor';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/entities/User';
import { SuperAdminService } from './SuperAdmin.service';
import SuperAdmin from 'src/entities/SuperAdmin';
import { DoctorService } from './Doctor.service';
import Doctor from 'src/entities/Doctor';
import { StaffService } from './Staff.service';
import Staff from 'src/entities/Staff';
import { PatientService } from './Patient.service';
import Patient from 'src/entities/Patient';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([SuperAdmin]),
    TypeOrmModule.forFeature([Doctor]),
    TypeOrmModule.forFeature([Staff]),
    TypeOrmModule.forFeature([Patient]),
  ],
  providers: [
    UserService,
    SuperAdminService,
    DoctorService,
    StaffService,
    PatientService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    }
  ],
  exports: [UserService, SuperAdminService, DoctorService, StaffService, PatientService],
})
export class SharedModule { }
