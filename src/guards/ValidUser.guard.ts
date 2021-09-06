import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SuperAdminService } from 'src/shared/SuperAdmin.service';
import { UsersService } from 'src/shared/Users.service';

@Injectable()
export class ValidUserGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly userService: UsersService,
        private readonly superAdminService: SuperAdminService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.body;
        const doctor = await this.userService.findOne(user.doctorId);
        const patient = await this.userService.findOne(user.patientId);
        const createdBy = await this.superAdminService.findOne(user.createdBy);
        console.log('valid userguard...')
        if (doctor && patient && createdBy) {
            return true;
        }
        return false;

    }
}