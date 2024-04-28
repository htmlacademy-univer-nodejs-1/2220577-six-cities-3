import { Expose } from 'class-transformer';
import { City, Conveniences, OfferType, User, UserType } from '../../../types';
import { Coordinates } from '../../../types/coords.type';
import { CreateUserRdo } from '../../user/rdo/create-user.rdo';

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
  public user: User;

  @Expose()
  public commentsCount: number;

  @Expose()
  public coordinates: Coordinates;

}
