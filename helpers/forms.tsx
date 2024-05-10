import { isNotEmpty, UseFormInput } from "@mantine/form";

interface VentureFormValues {
  ventureName: string;
  speCnpj: string;
  speSocialReason: string;
  speFantasyName: string;
  speStatus: string;
  speCnae: string;
  speOpenDate: string;
}
interface SpeFormValues {
  speAddressType: string;
  speAddress: string;
  speAddressNumber: string;
  speAddressComplement: string;
  speAddressDistrict: string;
  speAddressCity: string;
  speAddressState: string;
  speAddressZipcode: string;
}

interface PropertyFormValues {
  propertyZipcode: string;
  propertyAddress: string;
  propertyAddressNumber: string;
  propertyAddressComplement: string;
  propertyAddressDistrict: string;
  propertyAddressCity: string;
  propertyAddressState: string;
  propertyRegistration: string;
}

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
