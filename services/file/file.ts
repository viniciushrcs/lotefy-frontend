import { APP_ENVS } from "../../helpers/envs";
import { RequestError } from "../../helpers/responseError";
import { AnyObject, HttpMethods, HttpService } from "../http";

export class Files {
  static async uploadFile(
    userId: string | undefined,
    file: File
  ): Promise<AnyObject> {
    const formData = new FormData();
    formData.append("userId", userId || "");
    formData.append("file", file);

    const { response, error } = await HttpService.request({
      method: HttpMethods.POST,
      baseUrl: APP_ENVS.backendApibaseUrl,
      url: `/files/upload`,
      body: formData,
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
