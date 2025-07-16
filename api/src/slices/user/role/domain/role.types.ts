export interface IRoleData {
  id: string;
  name: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateRoleData{
  name: string;
  permissions: string[];
}

export interface IUpdateRoleData{
  name: string;
  permissions: string[];
}
