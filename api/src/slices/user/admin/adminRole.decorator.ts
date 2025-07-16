import { SetMetadata } from '@nestjs/common';

export const AdminRole = (role: string[]) => SetMetadata('AdminRole', role);
