import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { User, UserType } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})

export class UserEntity extends defaultClasses.TimeStamps implements User {

  @prop({ required: true, default: ''})
  public name: string;

  @prop({ unique: true, required: true })
  public email: string;

  @prop({default: ''})
  public avatar: string;

  @prop({ required: true, default: '' })
  private password?: string;

  @prop({
    type: () => String,
    enum: UserType
  })
  public userType: UserType;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.userType = userData.userType;
    this.name = userData.name;
    this.avatar = userData.avatar;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
