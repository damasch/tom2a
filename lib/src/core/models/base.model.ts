
/**
 * Base Model module for common node properties an functions
 *
 * @export
 * @class BaseModelModule
 */
export class BaseModelModule {

  public static cypherLabels(): string {
    return " { labels: labels(userModel) } as labels ";
  }

  /**
   * @type {string[]}
   * @memberof BaseModelModule
   */
  public labels: string[] = [];

  /**
   * @type {string}
   * @memberof BaseModelModule
   */
  public initialize: string = "";

  /**
   * @type {string}
   * @memberof BaseModelModule
   */
  public uuid: string = "";

  /**
   * @type {string}
   * @memberof BaseModelModule
   */
  public update: string = "";

  /**
   * @type {string}
   * @memberof BaseModelModule
   */
  public id: string = "";

  /**
   * @type {string}
   * @memberof BaseModelModule
   */
  public type: string = "";

  /**
   * @type {string}
   * @memberof BaseModelModule
   */
  public deleted: string = "";

  /**
   * Create a model
   * @param params {any}
   */
  public constructor(params?: any) {
    this.assign(params);
  }

  /**
   * Returns the Create string
   * @readonly
   * @static
   * @param {string} nodeName
   * @type {string}
   * @memberof BaseModelModule
   */
  public onCreateString(nodeName: string): string {
    return ` ON CREATE SET ` +
      `${nodeName}.uuid = randomUUID(), ` +
      `${nodeName}.initialize = timestamp(), ` +
      `${nodeName}.update = timestamp() `;
  }

  /**
   * Returns the Merge and
   * @readonly
   * @static
   * @param {string} nodeName
   * @type {string}
   * @memberof BaseModelModule
   */
  public onMergeString(nodeName: string): string {
    return ` ON MERGE SET ` +
    `${nodeName}.update = timestamp() `;
  }

  /**
   * Assign values to the model
   * @param {*} [params]
   * @memberof BaseModelModule
   */
  public assign(params?: any): void {
    Object.assign(this, params);
  }
}
