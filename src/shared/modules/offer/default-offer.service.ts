import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { DEFAULT_OFFER_COUNT, PREMIUM_OFFER_COUNT } from './offer.constant.js';
@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(id)
      .populate('userId')
      .exec();
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    const offers = this.offerModel
      .find()
      .populate('userId')
      .exec();
    return (await offers).slice(0, limit);
  }

  public async deleteById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(id)
      .exec();
  }

  public async updateById(id: string, dto: CreateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(id, dto, {new: true})
      .populate('userId')
      .exec();
  }

  public async incCommentCount(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(id, {'$inc': {
        commentCount: 1,
      }}).exec();
  }

  public async findPremiumByCity(city: string, count?: number): Promise<DocumentType<OfferEntity>[] | null> {
    const limit = count ?? PREMIUM_OFFER_COUNT;
    const offers = this.offerModel
      .find({city: city, premium: true})
      .populate('userId')
      .exec();
    return (await offers).slice(0, limit);
  }

  public async findFavorite(count?: number): Promise<DocumentType<OfferEntity>[] | null> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    const offers = this.offerModel
      .find({favorite: true})
      .populate('userId')
      .exec();
    return (await offers).slice(0, limit);
  }

  public async addToFavorite(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(id, {favorite: true}, {new: true})
      .exec();
  }

  public async removeFromFavorite(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(id, {favorite: false}, {new: true})
      .exec();
  }

  public async exists(id: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: id})) !== null;
  }

  public async calcRating(id: string): Promise<DocumentType<OfferEntity | null> | null> {
    const rating = await this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'comments',
            pipeline: [
              {$match: {offerId: id}}, {$project: {rating: 1}},
              {$group: {_id: null, avg: {'$avg': '$rating'}}}
            ], as: 'avg'
          },
        },
      ]).exec();

    return this.offerModel
      .findByIdAndUpdate(id, {rating: rating[0]}, {new: true})
      .populate('userId')
      .exec();
  }

}
