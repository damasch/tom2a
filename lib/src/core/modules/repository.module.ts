import { Repository, RepositoryConnection } from "@tom2a/core/decorator/repository.decorator";

import { Neo4jModule } from "./neo4j.module";

export class RepositoryModule {

  private readonly repositoryConnection: RepositoryConnection;

  public constructor() {
    // this.repositoryConnection.hosturl = Neo4jModule.hosturl;
    // this.repositoryConnection.username = Neo4jModule.username;
    // this.repositoryConnection.password = Neo4jModule.password;
    // this.repositoryConnection.stats = Neo4jModule.stats;
  }

  public save() {
    // tslint:disable-next-line: no-console
    console.log(this);
  }
}
