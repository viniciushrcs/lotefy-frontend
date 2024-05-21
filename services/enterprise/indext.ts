import { APP_ENVS } from "../../helpers/envs";
import { RequestError } from "../../helpers/responseError";
import { AnyObject, HttpMethods, HttpService } from "../http";

export class Enterprise {
  static async addEnterprise(
    name: string | undefined,
    pj_id: string | undefined,
    vgv: string | undefined,
    spe_constituida: string | undefined,
    imovel_integralizado: string | undefined,
    imovel_status_negociacao: string | undefined,
    cep: string | undefined,
    endereco: string | undefined,
    numero: string | undefined,
    bairro: string | undefined,
    complemento: string | undefined,
    metricula: string | undefined,
    corretor_id?: string | undefined,
    proprietario_id?: string | undefined,
    spe_pj_id?: string | undefined
  ): Promise<AnyObject> {
    const { response, error } = await HttpService.request({
      method: HttpMethods.POST,
      baseUrl: APP_ENVS.backendApibaseUrl,
      url: `/enterprise/create-enterprise`,
      body: {
        enterpriseData: {
          name,
          pj_id,
          spe_pj_id,
          vgv,
          spe_constituida,
          imovel_integralizado,
          imovel_status_negociacao,
        },
        propertyData: {
          cep,
          endereco,
          numero,
          bairro,
          complemento,
          metricula,
          corretor_id,
          proprietario_id,
        },
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
}
