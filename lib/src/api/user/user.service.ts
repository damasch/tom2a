
import { bind } from "decko";
import { NextFunction, Request, Response } from "express";

import { Neo4jModule, Neo4jService } from "@tom2a/core";

import { UserModel } from "./user.model";

export class UserService  {
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
  public async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {

    const statements = [
      {
        includeStats : Neo4jModule.stats,
        parameters: {},
        statement:  "MATCH (userModel:SYSTEM:USER) "
          + "WHERE NOT userModel:DELETED RETURN userModel, "
          + UserModel.cypherLabels()
      }
    ];
    try {
      const transaction: any = await this.neo4jService.transaction({statements});
      const userModels: UserModel[] = [];

      transaction.results[0].data.forEach((element: any) => {
        const userModel: UserModel = new UserModel();
        userModel.assign(element.row[0]);
        userModel.assign(element.row[1]);
        userModel.assign(element.meta[0]);
        userModels.push(userModel);
      });

      return res.json({
        status: res.statusCode,
        data: userModels,
        stats: transaction.results[0].stats
      });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * returns a user by name
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {(Promise<Response | void>)}
   * @memberof UserService
   */
  @bind
  public async getUserByName(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {

    const { name } = req.params;
    const statements = [
      {
        includeStats : Neo4jModule.stats,
        parameters: {
          name
        },
        statement:  "MATCH (userModel:SYSTEM:USER {name: {name} }) WHERE NOT n:DELETED RETURN n as user"
      }
    ];
    try {
      const transaction: any = await this.neo4jService.transaction({statements});
      return res.json({
        status: res.statusCode,
        data: transaction,
        stats: transaction.results[0].stats
      });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * create a user
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {(Promise<Response | void>)}
   * @memberof UserService
   */
  @bind
  public async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {

    if (!req.body.user) {
      return res.status(400).json({ status: 400, error: "Invalid request" });
    }
    const userModel: UserModel = new UserModel();
    userModel.assign(req.body.user);

    const statements = [
      {
        includeStats : Neo4jModule.stats,
        parameters: {
          userModel
        },
        statement:  `MERGE (userModel:SYSTEM:USER {name: $userModel.name, admin: $userModel.admin}) ` +
          userModel.onCreateString("userModel") +
          ` RETURN userModel, { labels: labels(userModel) } as labels`
      }
    ];

    try {
      const transaction: any = await this.neo4jService.transaction({statements});

      userModel.assign(transaction.results[0].data[0].row[0]);
      userModel.assign(transaction.results[0].data[0].row[1]);
      userModel.assign(transaction.results[0].data[0].meta[0]);

      return res.json({
        status: res.statusCode,
        data: userModel,
        stats: transaction.results[0].stats
      });
    } catch (err) {
      return next(err);
    }
  }
}
