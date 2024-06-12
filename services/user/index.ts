import { APP_ENVS } from "../../helpers/envs";
import { RequestError } from "../../helpers/responseError";
import { AnyObject, HttpMethods, HttpService } from "../http";

export class User {
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

  static async userPjData(
    cnpj: string | undefined,
    socialReason: string | undefined,
    cnae: string | undefined,
    createdAt: Date | undefined,
    email?: string | undefined | null,
    employees?: string | undefined | null,
    fantasyName?: string | undefined | null
  ): Promise<AnyObject> {
    const { response, error } = await HttpService.request({
      method: HttpMethods.POST,
      baseUrl: APP_ENVS.backendApibaseUrl,
      url: `/user/create-pj-data`,
      body: {
        cnpj,
        socialReason,
        employees,
        cnae,
        email,
        fantasyName,
        createdAt,
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

  static async userPfData(
    cpf: string | undefined,
    rg: string | undefined,
    profession?: string | undefined | null,
    nationality?: string | undefined | null,
    maritalStatus?: string | undefined | null,
    spouseName?: string | undefined | null,
    spouseCpf?: string | undefined | null,
    spouseEmail?: string | undefined | null,
    phone?: string | undefined | null,
    userId?: string | undefined | null,
    creci?: string | undefined | null
  ): Promise<AnyObject> {
    const { response, error } = await HttpService.request({
      method: HttpMethods.POST,
      baseUrl: APP_ENVS.backendApibaseUrl,
      url: `/user/create-pf-data`,
      body: {
        cpf,
        rg,
        profession,
        nationality,
        maritalStatus,
        spouseName,
        spouseCpf,
        spouseEmail,
        phone,
        userId,
        creci,
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

  static async getPjDataByCnpj(cnpj: string | undefined): Promise<AnyObject> {
    const { response, error } = await HttpService.request({
      method: HttpMethods.GET,
      baseUrl: APP_ENVS.backendApibaseUrl,
      url: `/user/get-pj-by-cnpj/${cnpj}`,
    });

    if (!response || error) return { error };

    return response;
  }
}
