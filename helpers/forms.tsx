import { isNotEmpty, UseFormInput } from "@mantine/form";
import {
  DocumentaryDiligenceFormValues,
  MediatorFormValues,
  OwnerFormValues,
  PartnerFormValues,
  PropertyFormValues,
  SpeFormValues,
  VentureFormValues,
} from "./interfaces/forms";
import { randomId } from "@mantine/hooks";

export const ventureFormConfig = (
  constituedSpeValue: string
): UseFormInput<VentureFormValues> => ({
  mode: "uncontrolled",
  initialValues: {
    ventureName: "",
    speCnpj: "",
    speSocialReason: "",
    speFantasyName: "",
    speStatus: "",
    speCnae: "",
    speOpenDate: "",
  },

  validate: {
    ventureName: isNotEmpty("Campo inválido"),
    speCnpj: (value) =>
      value.length >= 14 || constituedSpeValue === "no"
        ? null
        : "CNPJ inválido",
    speSocialReason: (value) =>
      value.length || constituedSpeValue === "no" ? null : "Campo inválido",
    speStatus: (value) =>
      value.length || constituedSpeValue === "no" ? null : "Campo inválido",
    speOpenDate: (value) =>
      value.length === 10 || constituedSpeValue === "no"
        ? null
        : "Data de abertura inválida",
  },
});

export const speFormConfig = (): UseFormInput<SpeFormValues> => ({
  mode: "uncontrolled",
  initialValues: {
    speAddressType: "",
    speAddress: "",
    speAddressNumber: "",
    speAddressComplement: "",
    speAddressDistrict: "",
    speAddressCity: "",
    speAddressState: "",
    speAddressZipcode: "",
  },
  validate: {
    speAddressState: isNotEmpty("Campo inválido"),
    speAddressType: isNotEmpty("Campo inválido"),
    speAddress: isNotEmpty("Campo inválido"),
    speAddressNumber: isNotEmpty("Campo inválido"),
    speAddressDistrict: isNotEmpty("Campo inválido"),
    speAddressCity: isNotEmpty("Campo inválido"),
    speAddressZipcode: (value) =>
      value.length === 9 ? null : "Campo inválido",
  },
});

export const propertyFormConfig = (): UseFormInput<PropertyFormValues> => ({
  mode: "uncontrolled",
  initialValues: {
    propertyZipcode: "",
    propertyAddress: "",
    propertyAddressNumber: "",
    propertyAddressComplement: "",
    propertyAddressDistrict: "",
    propertyAddressCity: "",
    propertyAddressState: "",
    propertyRegistration: "",
  },
  validate: {
    propertyZipcode: (value) => (value.length === 9 ? null : "Campo inválido"),
    propertyAddress: isNotEmpty("Campo inválido"),
    propertyAddressNumber: isNotEmpty("Campo inválido"),
    propertyAddressDistrict: isNotEmpty("Campo inválido"),
    propertyAddressCity: isNotEmpty("Campo inválido"),
    propertyAddressState: isNotEmpty("Campo inválido"),
    propertyRegistration: isNotEmpty("Campo inválido"),
  },
});

export const ownerFormConfig = (
  ownerType: string
): UseFormInput<OwnerFormValues> => ({
  mode: "uncontrolled",
  initialValues: {
    ownerType: "",
    ownerName: "",
    ownerCpf: "",
    ownerRg: "",
    ownerCnpj: "",
    ownerSocialReason: "",
    ownerCnae: "",
    ownerPjCreatedAt: "",
    ownerZipcode: "",
    ownerAddress: "",
    ownerAddressNumber: "",
    ownerAddressComplement: "",
    ownerAddressDistrict: "",
    ownerAddressCity: "",
    ownerAddressState: "",
  },
  validate: {
    ownerName: (value) => {
      if (ownerType === "fisicalPerson") {
        if (value.length) return null;
        return "Campo inválido";
      } else return null;
    },
    ownerCpf: (value) => {
      if (ownerType === "fisicalPerson") {
        if (value.length === 14) return null;
        return "CPF inválido";
      } else return null;
    },
    ownerRg: (value) => {
      if (ownerType === "fisicalPerson") {
        if (value.length) return null;
        return "Campo inválido";
      } else return null;
    },
    ownerCnpj: (value) => {
      if (ownerType === "legalPerson") {
        if (value.length === 18) return null;
        return "CNPJ inválido";
      } else return null;
    },
    ownerSocialReason: (value) => {
      if (ownerType === "legalPerson") {
        if (value.length) return null;
        return "Campo inválido";
      } else return null;
    },
    ownerCnae: (value) => {
      if (ownerType === "legalPerson") {
        if (value.length) return null;
        return "Campo inválido";
      } else return null;
    },
    ownerPjCreatedAt: (value) => {
      if (ownerType === "legalPerson") {
        if (value.length === 10) return null;
        return "CNPJ inválido";
      } else return null;
    },
    ownerZipcode: isNotEmpty("Campo inválido"),
    ownerAddress: isNotEmpty("Campo inválido"),
    ownerAddressNumber: isNotEmpty("Campo inválido"),
    ownerAddressDistrict: isNotEmpty("Campo inválido"),
    ownerAddressCity: isNotEmpty("Campo inválido"),
    ownerAddressState: isNotEmpty("Campo inválido"),
  },
});

export const mediatorFormConfig = (
  intermediaryValue: string
): UseFormInput<MediatorFormValues> => ({
  mode: "uncontrolled",
  initialValues: {
    negotiationStatus: "",
    brokerName: "",
    brokerCpf: "",
    brokerRg: "",
    brokerCreci: "",
    realEstateName: "",
    realEstateCnpj: "",
    realEstateSocialReason: "",
    realEstateCnae: "",
    realEstateCreatedAt: "",
  },
  validate: {
    brokerName: (value) => {
      if (intermediaryValue === "broker") {
        if (value.length) return null;
        return "Campo inválido";
      } else return null;
    },
    brokerCpf: (value) => {
      if (intermediaryValue === "broker") {
        if (value.length === 14) return null;
        return "CPF inválido";
      } else return null;
    },
    brokerRg: (value) => {
      if (intermediaryValue === "broker") {
        if (value.length) return null;
        return "Campo inválido";
      } else return null;
    },
    brokerCreci: (value) => {
      if (intermediaryValue === "broker") {
        if (value.length) return null;
        return "Campo inválido";
      } else return null;
    },
    realEstateName: (value) => {
      if (intermediaryValue === "realEstate") {
        if (value.length) return null;
        return "Campo inválido";
      } else return null;
    },
    realEstateCnpj: (value) => {
      if (intermediaryValue === "realEstate") {
        if (value.length === 18) return null;
        return "CNPJ inválido";
      } else return null;
    },
    realEstateSocialReason: (value) => {
      if (intermediaryValue === "realEstate") {
        if (value.length) return null;
        return "Campo inválido";
      } else return null;
    },
    realEstateCreatedAt: (value) => {
      if (intermediaryValue === "realEstate") {
        if (value.length) return null;
        return "Campo inválido";
      } else return null;
    },
    realEstateCnae: (value) => {
      if (intermediaryValue === "realEstate") {
        if (value.length) return null;
        return "Campo inválido";
      } else return null;
    },
  },
});

export const partnerFormConfig = (
  partnerType: string
): UseFormInput<PartnerFormValues> => ({
  mode: "uncontrolled",
  initialValues: {
    pjPartner: [],
    pfPartner: [],
  },
  validate: {
    pjPartner: {
      name: (value) => {
        if (partnerType === "pjPartner") {
          if (value.length) return null;
          return "Campo inválido";
        } else return null;
      },
      cnpj: (value) => {
        if (partnerType === "pjPartner") {
          if (value.length === 18) return null;
          return "CNPJ inválido";
        } else return null;
      },
      participation: (value) => {
        if (partnerType === "pjPartner") {
          if (value) return null;
          return "Campo inválido";
        } else return null;
      },
      socialReason: (value) => {
        if (partnerType === "pjPartner") {
          if (value) return null;
          return "Campo inválido";
        } else return null;
      },
      cnae: (value) => {
        if (partnerType === "pjPartner") {
          if (value) return null;
          return "Campo inválido";
        } else return null;
      },
      createdAt: (value) => {
        if (partnerType === "pjPartner") {
          if (value) return null;
          return "Campo inválido";
        } else return null;
      },
    },
    pfPartner: {
      name: (value) => {
        if (partnerType === "pfPartner") {
          if (value.length) return null;
          return "Campo inválido";
        } else return null;
      },
      cpf: (value) => {
        if (partnerType === "pfPartner") {
          if (value.length === 14) return null;
          return "CPF inválido";
        } else return null;
      },
      function: (value) => {
        if (partnerType === "pfPartner") {
          if (value.length) return null;
          return "Campo inválido";
        } else return null;
      },
      rg: (value) => {
        if (partnerType === "pfPartner") {
          if (value) return null;
          return "Campo inválido";
        } else return null;
      },
      participation: (value) => {
        if (partnerType === "pfPartner") {
          if (value) return null;
          return "Campo inválido";
        } else return null;
      },
    },
  },
});

export const documentaryDiligenceFormConfi =
  (): UseFormInput<DocumentaryDiligenceFormValues> => ({
    mode: "uncontrolled",
    initialValues: {
      ventureStatus: "",
    },
    validate: {
      ventureStatus: isNotEmpty("Campo inválido"),
    },
  });
