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
  ownerName: string;
  ownerCpf: string;
  ownerRg: string;
  ownerCnpj: string;
  ownerCompleteAddress: string;
  negotiationStatus: string;
  brokerName: string;
  brokerCpf: string;
  brokerCreci: string;
  realEstateName: string;
}

export interface PartnerFormValues {
  partner: AnyObject[];
  participants: AnyObject[];
}

export interface DocumentaryDiligenceFormValues {
  ventureStatus: string;
}
