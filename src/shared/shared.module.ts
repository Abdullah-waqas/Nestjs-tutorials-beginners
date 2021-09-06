import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { HttpExceptionFilter } from './http-exception.filter';
import { LoggingInterceptor } from './logging.interceptor';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/entities/User';
import { SuperAdminService } from './SuperAdmin.service';
import SuperAdmin from 'src/entities/SuperAdmin';
import Doctor from 'src/entities/Doctor';
import Staff from 'src/entities/Staff';
import Patient from 'src/entities/Patient';
import Roles from 'src/entities/Roles';
import Users from 'src/entities/Users';
import UsersAppointment from 'src/entities/UsersAppointment';
import UsersPermission from 'src/entities/UsersPermission';
import Permissions from 'src/entities/Permissions';
import { UsersService } from './Users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([SuperAdmin]),
    TypeOrmModule.forFeature([Doctor]),
    TypeOrmModule.forFeature([Staff]),
    TypeOrmModule.forFeature([Patient]),

    TypeOrmModule.forFeature([Permissions]),
    TypeOrmModule.forFeature([Roles]),
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forFeature([UsersAppointment]),
    TypeOrmModule.forFeature([UsersPermission]),
  ],
  providers: [
    UserService,
    SuperAdminService,
    UsersService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    }
  ],
  exports: [UserService, SuperAdminService, UsersService],
})
export class SharedModule { }
