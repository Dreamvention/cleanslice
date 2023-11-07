import type { UserDto } from '../repositories';
import type { IUserData } from '../../domain/entities';

export class UserMapper {
  public toData(data: UserDto): IUserData {
    return data;
  }
}
