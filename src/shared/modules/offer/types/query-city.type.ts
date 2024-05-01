import { Query } from 'express-serve-static-core';
import { City } from '../../../types/city-type.enum';

export type QueryCity = {
  city: City;
} | Query;
