import { RootRouter } from "@tom2a/api";
import bodyParser from "body-parser";
import express from "express";
import { Router } from "express";

export class ApplicationModule {
  // tslint:disable-next-line:variable-name
  private readonly _app: express.Application = express();
  private readonly _router: Router = Router();

  public constructor() {
    // Configure Express to use EJS
    this._app.use(bodyParser.json());
    this._app.use(bodyParser.urlencoded({ extended: true }));
    this._router.use("/", new RootRouter(this._app).router);
  }

  /**
   * Get app
   *
   * @returns {express.Application} Returns Express app
   */
  public get app(): express.Application {
    return this._app;
  }
}
