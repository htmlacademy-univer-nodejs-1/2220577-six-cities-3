import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public text: string;

  @prop()
  public date!: Date;

  @prop({default: 0})
  public rating!: number;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);