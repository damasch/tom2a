import dotenv from "dotenv";

// initialize configuration
dotenv.config();

export class Neo4jModule {

  /**
   * get the host url of the neo4j server
   *
   * @readonly
   * @static
   * @type {string}
   * @memberof Neo4jModule
   */
  public static get hosturl(): string {
    return this._hosturl;
  }

  /**
   * get the neo4j server user name
   *
   * @readonly
   * @static
   * @type {string}
   * @memberof Neo4jModule
   */
  public static get username(): string {
    return this._username;
  }

  /**
   * get the neo4j server password
   *
   * @readonly
   * @static
   * @type {string}
   * @memberof Neo4jModule
   */
  public static get password(): string {
    return this._password;
  }

  /**
   * get the stats in cypher queries
   *
   * @readonly
   * @static
   * @type {boolean}
   * @memberof Neo4jModule
   */
  public static get stats(): boolean {
    return this._stats;
  }

  private static readonly _hosturl: string =
    process.env.NEO4J_SERVER_PROTOCOL +
    "://" + process.env.NEO4J_SERVER_HOST +
    ":" + process.env.NEO4J_SERVER_PORT;

  private static readonly _username: string =
    process.env.NEO4J_SERVER_USER;

  private static readonly _password: string =
    process.env.NEO4J_SERVER_PASSWORD;

  private static readonly _stats: boolean =
    process.env.NEO4J_SERVER_STATS === "true" ||
    process.env.NEO4J_SERVER_STATS === "1";
}
