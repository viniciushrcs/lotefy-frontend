import { isNotEmpty, UseFormInput } from "@mantine/form";
import {
  DocumentaryDiligenceFormValues,
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
  intermediaryValue: string
): UseFormInput<OwnerFormValues> => ({
  mode: "uncontrolled",
  initialValues: {
    ownerName: "",
    ownerCpf: "",
    ownerRg: "",
    ownerCnpj: "",
    ownerCompleteAddress: "",
    negotiationStatus: "",
    brokerName: "",
    brokerCpf: "",
    brokerCreci: "",
    realEstateName: "",
  },
  validate: {
    ownerName: isNotEmpty("Campo inválido"),
    ownerCpf: (value) => (value.length === 14 ? null : "CPF inválido"),
    ownerRg: isNotEmpty("Campo inválido"),
    ownerCnpj: (value) => (value.length >= 14 ? null : "CNPJ inválido"),
    ownerCompleteAddress: isNotEmpty("Campo inválido"),
    negotiationStatus: isNotEmpty("Campo inválido"),
    brokerName: (value) => {
      if (intermediaryValue === "broker")
        value.length ? null : "Campo inválido";
      return null;
    },
    brokerCpf: (value) => {
      if (intermediaryValue === "broker")
        value.length === 14 ? null : "CPF inválido";
      return null;
    },
    brokerCreci: (value) => {
      if (intermediaryValue === "broker")
        value.length ? null : "CRECI inválido";
      return null;
    },
    realEstateName: (value) => {
      if (intermediaryValue === "realEstate")
        !value.length ? "Campo inválido" : null;
      return null;
    },
  },
});

export const partnerFormConfig = (
  partnerType: string
): UseFormInput<PartnerFormValues> => ({
  mode: "uncontrolled",
  initialValues: {
    partner: [
      {
        name: "",
        cpf: "",
        cnpj: "",
        percentages: "",
        function: "",
        counterpart: "",
        key: randomId(),
      },
    ],
    participants: [
      {
        name: "",
        cpf: "",
        cnpj: "",
        function: "",
        counterpart: "",
        key: randomId(),
      },
    ],
  },
  validate: {
    partner: {
      name: (value) => {
        if (partnerType === "partner") {
          if (value.length) return null;
          return "Campo inválido";
        } else return null;
      },
      cpf: (value) => {
        if (partnerType === "partner") {
          if (value.length === 14) return null;
          return "CPF inválido";
        } else return null;
      },
      cnpj: (value) => {
        if (partnerType === "partner") {
          if (value.length === 18) return null;
          return "CNPJ inválido";
        } else return null;
      },
      percentages: (value) => {
        if (partnerType === "partner") {
          if (value) return null;
          return "Campo inválido";
        } else return null;
      },
      function: (value) => {
        if (partnerType === "partner") {
          if (value.length) return null;
          return "Campo inválido";
        } else return null;
      },
      counterpart: (value) => {
        if (partnerType === "partner") {
          if (value.length) return null;
          return "Campo inválido";
        } else return null;
      },
    },
    participants: {
      name: (value) => {
        if (partnerType === "participant") {
          if (value.length) return null;
          return "Campo inválido";
        } else return null;
      },
      cpf: (value) => {
        if (partnerType === "participant") {
          if (value.length === 14) return null;
          return "CPF inválido";
        } else return null;
      },
      cnpj: (value) => {
        if (partnerType === "participant") {
          if (value.length === 18) return null;
          return "CNPJ inválido";
        } else return null;
      },
      function: (value) => {
        if (partnerType === "participant") {
          if (value.length) return null;
          return "Campo inválido";
        } else return null;
      },
      counterpart: (value) => {
        if (partnerType === "participant") {
          if (value.length) return null;
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
