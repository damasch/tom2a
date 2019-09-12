import { UserRouter } from "@tom2a/api/user/user.router";
import { RouterModule } from "@tom2a/core/modules/router.module";
import { Router } from "express";
import { RootService } from "./root.service";

/**
 * Root Router module initialize all routes
 *
 * @export
 * @class RootRouter
 * @extends {RouterModule}
 */
export class RootRouter extends RouterModule {
  private readonly service: RootService = new RootService();

  /**
   * Creates an instance of RootRouter.
   * @param {Router} router
   * @memberof RootRouter
   */
  public constructor(router: Router) {
    super();
    this._router = router;
    this.initRoutes();
    this._router.use("/user", new UserRouter().router);
  }

  /**
   * init routes
   *
   * @protected
   * @memberof RootRouter
   */
  protected initRoutes() {
    this._router.get(
      "/",
      this.service.getInfo
    );
  }
}
