import { NodeModelModule } from "@tom2a/core/models/node.model";

/**
 * Base Model module for common node properties an functions
 *
 * @export
 * @class BaseModelModule
 */
export class BaseModelModule extends NodeModelModule {
  /**
   * Returns the Create string
   * @readonly
   * @static
   * @param {string} nodeName
   * @type {string}
   * @memberof BaseModelModule
   */
  public onCreateString(): string {
    return ` ON CREATE SET ` +
      `${this.nodeMeta.type}.uuid = randomUUID(), ` +
      `${this.nodeMeta.type}.initialize = timestamp(), ` +
      `${this.nodeMeta.type}.update = timestamp() `;
  }

  /**
   * Returns the Merge and
   * @readonly
   * @static
   * @param {string} nodeName
   * @type {string}
   * @memberof BaseModelModule
   */
  public onMergeString(): string {
    return ` ON MERGE SET ` +
    `${this.nodeMeta.type}.update = timestamp() `;
  }
}
