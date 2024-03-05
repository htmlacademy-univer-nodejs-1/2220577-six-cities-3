import { City } from './city-type.enum';
import { Conveniences } from './conv-type.enum';
import { Coordinates } from './coords.type';
import { OfferType } from './offer-type.enum';
import { User } from './user.type';

export type Offer = {
  title: string;
  description: string;
  date: Date;
  city: City;
  preview: string;
  photos: string[];
  premium: boolean;
  favorite: boolean;
  rating: number;
  offerType: OfferType;
  rooms: number;
  guests: number;
  price: number;
  conveniences: Conveniences[];
  creator: User;
  commentsCount: number;
  coordinates: Coordinates;
}
