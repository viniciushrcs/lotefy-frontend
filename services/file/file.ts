import { APP_ENVS } from "../../helpers/envs";
import { RequestError } from "../../helpers/responseError";
import { AnyObject, HttpMethods, HttpService } from "../http";

export class Files {
  static async uploadFile(
    id: string | undefined,
    file: File,
    bucketName: string
  ): Promise<AnyObject> {
    const formData = new FormData();
    formData.append("id", id || "");
    formData.append("file", file);
    formData.append("bucketName", bucketName);

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

  static async downloadFile(
    id: string,
    bucketName: string,
    fullDocumentName: string
  ) {
    let bucket;
    if (bucketName === "Documento do empreendimento") {
      bucket = "Empreendimentos";
    } else if (bucketName === "SPE e SCP") bucket = "PJ";
    else if (bucketName === "Projeto e Aprovação") bucket = "Projetos";

    const { response, error } = await HttpService.request({
      method: HttpMethods.POST,
      baseUrl: APP_ENVS.backendApibaseUrl,
      url: `/files/download`,
      body: {
        folderId: id,
        bucketName: bucket,
        fullDocumentName: fullDocumentName,
      },
      responseType: "blob",
    });

    if (!response || error)
      throw new RequestError({
        message: error?.response?.data.message || "No message",
        code: error?.code || "No code",
        statusCode: error?.response?.status || 500,
      });

    const url = window.URL.createObjectURL(response as Blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fullDocumentName);
    document.body.appendChild(link);
    link.click();

    window.URL.revokeObjectURL(url);

    return response;
  }
}
