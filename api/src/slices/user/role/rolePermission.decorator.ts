import { SetMetadata } from '@nestjs/common';

export const RolePermission = (permissions: string[]) => SetMetadata('rolePermissions', permissions);
