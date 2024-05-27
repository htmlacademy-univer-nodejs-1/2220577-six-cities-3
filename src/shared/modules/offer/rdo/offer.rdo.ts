import { Expose, Type } from 'class-transformer';
import { Coordinates } from '../../../types/coords.type.js';
import { CreateUserRdo } from '../../user/rdo/create-user.rdo.js';
import { City } from '../../../types/city-type.enum.js';
import { OfferType } from '../../../types/offer-type.enum.js';
import { Conveniences } from '../../../types/conv-type.enum.js';

export class OfferRdo {
  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public date: Date;

  @Expose()
  public city: City;

  @Expose()
  public preview: string;

  @Expose()
  public photos: string[];

  @Expose()
  public premium: boolean;

  @Expose()
  public favorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public offerType: OfferType;

  @Expose()
  public rooms: number;

  @Expose()
  public guests: number;

  @Expose()
  public price: number;

  @Expose()
  public conveniences: Conveniences[];

  @Expose({ name: 'userId'})
  @Type(() => CreateUserRdo)
  public userId: CreateUserRdo;

  @Expose()
  public commentsCount: number;

  @Expose()
  public coordinates: Coordinates;

}
