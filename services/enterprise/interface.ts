export interface CreateEnterpriseDto {
  constitutedSpe: boolean;
  ownerType: string;
  ventureName: string;
  vgv: string;
  paidInToSpe: boolean;
  negotiationStatus: string;
  propertyRegistration: string;
  propertyAddress: string;
  propertyAddressNumber: string;
  propertyAddressDistrict: string;
  propertyAddressComplement?: string;
  propertyAddressCity: string;
  propertyAddressState: string;
  speCnpj?: string;
  speSocialReason?: string;
  speCnae?: string;
  speFantasyName?: string;
  speOpenDate?: Date;
  speAddress?: string;
  speAddressNumber?: string;
  speAddressDistrict?: string;
  speAddressComplement?: string;
  speAddressCity?: string;
  speAddressState?: string;
  ownerCnpj?: string;
  ownerSocialReason?: string;
  ownerCnae?: string;
  ownerPjCreatedAt?: Date;
  ownerCpf?: string;
  ownerRg?: string;
  intermediary?: string;
  brokerCpf?: string;
  brokerCreci?: string;
  realEstateCnpj?: string;
  realEstateSocialReason?: string;
  realEstateCnae?: string;
  realEstateName?: string;
  realEstateCreatedAt?: Date;
  ventureStatus: string;
  userId: string;
  pjPartner: any[];
  pfPartner: any[];
  speUploadFile?: File;
  diligenceDocument?: File | File[];
}


