import { CreateOfferDto } from './dto/create-offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(): Promise<DocumentType<OfferEntity>[]>;
  deleteById(id: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(id: string, dto: CreateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  incCommentCount(id: string): Promise<DocumentType<OfferEntity> | null>;
  findPremiumByCity(city: string, isPremium: boolean): Promise<DocumentType<OfferEntity>[] | null>;
  findFavorite(isFavorite: boolean): Promise<DocumentType<OfferEntity>[] | null>;
  addToFavorite(id: string): Promise<DocumentType<OfferEntity> | null>;
  removeFromFavorite(id: string): Promise<DocumentType<OfferEntity> | null>;
  calcRating(id: string): Promise<DocumentType<OfferEntity> | null>;
  exists(id: string): Promise<boolean>;
}
