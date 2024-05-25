import { UserType } from '../../../types/user-type.enum';

export class UpdateUserDto {
  public avatarPath?: string;
  public name?: string;
  public typeUser?: UserType;
}
