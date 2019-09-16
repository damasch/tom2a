export interface NodeOptionsInterface {
  labels: string[];
  type: string;
}

export class NodeOptions implements NodeOptionsInterface {
  public labels: string[];
  public type: string;
  public constructor(options?: NodeOptionsInterface) {
    if (options) {
      if (!(/^([a-zA-Z]{1,}[a-zA-Z0-9]*)$/.test(options.type))) {
        throw new Error("Cannot set NodeOptions type! " + options.type);
      }
      Object.assign(this, options);
    }
  }
}

// tslint:disable-next-line: max-classes-per-file
export interface NodeInfoInterface {
  initialize?: string;
  uuid?: string;
  update?: string;
}

// tslint:disable-next-line: max-classes-per-file
export class NodeInfo implements NodeInfoInterface {
  public initialize?: string;
  public uuid?: string;
  public update?: string;
  public constructor(options?: NodeInfoInterface) {
    Object.assign(this, options);
  }
}

export interface NodeMetaInterface {
  id?: string;
}

// tslint:disable-next-line: max-classes-per-file
export class NodeMeta implements NodeMetaInterface {
  public id?: string;
  public constructor(options?: NodeMetaInterface) {
    Object.assign(this, options);
  }
}

export interface NodeInterface {
  NodeOptions?: NodeOptions;
  NodeInfo?: NodeInfo;
  NodeMeta?: NodeMeta;
}

export function Node(settings?: NodeInterface) {
  return function Nodeinfo<T extends new(...args: any[]) => {}>(target: T) {
    // tslint:disable-next-line: max-classes-per-file
    return class extends target implements NodeInterface {
      public NodeOptions?: NodeOptions = new NodeOptions();
      public NodeInfo?: NodeInfo = new NodeInfo();
      public NodeMeta?: NodeMeta = new NodeMeta();
      public constructor(...args: any[]) {
        super();
        this.NodeOptions = new NodeOptions(settings.NodeOptions);
        this.NodeInfo = new NodeInfo(settings.NodeInfo);
        this.NodeMeta = new NodeMeta(settings.NodeMeta);
      }
    };
  };
}
