import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { City, Conveniences, OfferType } from '../../types/index.js';
import { UserEntity } from '../user/index.js';
import { Coordinates } from '../../types/coords.type.js';

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({trim: true})
  public description!: string;

  @prop()
  public date!: Date;

  @prop({
    type: () => String,
    enum: City
  })
  public city!: City;

  @prop()
  public preview!: string;

  @prop({ type: () => [String] })
  public photos!: string[];

  @prop({ required: true })
  public premium!: boolean;

  @prop({ required: true })
  public favorite!: boolean;

  @prop({default: 0})
  public rating!: number;

  @prop({
    type: () => String,
    enum: OfferType
  })
  public offerType!: OfferType;

  @prop()
  public rooms!: number;

  @prop()
  public guests!: number;

  @prop()
  public price!: number;

  @prop({ type: () => [String], enum: Conveniences })
  public conveniences!: Conveniences[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({ default: 0 })
  public commentsCount!: number;

  @prop()
  public coordinates!: Coordinates;
}

export const OfferModel = getModelForClass(OfferEntity);
