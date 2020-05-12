import { NodeMetaInterface } from "./nodeMeta.interface";

export class NodeMeta implements NodeMetaInterface {
  public labels: string[];
  public type: string;
  public constructor(options?: NodeMetaInterface) {
    if (options) {
      if (!(/^([a-zA-Z]{1,}[a-zA-Z0-9]*)$/.test(options.type))) {
        throw new Error("Cannot set NodeOptions type! " + options.type);
      }
      Object.assign(this, options);
    }
  }
}
