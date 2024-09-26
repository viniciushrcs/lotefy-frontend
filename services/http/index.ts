import axios, { AxiosError, AxiosRequestConfig } from "axios";

export type AnyObject = Record<string, any>;

export enum HttpMethods {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
}

interface RequestOptions {
  method: HttpMethods;
  baseUrl: string;
  url: string;
  headers?: Record<string, string>;
  params?: Record<string, string | boolean | number>;
  body?: AnyObject;
  responseType?: AxiosRequestConfig["responseType"];
}

interface RequestResult<T, E> {
  response?: T;
  error?: AxiosError<E>;
}

export class HttpService {
  static async request<T = AnyObject, E = AnyObject>({
    method,
    baseUrl,
    url,
    headers,
    body,
    params,
    responseType,
  }: RequestOptions): Promise<RequestResult<T, E>> {
    try {
      const response = await axios<T>({
        method,
        baseURL: baseUrl,
        url,
        headers,
        data: body,
        params,
        responseType,
      });

      return { response: response.data };
    } catch (err) {
      return { error: err as AxiosError<E> };
    }
  }
}
