import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { UserType } from '../../../types';
import { CreateUserMessages } from './create-user.messages';

export class CreateUserDto {
  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email: string;

  @IsEnum(UserType, {message: CreateUserMessages.userType.invalidFormat})
  public userType: UserType;

  @IsString({ message: CreateUserMessages.name.invalidFormat })
  @Length(1, 15, { message: CreateUserMessages.name.lengthField })
  public name: string;

  @IsString({ message: CreateUserMessages.avatar.invalidFormat })
  public avatar: string;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(6, 12, { message: CreateUserMessages.password.lengthField })
  public password: string;
}
