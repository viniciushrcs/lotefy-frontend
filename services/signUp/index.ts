import { APP_ENVS } from "../../helpers/envs";
import { HttpMethods, HttpService } from "../http/index";

export class SignUpService {
  static async signUp(
    email: string | undefined,
    password: string | undefined,
    name: string | undefined
  ): Promise<void> {
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

    // console.log(response, error, "SIGNUP");
    if (!response?.Result || error) throw new Error("Fail to signup");
  }

  static async userVerify(
    email: string | null,
    token: string | null
  ): Promise<void> {
    const { response, error } = await HttpService.request({
      method: HttpMethods.POST,
      baseUrl: APP_ENVS.backendApibaseUrl,
      url: `/user/verify`,
      body: {
        email,
        token,
      },
    });

    console.log(response, error, "Verify");
    if (!response?.Result || error) throw new Error("Fail to signup");
  }
}
