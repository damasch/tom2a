import { NodeInfo, NodeInterface, NodeMeta } from "@tom2a/core/components/node";

export class Node implements NodeInterface {
  public nodeInfo?: NodeInfo;
  public nodeMeta?: NodeMeta;
  public constructor(options?: NodeInterface) {
    Object.assign(this, options);
  }
}
