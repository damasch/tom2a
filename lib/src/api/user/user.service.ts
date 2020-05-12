
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

    const um: any = new UserModel();
    // tslint:disable-next-line: no-console
    console.log(um);
    const type = um.nodeMeta.type ? um.nodeMeta.type : "node" + this.constructor.name;
    const labels = um.nodeMeta.labels.join(":");

    const statements = [
      {
        includeStats : Neo4jModule.stats,
        parameters: {},
        statement:  `MATCH `
          + ` (${type}:${labels}) `
          + `WHERE `
          + ` NOT ${type}:DELETED `
          + `RETURN { `
          + ` name: ${type}.name, `
          + ` admin: ${type}.admin, `
          + ` nodeInfo: { uuid: ${type}.uuid, update: ${type}.update, initialize: ${type}.initialize }, `
          + ` nodeMeta: { labels: labels(${type}), name: '${type}', id: id(${type})}`
          + `} as Node`
      }
    ];
    try {
      const transaction: any = await this.neo4jService.transaction({statements});
      const userModels: UserModel[] = [];
      transaction.results[0].data.forEach((element: any) => {
        const userModel: any = new UserModel();
        userModel.assign(element.row[0]);
        userModels.push(userModel);
      });

      return res.json({
        status: res.statusCode,
        data: userModels,
        stats: null
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

    if (!name) {
      return res.status(400).json({ status: 400, error: "Get User By Name - Invalid request" });
    }

    const statements = [
      {
        includeStats : Neo4jModule.stats,
        parameters: {
          name
        },
        statement:  "MATCH (userModel:SYSTEM:USER {name: $name}) "
          + "WHERE NOT userModel:DELETED RETURN userModel, "
          + " { labels: labels(userModel) } as labels "
      }
    ];
    try {
      const transaction: any = await this.neo4jService.transaction({statements});

      const userModel: UserModel = new UserModel();
      Object.assign(userModel, transaction.results[0].data[0].row[0]);
      Object.assign(userModel, transaction.results[0].data[0].row[0]);
      Object.assign(userModel, transaction.results[0].data[0].meta[0]);

      return res.json({
        status: res.statusCode,
        data: userModel,
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
      return res.status(400).json({ status: 400, error: "Create User - Invalid request" });
    }
    const userModel: UserModel = new UserModel();
    // userModel.assign(req.body.user);

    const statements = [
      {
        includeStats : Neo4jModule.stats,
        parameters: {
          userModel
        },
        statement:  `MERGE (userModel:SYSTEM:USER {name: $userModel.name, admin: $userModel.admin}) ` +
          // userModel.onCreateString("userModel") +
          ` RETURN userModel, { labels: labels(userModel) } as labels`
      }
    ];

    try {
      const transaction: any = await this.neo4jService.transaction({statements});

      Object.assign(userModel, transaction.results[0].data[0].row[0]);
      Object.assign(userModel, transaction.results[0].data[0].row[1]);
      Object.assign(userModel, transaction.results[0].data[0].meta[0]);
      // userModel.assign(transaction.results[0].data[0].row[0]);
      // userModel.assign(transaction.results[0].data[0].row[1]);
      // userModel.assign(transaction.results[0].data[0].meta[0]);
      res.statusCode = 201;
      return res.json({
        status: res.statusCode,
        data: userModel,
        stats: transaction.results[0].stats
      });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * Delete a user by uuid
   * @param req
   * @param res
   * @param next
   */
  @bind
  public async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {

    const { uuid } = req.params;

    if (!uuid) {
      return res.status(400).json({ status: 400, error: "Get User By UUID - Invalid request" });
    }

    const statements = [
      {
        includeStats : true,
        parameters: {
          uuid
        },
        statement:  "MATCH (userModel:SYSTEM:USER {uuid: $uuid}) "
          + " DETACH DELETE userModel"
      }
    ];
    try {
      const transaction: any = await this.neo4jService.transaction({statements});

      return res.json({
        status: res.statusCode,
        data: { nodes_deleted: transaction.results[0].stats.nodes_deleted },
        stats: transaction.results[0].stats
      });
    } catch (err) {
      return next(err);
    }
  }
}
