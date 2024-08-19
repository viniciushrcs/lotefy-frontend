import { APP_ENVS } from "../../helpers/envs";
import { RequestError } from "../../helpers/responseError";
import { AnyObject, HttpMethods, HttpService } from "../http";
import { CreateEnterpriseDto } from "./interface";

export class Enterprise {
  static async addEnterprise(
    nome: string | undefined,
    user_id: string | undefined,
    vgv: string | undefined,
    spe_constituida: boolean | undefined,
    imovel_integralizado: string | undefined,
    imovel_status_negociacao: string | undefined,
    spe_pj_id?: string | undefined
  ): Promise<AnyObject> {
    const { response, error } = await HttpService.request({
      method: HttpMethods.POST,
      baseUrl: APP_ENVS.backendApibaseUrl,
      url: `/enterprise/create-enterprise`,
      body: {
        nome,
        user_id,
        spe_pj_id,
        vgv,
        spe_constituida,
        imovel_integralizado,
        imovel_status_negociacao,
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

  static async addAddress(
    city: string | undefined,
    number: string | undefined,
    district: string | undefined,
    street: string | undefined,
    state: string | undefined,
    property_id?: string | undefined | null,
    pj_id?: string | undefined | null,
    pf_id?: string | undefined | null,
    complement?: string | undefined | null
  ): Promise<AnyObject> {
    const { response, error } = await HttpService.request({
      method: HttpMethods.POST,
      baseUrl: APP_ENVS.backendApibaseUrl,
      url: `/enterprise/create-address`,
      body: {
        city,
        number,
        district,
        complement,
        street,
        state,
        property_id,
        pj_id,
        pf_id,
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

  static async addProperty(
    registration: string | undefined,
    ownerId: string | undefined,
    ownerType: string | undefined,
    realStateId?: string | undefined | null,
    brokerId?: string | undefined | null
  ): Promise<AnyObject> {
    const { response, error } = await HttpService.request({
      method: HttpMethods.POST,
      baseUrl: APP_ENVS.backendApibaseUrl,
      url: `/enterprise/create-property`,
      body: {
        registration,
        ownerId,
        ownerType,
        realStateId,
        brokerId,
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

  static async createEnterprise(dto: CreateEnterpriseDto): Promise<any> {
    const { response, error } = await HttpService.request({
      method: HttpMethods.POST,
      baseUrl: APP_ENVS.backendApibaseUrl,
      url: `/enterprise/create`,
      body: dto,
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

  static async getEnterprises(userId: string): Promise<any> {
    const { response, error } = await HttpService.request({
      method: HttpMethods.GET,
      baseUrl: APP_ENVS.backendApibaseUrl,
      url: `/enterprise/get-by-id`,
      params: {
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

  static async getSpePjAddressByPjId(
    pjId: string | undefined
  ): Promise<AnyObject> {
    const { response, error } = await HttpService.request({
      method: HttpMethods.GET,
      baseUrl: APP_ENVS.backendApibaseUrl,
      url: `enterprise/get-address-by-pj-id/${pjId}`,
    });

    if (!response || error) return { error };

    return response;
  }

  static async getPropertyByRegistration(
    registration: string | undefined
  ): Promise<AnyObject> {
    const { response, error } = await HttpService.request({
      method: HttpMethods.GET,
      baseUrl: APP_ENVS.backendApibaseUrl,
      url: `enterprise/get-property-by-registration/${registration}`,
    });

    if (!response || error) return { error };

    return response;
  }
}
