import { APP_ENVS } from "../../helpers/envs";
import { RequestError } from "../../helpers/responseError";
import { AnyObject, HttpMethods, HttpService } from "../http";

export class UserSession {
  static async userInfo(token: string): Promise<AnyObject> {
    const { response, error } = await HttpService.request({
      headers: {
        authorization: token,
      },
      method: HttpMethods.GET,
      baseUrl: APP_ENVS.backendApibaseUrl,
      url: `/user/me`,
    });

    if (!response || error)
      throw new RequestError({
        message: error?.response?.data.message || "No message",
        code: error?.code || "No code",
        statusCode: error?.response?.status || 500,
      });

    return response;
  }
}
