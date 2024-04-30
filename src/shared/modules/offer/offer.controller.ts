import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './index.js';
import { CreateOfferRequest } from './types/create-offer-request.type.js';
import { ParamOfferId } from './types/param-offerid.type.js';
import { UpdateOfferRdo } from './rdo/update-offer.rdo.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    // GET /offers
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    // POST /offers
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    // PATCH /offers/{id}
    this.addRoute({ path: '/:id', method: HttpMethod.Patch, handler: this.update });
    // DELETE /offers/{id}
    this.addRoute({ path: '/:id', method: HttpMethod.Delete, handler: this.delete });
    // GET /offers/{id}
    this.addRoute({ path: '/:id', method: HttpMethod.Get, handler: this.getOneOffer });
    // GET /premium
    this.addRoute({ path: '/premium', method: HttpMethod.Get, handler: this.getPremium });
    // GET /favorites
    this.addRoute({ path: '/favorites', method: HttpMethod.Get, handler: this.getFavorites });
    // POST /favorites/{id}
    this.addRoute({ path: '/favorites/:id', method: HttpMethod.Post, handler: this.setFavorite });
    // DELETE /favorites/{id}
    this.addRoute({ path: '/favorites/:id', method: HttpMethod.Delete, handler: this.deleteFavorite });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async create({body}: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create(body);
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async update({ body, params }: Request<ParamOfferId, unknown, UpdateOfferRdo>, res: Response): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);
    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async delete({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);
    this.noContent(res, offer);
  }

  public async getOneOffer({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async getPremium({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { city } = params;
    const offers = await this.offerService.findPremiumByCity(city);
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async getFavorites(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findFavorite();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async setFavorite({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const result = await this.offerService.addToFavorite(offerId);
    const responseData = fillDTO(OfferRdo, result);
    this.ok(res, responseData);
  }

  public async deleteFavorite({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const result = await this.offerService.removeFromFavorite(offerId);
    const responseData = fillDTO(OfferRdo, result);
    this.ok(res, responseData);
  }
}
