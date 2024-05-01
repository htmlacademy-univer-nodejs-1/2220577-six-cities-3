import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, HttpMethod, ValidateDtoMiddleware, ValidateObjectIdMiddleware } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { City, Component } from '../../types/index.js';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { CreateOfferDto, OfferRdo } from './index.js';
import { CreateOfferRequest } from './types/create-offer-request.type.js';
import { ParamOfferId } from './types/param-offerid.type.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';

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
    this.addRoute({ path: '/', method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateOfferDto),
      ] });
    // PATCH /offers/{id}
    this.addRoute({ path: '/:offerId', method: HttpMethod.Patch, handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
      ] });
    // DELETE /offers/{id}
    this.addRoute({ path: '/:offerId', method: HttpMethod.Delete, handler: this.delete,
      middlewares: [new ValidateObjectIdMiddleware('offerId')] });
    // GET /offers/{id}
    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.show,
      middlewares: [new ValidateObjectIdMiddleware('offerId')] });
    // GET /premium
    this.addRoute({ path: '/premium', method: HttpMethod.Get, handler: this.getPremium });
    // GET /favorites
    this.addRoute({ path: '/favorites', method: HttpMethod.Get, handler: this.getFavorites });
    // POST /favorites/{id}
    this.addRoute({ path: '/favorites/:offerId', method: HttpMethod.Post, handler: this.setFavorite, middlewares: [new ValidateObjectIdMiddleware('offerId')] });
    // DELETE /favorites/{id}
    this.addRoute({ path: '/favorites/:offerId', method: HttpMethod.Delete, handler: this.deleteFavorite, middlewares: [new ValidateObjectIdMiddleware('offerId')] });
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

  public async update({ body, params }: Request<ParamOfferId, unknown, UpdateOfferDto>, res: Response): Promise<void> {
    const { offerId } = params;
    const updatedOffer = await this.offerService.updateById(offerId, body);
    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async delete({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);
    await this.offerService.deleteById(offerId);
    this.noContent(res, offer);
  }

  public async show({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async getPremium({ query }: Request, res: Response): Promise<void> {
    // ?city=London
    const { city } = query;
    const offers = await this.offerService.findPremiumByCity(city as City);
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
