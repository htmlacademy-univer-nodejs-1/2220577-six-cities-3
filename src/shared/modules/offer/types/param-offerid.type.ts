import { ParamsDictionary } from 'express-serve-static-core';
import { City } from '../../../types/city-type.enum';

export type ParamOfferId = {
  offerId: string;
  city: City;
} | ParamsDictionary;
