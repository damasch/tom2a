
import { bind } from "decko";
import { NextFunction, Request, Response } from "express";

import { Neo4jModule, Neo4jService } from "@tom2a/core";

export class RootService {
  private readonly neo4jService: Neo4jService = new Neo4jService();

  /**
   * Read all users from db (cached)
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response | void>} Returns HTTP response
   */
  @bind
  public async getInfo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {

    const statements = [
      {
        includeStats : Neo4jModule.stats,
        parameters: {},
        statement:  "RETURN null"
      }
    ];
    try {
      const transaction: any = await this.neo4jService.transaction(statements);

      return res.json({ status: res.statusCode, data: transaction });
    } catch (err) {
      return next(err);
    }
  }
}
