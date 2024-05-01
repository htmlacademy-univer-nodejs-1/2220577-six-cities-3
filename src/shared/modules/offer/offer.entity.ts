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

  @prop({trim: true, required: true})
  public description!: string;

  @prop({ required: true })
  public date!: Date;

  @prop({
    type: () => String,
    enum: City,
    required: true
  })
  public city!: City;

  @prop({required: true})
  public preview!: string;

  @prop({ type: () => [String], required: true })
  public photos!: string[];

  @prop({ required: true })
  public premium!: boolean;

  @prop({ required: true })
  public favorite!: boolean;

  @prop({default: 0, required: true})
  public rating!: number;

  @prop({
    type: () => String,
    enum: OfferType,
    required: true
  })
  public offerType!: OfferType;

  @prop({required: true})
  public rooms!: number;

  @prop({required: true})
  public guests!: number;

  @prop({required: true})
  public price!: number;

  @prop({ type: () => [String], enum: Conveniences,required: true })
  public conveniences!: Conveniences[];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

  @prop()
  public commentsCount!: number;

  @prop({required: true})
  public coordinates!: Coordinates;
}

export const OfferModel = getModelForClass(OfferEntity);
