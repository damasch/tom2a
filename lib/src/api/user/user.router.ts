import { RouterModule } from "@tom2a/core/modules/router.module";
import { UserService } from "./user.service";

/**
 * Initialize all user routes
 *
 * @export
 * @class UserRouter
 * @extends {RouterModule}
 */
export class UserRouter extends RouterModule {
  protected readonly _service: UserService = new UserService();

  /**
   * Creates an instance of UserRouter.
   * @memberof UserRouter
   */
  public constructor() {
    super();
    this.initRoutes();
  }

  /**
   * init routes
   * @protected
   * @memberof UserRouter
   */
  protected initRoutes() {
    this._router.get(
      "/",
      this._service.getUsers
    );
    this._router.get(
      "/:name",
      this._service.getUserByName
    );
    this._router.post(
      "/",
      this._service.createUser
    );
    this._router.delete(
      "/:uuid",
      this._service.deleteUser
    );
  }
}
