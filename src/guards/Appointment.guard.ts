import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SuperAdminService } from 'src/shared/SuperAdmin.service';
import { UsersService } from 'src/shared/Users.service';

@Injectable()
export class AppointmentGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly superAdminService: SuperAdminService,
        private readonly userService: UsersService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const routePermission = this.reflector.get<string[]>('permissions', context.getHandler());
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const params = request.params;

        // NOTE: If user is admin
        const admin = await this.superAdminService.findOne(user.id);
        if (admin) {
            return true;
        }

        // NOTE: If all the users exist
        const userDetail = await this.userService.findOne(user.id);
        if (userDetail && userDetail.isActive) {
            // NOTE: get if user has permission
            const hasUserPermission = await this.userService.hasUserPermission(userDetail.id, Number(routePermission[0]));
            console.log(hasUserPermission);
            if (hasUserPermission) {
                return true;
            }
            throw new UnauthorizedException('User has no permission');

        }
        throw new UnauthorizedException('Not an active user');

    }
}