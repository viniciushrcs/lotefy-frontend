import { APP_ENVS } from "../../helpers/envs";
import { RequestError } from "../../helpers/responseError";
import { HttpMethods, HttpService } from "../http";

export class Transparency {
  static async getEnterpriseById(enterpriseId: string): Promise<any> {
    const { response, error } = await HttpService.request({
      method: HttpMethods.GET,
      baseUrl: APP_ENVS.backendApibaseUrl,
      url: `/transparency/get-data-by-id/${enterpriseId}`,
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
