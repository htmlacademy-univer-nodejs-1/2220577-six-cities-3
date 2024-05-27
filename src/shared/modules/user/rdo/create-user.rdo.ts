import {Expose} from 'class-transformer';
import { UserType } from '../../../types/user-type.enum.js';

export class CreateUserRdo {
  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public avatar: string;

  @Expose()
  public password: string;

  @Expose()
  public userType: UserType;
}
