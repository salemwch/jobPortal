import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/userRole/userRole';

export const Role = (role: UserRole) => SetMetadata('role', role);
