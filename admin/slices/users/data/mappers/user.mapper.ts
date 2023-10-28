import type { UserDto } from '~/data/repositories/api';
import type { IUserData } from '../../domain/entities';

export class UserMapper {
  public toData(data: UserDto): IUserData {
    return data;
  }
}
