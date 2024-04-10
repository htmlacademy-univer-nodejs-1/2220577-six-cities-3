import { Coordinates } from '../../../types/coords.type.js';
import { City, OfferType, Conveniences } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public date: Date;
  public city: City;
  public preview: string;
  public photos: string[];
  public premium: boolean;
  public favorite: boolean;
  public rating: number;
  public offerType: OfferType;
  public rooms: number;
  public guests: number;
  public price: number;
  public conveniences: Conveniences[];
  public userId: string;
  public commentsCount = 0;
  public coordinates: Coordinates;
}
