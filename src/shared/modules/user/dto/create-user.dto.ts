import { UserType } from '../../../types';

export class CreateUserDTO {
  public email: string;
  public userType: UserType;
  public name: string;
  public avatar: string;
  public password: string;
}
