import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');

    // GET /offers/{id}/comments
    this.addRoute({ path: '/offers/:id/comments', method: HttpMethod.Get, handler: this.index });
    // POST /offers/{id}/comments
    this.addRoute({ path: '/offers/:id/comments', method: HttpMethod.Post, handler: this.create });

  }

  public index(req: Request, res: Response): void {
    // Код обработчика
  }

  public create(req: Request, res: Response): void {
    // Код обработчика
  }
}
