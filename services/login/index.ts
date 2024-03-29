import { APP_ENVS } from "../../helpers/envs";
import { AnyObject, HttpMethods, HttpService } from "../http/index";

export class LoginService {
  static async login(
    email: string | null,
    password: string | null
  ): Promise<AnyObject> {
    const { response, error } = await HttpService.request({
      method: HttpMethods.POST,
      baseUrl: APP_ENVS.backendApibaseUrl,
      url: `/user/signin`,
      body: {
        email: email,
        password: password,
      },
    });
    if (!response || error) throw new Error("Fail to login");

    return response;
  }
}
