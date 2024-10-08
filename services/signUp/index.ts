import { APP_ENVS } from "../../helpers/envs";
import { RequestError } from "../../helpers/responseError";
import { UserType } from "../../helpers/user-type";
import { AnyObject, HttpMethods, HttpService } from "../http/index";

export class SignUpService {
  static async signUp(
    email: string,
    password: string,
    name: string,
    userType: UserType
  ): Promise<AnyObject> {
    const { response, error } = await HttpService.request({
      method: HttpMethods.POST,
      baseUrl: APP_ENVS.backendApibaseUrl,
      url: `/user/${userType}/signup`,
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

  static async resendEmailConfirmation(email: string) {
    await HttpService.request({
      method: HttpMethods.POST,
      baseUrl: APP_ENVS.backendApibaseUrl,
      url: `/user/signup/resend-code`,
      body: {
        email,
      },
    });
  }

  static async userVerify(
    email: string | undefined | any[],
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

  static async createPjData(
    userId: string | undefined,
    cnpj: string | undefined,
    socialReason: string | undefined,
    employees: string | undefined,
    email: string | undefined,
    createdAt: Date | undefined,
    cnae?: string | undefined | null
  ): Promise<AnyObject> {
    const { response, error } = await HttpService.request({
      method: HttpMethods.POST,
      baseUrl: APP_ENVS.backendApibaseUrl,
      url: `/user/create-pj-user`,
      body: {
        pjData: {
          cnpj,
          socialReason,
          employees,
          email,
          createdAt,
          cnae,
        },
        userId,
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
