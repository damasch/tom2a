import { NodeInterface } from "@tom2a/core/components/node/node.interface";
import { NodeInfo } from "@tom2a/core/components/node/nodeInfo.class";
import { NodeMeta } from "@tom2a/core/components/node/nodeMeta.class";

export function Node(settings?: NodeInterface) {
  return function Nodeinfo<T extends new(...args: any[]) => {}>(target: T) {
    // tslint:disable-next-line: max-classes-per-file
    return class extends target implements NodeInterface {
      public nodeInfo?: NodeInfo;
      public nodeMeta?: NodeMeta;
      public constructor(...args: any[]) {
        super();
        this.nodeInfo = new NodeInfo(settings.nodeInfo);
        this.nodeMeta = new NodeMeta(settings.nodeMeta);
      }
    };
  };
}
