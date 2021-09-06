import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SuperAdminService } from 'src/shared/SuperAdmin.service';
import { UsersService } from 'src/shared/Users.service';

@Injectable()
export class CreateAppointmentGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly superAdminService: SuperAdminService,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const routePermission = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const reqBody = request.body;
    // NOTE: If user is admin
    const admin = await this.superAdminService.findOne(user.id);
    if (admin) {
      return true;
    }

    // NOTE: If all the users exist
    const doctor = await this.userService.findOne(reqBody.doctorId);
    const patient = await this.userService.findOne(reqBody.patientId);
    const createdBy = await this.userService.findOne(reqBody.createdBy);
    const active = [doctor, patient, createdBy].every(i =>
      !i ? false : i.isActive,
    );
    if (doctor && patient && createdBy && active) {
      // NOTE: get if user has permission
      const hasUserPermission = await this.userService.hasUserPermission(
        createdBy.id,
        Number(routePermission[0]),
      );
      console.log(hasUserPermission);
      if (hasUserPermission) {
        return true;
      }
      // return false;
      throw new UnauthorizedException('User has no permission');
    }
    // return false;
    throw new UnauthorizedException(`Not an active user or user doesn't exist`);
  }
}
