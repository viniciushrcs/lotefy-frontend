type KeyboardInputNames =
  | "venture-name"
  | "spe-cnpj-input"
  | "spe-social-reason-input"
  | "spe-fantasy-name-input"
  | "spe-status-input"
  | "spe-cnae-input"
  | "spe-open-date"
  | "spe-address-type-input"
  | "spe-address-input"
  | "spe-address-number-input"
  | "spe-address-complement-input"
  | "spe-address-district-input"
  | "spe-address-city-input"
  | "spe-address-state-input"
  | "spe-address-zipcode-input"
  | "property-address-zipcode-input"
  | "property-address-input"
  | "property-address-number-input"
  | "property-address-complement-input"
  | "property-address-district-input"
  | "property-address-city-input"
  | "property-address-state-input"
  | "property-registration"
  | "owner-name"
  | "owner-cpf"
  | "owner-rg"
  | "owner-cnpj"
  | "owner-complete-address"
  | "broker-name"
  | "broker-cpf"
  | "broker-creci"
  | "real-estate-name"
  | "negotiation-status"
  | "partner-complete-name"
  | "partner-cpf"
  | "partner-rg"
  | "partner-cnpj"
  | "partner-role"
  | "counterpart-from-the-partner"
  | "partner-percentage";

export const verifyPropertyDataFields = (
  inputs: Record<KeyboardInputNames, string>,
  setError: any,
  propertyAddressValue: string | null | undefined
) => {
  const errors: Record<KeyboardInputNames, string> = {} as Record<
    KeyboardInputNames,
    string
  >;

  if (inputs["property-address-zipcode-input"].length < 8) {
    errors["property-address-zipcode-input"] = "CEP inválido";
  }

  if (!propertyAddressValue) {
    errors["property-address-state-input"] = "Escolha um estado";
  }

  const fieldsToCheck: KeyboardInputNames[] = [
    "property-address-input",
    "property-address-number-input",
    "property-address-complement-input",
    "property-address-district-input",
    "property-address-city-input",
    "property-registration",
  ];

  fieldsToCheck.forEach((field: KeyboardInputNames) => {
    if (!inputs[field].length) {
      errors[field] = "Campo inválido";
    }
  });

  if (Object.keys(errors).length > 0) {
    setError((prevInputs: any) => ({
      ...prevInputs,
      ...errors,
    }));
  } else return null;
};

export const verifySecondPropertyDataFields = (
  inputs: Record<KeyboardInputNames, string>,
  setError: any,
  negociationStatusValue: string | null | undefined
) => {
  const errors: Record<KeyboardInputNames, string> = {} as Record<
    KeyboardInputNames,
    string
  >;

  if (inputs["owner-cpf"].length < 11) {
    errors["owner-cpf"] = "CPF inválido";
  }
  if (inputs["owner-cnpj"].length < 14) {
    errors["owner-cnpj"] = "CNPJ inválido";
  }

  if (!negociationStatusValue) {
    errors["negotiation-status"] = "Escolha um status";
  }

  const fieldsToCheck: KeyboardInputNames[] = [
    "owner-name",
    "owner-rg",
    "owner-complete-address",
  ];

  fieldsToCheck.forEach((field: KeyboardInputNames) => {
    if (!inputs[field].length) {
      errors[field] = "Campo inválido";
    }
  });

  if (Object.keys(errors).length > 0) {
    setError((prevInputs: any) => ({
      ...prevInputs,
      ...errors,
    }));
  } else return null;
};
