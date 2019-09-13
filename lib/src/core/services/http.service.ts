import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { bind } from "decko";

/**
 * HttpService
 *
 * Service for making HTTP requests
 */
export class HttpService {
  private axiosInstance: AxiosInstance;
  private _reqConfig: AxiosRequestConfig;

  public constructor(reqConfig?: AxiosRequestConfig) {
    this._reqConfig = reqConfig || {};
    this.axiosInstance = axios.create(this._reqConfig);
  }

  public get reqConfig(): AxiosRequestConfig {
    return this._reqConfig;
  }

  public set reqConfig(reqConfig: AxiosRequestConfig) {
    this._reqConfig = reqConfig;
  }

  /**
   * Post data to resource
   *
   * @param {string} url
   * @param {object} data
   */
  @bind
  public postData(url: string, data: object): Promise<any> {
    // tslint:disable-next-line:no-console
    console.log(data);
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post(url, data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
