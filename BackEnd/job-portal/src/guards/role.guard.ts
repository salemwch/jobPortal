import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRole } from "src/userRole/userRole";

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private reflector: Reflector){}
    canActivate(context: ExecutionContext): boolean {
        const requiredRole = this.reflector.get<UserRole[]>('role', context.getHandler());
        if(!requiredRole){
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if(!user){
            console.log('roleguard : user is not defind in request');
            return false;
        }
        console.log(`role guard: user role is ${user.role} required role: ${requiredRole}`)
        return user.role === requiredRole;
    }
}