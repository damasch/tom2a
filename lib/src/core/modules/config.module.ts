import dotenv from "dotenv";

dotenv.config();

export class ConfigModule {
  private readonly _host: string;
  private readonly _port: string;

  public constructor() {
    // Configure Express to use EJS
    this._host = process.env.HOST_URL + ":" + process.env.SERVER_PORT;
    this._port = process.env.SERVER_PORT;
  }

  /***
   * Get host
   * @returns {string} the host name
   */
  public get host(): string {
    return this._host;
  }

  /***
   * Get port
   * @returns {string} the port
   */
  public get port(): string {
    return this._port;
  }
}
