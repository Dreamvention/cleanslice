export interface ITeamUserData {
  id: string;
  userId: string;
  email: string;
  teamId: string;
  roleId: string;
  status: TeamUserStatusTypes;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateTeamUserData {
  email: string;
  teamId: string;
  roleId: string;
  status: TeamUserStatusTypes;
}

export interface IUpdateTeamUserData {
  roleId?: string;
  status?: TeamUserStatusTypes;
}

export enum TeamUserStatusTypes {
  Invited = 'invited',
  Accepted = 'accepted',
  Rejected = 'rejected',
}

export enum TeamUserPermissions {
  controlRead = 'control-assessments:read',
  controlCreate = 'control-assessments:create',
  controlUpdate = 'control-assessments:update',
  controlDelete = 'control-assessments:delete',

  findingsRead = 'findings:read',
  findingsCreate = 'findings:create',
  findingsUpdate = 'findings:update',
  findingsDelete = 'findings:delete',

  jobsRead = 'jobs:read',
  jobsCreate = 'jobs:create',
  jobsUpdate = 'jobs:update',
  jobsDelete = 'jobs:delete',
  jobsScan = 'jobs:scan',

  settingsRead = 'settings:read',
  settingsUpdate = 'settings:update',
  settingsDelete = 'settings:delete',
  settingsCreate = 'settings:create',

  usersRead = 'users:read',
  usersDelete = 'users:delete',

  repositoriesRead = 'repositories:read',
  repositoriesCreate = 'repositories:create',
  repositoriesUpdate = 'repositories:update',
  repositoriesDelete = 'repositories:delete',

  teamsRead = 'teams:read',
  teamsCreate = 'teams:create',
  teamsUpdate = 'teams:update',
  teamsDelete = 'teams:delete',

  teamUsersRead = 'team-users:read',
  teamUsersCreate = 'team-users:create',
  teamUsersUpdate = 'team-users:update',
  teamUsersDelete = 'team-users:delete',

  terraformResourcesRead = 'terraform-resources:read',
  terraformResourcesCreate = 'terraform-resources:create',
  terraformResourcesUpdate = 'terraform-resources:update',
  terraformResourcesDelete = 'terraform-resources:delete',

  filesRead = 'files:read',
  filesCreate = 'files:create',
  filesDelete = 'files:delete',
  filesUpload = 'files:upload',

  boundariesRead = 'boundaries:read',
  boundariesCreate = 'boundaries:create',
  boundariesUpdate = 'boundaries:update',
  boundariesDelete = 'boundaries:delete',

  poamsRead = 'poams:read',
  poamsCreate = 'poams:create',
  poamsUpdate = 'poams:update',
  poamsDelete = 'poams:delete',

  grcsRead = 'grcs:read',
  grcsCreate = 'grcs:create',
  grcsUpdate = 'grcs:update',
  grcsDelete = 'grcs:delete',
}
