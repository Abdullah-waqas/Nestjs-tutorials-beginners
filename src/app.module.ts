import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import UserEntity from './entities/User';
import PostEntity from './entities/Post';
import CommnentEntity from './entities/Comment';
import SuperAdminEntity from './entities/SuperAdmin';
import StaffEntity from './entities/Staff';
import DoctorEntity from './entities/Doctor';
import PatientEntity from './entities/Patient';
import DoctorPermissionEntity from './entities/DoctorPermission';
import PatientPermissionEntity from './entities/PatientPermission';
import StaffPermissionEntity from './entities/StaffPermission';
import PermissionEntity from './entities/Permission';
import AppointmentEntity from './entities/Appointment';

import TagEntity from './entities/Tag';
import CategoryEntity from './entities/Category';

import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './post/post.controller';

import PermissionsEntity from './entities/Permissions';
import RolesEntity from './entities/Roles';
import UsersEntity from './entities/Users';
import UsersAppointmentEntity from './entities/UsersAppointment';
import UsersPermissionEntity from './entities/UsersPermission';

@Module({
  imports: [
    DatabaseModule.forRoot({
      entities: [
        PostEntity,
        UserEntity,
        CommnentEntity,
        CategoryEntity,
        TagEntity,
        SuperAdminEntity,
        StaffEntity,
        PatientEntity,
        DoctorEntity,
        PermissionEntity,
        DoctorPermissionEntity,
        StaffPermissionEntity,
        PatientPermissionEntity,
        AppointmentEntity,

        PermissionsEntity,
        RolesEntity,
        UsersEntity,
        UsersAppointmentEntity,
        UsersPermissionEntity,
      ]
    }),
    AuthModule,
    SharedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
