import { AnyObject } from "../../services/http";

export interface VentureFormValues {
  ventureName: string;
  speCnpj: string;
  speSocialReason: string;
  speFantasyName: string;
  speStatus: string;
  speCnae: string;
  speOpenDate: string;
}
export interface SpeFormValues {
  speAddressType: string;
  speAddress: string;
  speAddressNumber: string;
  speAddressComplement: string;
  speAddressDistrict: string;
  speAddressCity: string;
  speAddressState: string;
  speAddressZipcode: string;
  speUploadFile: File | null;
}

export interface PropertyFormValues {
  propertyZipcode: string;
  propertyAddress: string;
  propertyAddressNumber: string;
  propertyAddressComplement: string;
  propertyAddressDistrict: string;
  propertyAddressCity: string;
  propertyAddressState: string;
  propertyRegistration: string;
}

export interface OwnerFormValues {
  ownerType: string;
  ownerName: string;
  ownerCpf: string;
  ownerRg: string;
  ownerCnpj: string;
  ownerSocialReason: string;
  ownerCnae: string;
  ownerZipcode: string;
  ownerAddress: string;
  ownerAddressNumber: string;
  ownerAddressComplement: string;
  ownerAddressDistrict: string;
  ownerAddressCity: string;
  ownerAddressState: string;
  ownerPjCreatedAt: string;
}

export interface MediatorFormValues {
  negotiationStatus: string;
  brokerName: string;
  brokerCpf: string;
  brokerRg: string;
  brokerCreci: string;
  realEstateName: string;
  realEstateCnpj: string;
  realEstateSocialReason: string;
  realEstateCnae: string;
  realEstateCreatedAt: string;
}

export interface PartnerFormValues {
  pjPartner: AnyObject[];
  pfPartner: AnyObject[];
}

export interface DocumentaryDiligenceFormValues {
  ventureStatus: string;
  diligenceDocument: File | null;
}
