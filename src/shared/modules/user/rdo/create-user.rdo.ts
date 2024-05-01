import {Expose} from 'class-transformer';
import { UserType } from '../../../types';

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
