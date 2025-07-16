import { IMetaResponse } from '#core';
import { IRoleData, ICreateRoleData, IUpdateRoleData } from './role.types';

export abstract class IRoleGateway {
  abstract getRoles(): Promise<IRoleData[]>;
  abstract getRole(id: string): Promise<IRoleData>;
  abstract createRole(data: ICreateRoleData): Promise<IRoleData>;
  abstract updateRole(id: string, data: IUpdateRoleData): Promise<IRoleData>;
  abstract deleteRole(id: string): Promise<boolean>;
}
