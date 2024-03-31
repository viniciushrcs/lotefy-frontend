import { APP_ENVS } from "../../helpers/envs";
import { RequestError } from "../../helpers/responseError";
import { AnyObject, HttpMethods, HttpService } from "../http/index";

export class SignUpService {
  static async signUp(
    email: string | undefined,
    password: string | undefined,
    name: string | undefined
  ): Promise<AnyObject> {
    const { response, error } = await HttpService.request({
      method: HttpMethods.POST,
      baseUrl: APP_ENVS.backendApibaseUrl,
      url: `/user/signup`,
      body: {
        email,
        password,
        name,
      },
    });

    if (!response || error)
      throw new RequestError({
        message: error?.response?.data.message || "No message",
        code: error?.code || "No code",
        statusCode: error?.response?.status || 500,
      });

    return response;
  }

  static async userVerify(
    email: string | undefined,
    token: string | undefined
  ): Promise<AnyObject> {
    const { response, error } = await HttpService.request({
      method: HttpMethods.POST,
      baseUrl: APP_ENVS.backendApibaseUrl,
      url: `/user/verify`,
      body: {
        email,
        token,
      },
    });

    if (!response || error) {
      throw new RequestError({
        message: error?.response?.data.message || "No message",
        code: error?.code || "No code",
        statusCode: error?.response?.status || 500,
      });
    }

    return response;
  }
}
