import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import SuperAdminEntity from './entities/SuperAdmin';

import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import PermissionsEntity from './entities/Permissions';
import RolesEntity from './entities/Roles';
import UsersEntity from './entities/Users';
import UsersAppointmentEntity from './entities/UsersAppointment';
import UsersPermissionEntity from './entities/UsersPermission';

@Module({
  imports: [
    DatabaseModule.forRoot({
      entities: [
        SuperAdminEntity,
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
