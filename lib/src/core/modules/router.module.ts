import { Router } from "express";

export abstract class RouterModule {
  protected _router: Router = Router();

  /**
   * return router
   * @type {Router}
   * @memberof RouterModule
   */
  public get router(): Router {
    return this._router;
  }

  /**
   * init routes
   * @protected
   * @memberof RouterModule
   */
  protected abstract initRoutes(): void;
}
