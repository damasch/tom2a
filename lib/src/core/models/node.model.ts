
import { NodeInfo, NodeInterface, NodeMeta } from "@tom2a/core/components/node";

/**
 * Base Model module for common node properties an functions
 *
 * @export
 * @class BaseModelModule
 */
export class NodeModelModule implements NodeInterface {
  public nodeInfo?: NodeInfo;
  public nodeMeta?: NodeMeta;

  /**
   * Assign values to the model
   * @param {*} [params]
   * @memberof BaseModelModule
   */
  public assign(params?: any): void {
    Object.assign(this, params);
  }
}
