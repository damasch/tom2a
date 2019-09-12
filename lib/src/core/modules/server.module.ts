import { createServer, Server } from "http";

import { ApplicationModule, ConfigModule } from "@tom2a/core";
/**
 * Main server off the application
 *
 * @export
 * @class ServerModule
 */
export class ServerModule {
  private readonly _tom2a: ApplicationModule;
  private readonly _server: Server;
  private readonly _config: ConfigModule;

  /**
   * Creates an instance of ServerModule.
   * @memberof ServerModule
   */
  public constructor() {
    // Configure
    this._tom2a = new ApplicationModule();
    this._server = createServer(this._tom2a.app);
    this._config = new ConfigModule();
  }

  /**
   * Get the tom2a application module
   *
   * @readonly
   * @type {ApplicationModule}
   * @memberof ServerModule
   */
  public get tom2a(): ApplicationModule {
    return this._tom2a;
  }

  /**
   * Get the root server of the application
   *
   * @readonly
   * @type {Server}
   * @memberof ServerModule
   */
  public get server(): Server {
    return this._server;
  }

  /**
   * Get the config of the application
   *
   * @readonly
   * @type {ConfigModule}
   * @memberof ServerModule
   */
  public get config(): ConfigModule {
    return this._config;
  }

  /**
   * Start the application server
   *
   * @memberof ServerModule
   */
  public startServer(): void {

    // Configure Express to use EJS
    this._server.listen(this._config.port);

    this.server.on("listening", () => {
      // tslint:disable-next-line:no-console
      console.log(`Server is listen at: ${this._config.host }`);
    });

    this.server.on("close", () => {
      // tslint:disable-next-line:no-console
      console.log("Server closed");
    });
  }

}
