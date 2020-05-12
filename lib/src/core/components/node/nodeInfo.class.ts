import { NodeInfoInterface } from "./nodeInfo.interface";

export class NodeInfo implements NodeInfoInterface {
  public initialize?: string;
  public uuid?: string;
  public update?: string;
  public constructor(options?: NodeInfoInterface) {
    Object.assign(this, options);
  }
}
