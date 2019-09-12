import { bind } from "decko";

import { Neo4jModule } from "@tom2a/core";

import { HttpService } from "@tom2a/core/services/http.service";

export class Neo4jService extends HttpService {
  public constructor() {
    const neoMod = new Neo4jModule();
    super({
      auth: {
        password: Neo4jModule.password,
        username: Neo4jModule.username
      },
      baseURL: Neo4jModule.hosturl,

      withCredentials: true,
    });
  }

  /**
   * Star a transaction
   *
   * @param {string} statements
   * @returns {Promise<any>}
   */
  @bind
  public async transaction(statements: any): Promise<Response | void> {
    try {
      const transaction = await this.postData(`/db/data/transaction/commit`, statements);
      return transaction.data;
    } catch (err) {
      throw err;
    }
  }
}
