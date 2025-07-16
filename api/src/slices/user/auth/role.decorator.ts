import { SetMetadata } from '@nestjs/common';
import { RoleTypes } from '../user/domain';

export const ROLE_KEY = 'roles';
export const Role = (...roles: RoleTypes[]) => SetMetadata(ROLE_KEY, roles);
