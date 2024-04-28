import { UserType } from '../../../types';

export class CreateUserDto {
  public email: string;
  public userType: UserType;
  public name: string;
  public avatar: string;
  public password: string;
}
