export interface RepositoryConnectionInterface {
  hosturl?: string;
  username?: string;
  password?: string;
  stats?: boolean;
}

// tslint:disable-next-line: max-classes-per-file
export class RepositoryConnection implements RepositoryConnectionInterface {
  public hosturl?: string;
  public username?: string = "";
  public password?: string = "";
  public stats?: boolean = false;
  public constructor(options?: RepositoryConnectionInterface) {
    Object.assign(this, options);
  }
}

export interface RepositoryInterface {
  connection?: RepositoryConnection;
}

export function Repository(settings?: RepositoryInterface) {
  return function Nodeinfo<T extends new(...args: any[]) => {}>(target: T) {
    // tslint:disable-next-line: max-classes-per-file
    return class extends target implements RepositoryInterface {
      public connection?: RepositoryConnection = new RepositoryConnection();
      public constructor(...args: any[]) {
        super();
        this.connection = new RepositoryConnection(settings.connection);
      }
    };
  };
}
