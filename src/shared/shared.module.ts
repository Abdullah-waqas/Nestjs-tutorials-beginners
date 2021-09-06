import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { HttpExceptionFilter } from './http-exception.filter';
import { LoggingInterceptor } from './logging.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperAdminService } from './SuperAdmin.service';
import SuperAdmin from 'src/entities/SuperAdmin';
import Roles from 'src/entities/Roles';
import Users from 'src/entities/Users';
import UsersAppointment from 'src/entities/UsersAppointment';
import UsersPermission from 'src/entities/UsersPermission';
import Permissions from 'src/entities/Permissions';
import { UsersService } from './Users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SuperAdmin]),
    TypeOrmModule.forFeature([Permissions]),
    TypeOrmModule.forFeature([Roles]),
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forFeature([UsersAppointment]),
    TypeOrmModule.forFeature([UsersPermission]),
  ],
  providers: [
    SuperAdminService,
    UsersService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  exports: [SuperAdminService, UsersService],
})
export class SharedModule {}
