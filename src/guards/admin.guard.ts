import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import User from 'src/entities/User';
import { SuperAdminService } from 'src/shared/SuperAdmin.service';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private reflector: Reflector, private readonly superAdminService: SuperAdminService) { }

    // async canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        let result;
        try {
            result = await this.superAdminService.findOne(user.id);
        } catch (e) { return false; }
        finally {
            if (result) {
                return true;
            }
            return false;
        }


        // return this.superAdminService.findOne(user.id).pipe(
        //     map((user: any) => {
        //         if (!user) {
        //             return true;
        //         }
        //         console.log('*******User*******');
        //         console.log(user);
        //         console.log('*******User*******');
        //         return true;
        //     })
        // )
    }
}