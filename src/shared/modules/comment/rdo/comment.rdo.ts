import { Expose, Type } from 'class-transformer';
import { CreateUserRdo } from '../../user/rdo/create-user.rdo';

export class CommentRdo {
  @Expose()
  public id: string;

  @Expose()
  public text: string;

  @Expose()
  public createdAt: string;

  @Expose()
  public rating: string;

  @Expose({ name: 'userId'})
  @Type(() => CreateUserRdo)
  public user: CreateUserRdo;
}
