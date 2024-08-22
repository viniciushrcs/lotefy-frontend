import RegisterInput from "../../RegisterInput";
import { InputBase, Select, SimpleGrid } from "@mantine/core";
import * as Icons from "../../../public/icons/index";
import { IMaskInput } from "react-imask";
import { UseFormReturnType } from "@mantine/form";
import { PropertyFormValues } from "../../../helpers/interfaces/forms";
import { Dispatch, SetStateAction } from "react";
import { countryStates } from "../../../helpers/states";

interface Props {
  propertyForm: UseFormReturnType<
    PropertyFormValues,
    (values: PropertyFormValues) => PropertyFormValues
  >;
  nextStep: () => void;
  prevStep: () => void;
  constituedSpeValue: string;
  setFocused: Dispatch<SetStateAction<boolean | undefined>>;
}

export function PropertyData({
  propertyForm,
  nextStep,
  constituedSpeValue,
  prevStep,
  setFocused,
}: Props) {
  return (
    <div className="mb-[45%]">
      <form
        onSubmit={propertyForm.onSubmit(() => {
          nextStep();
        })}
      >
        <RegisterInput
          icon={Icons.Home}
          inputHeader={"Dados do imóvel"}
          inputDescription={"Preencha alguns dados sobre o imóvel"}
          buttonName={"Próximo"}
          backAnchorName={"Voltar"}
          prevStep={() => {
            if (constituedSpeValue === "no") {
              prevStep();
              prevStep();
            } else {
              prevStep();
            }
          }}
          isGrid
        >
          <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 2 }}
            spacing={{ base: 15, sm: "xs" }}
            verticalSpacing={{ base: "xs", sm: "xs" }}
          >
            <InputBase
              label="Matrícula do imóvel"
              radius="xs"
              size="md"
              placeholder="Matrícula do imóvel"
              className="mb-[1.5rem]"
              key={propertyForm.key("propertyRegistration")}
              {...propertyForm.getInputProps("propertyRegistration")}
              onBlur={() => setFocused(false)}
              onFocus={() => setFocused(true)}
            />
            <InputBase
              label="CEP"
              radius="xs"
              size="md"
              placeholder="00000-000"
              component={IMaskInput}
              mask="00000-000"
              key={propertyForm.key("propertyZipcode")}
              {...propertyForm.getInputProps("propertyZipcode")}
            />
            <InputBase
              label="Logradouro"
              radius="xs"
              size="md"
              placeholder="Logradouro"
              className="mb-[0.75rem]"
              key={propertyForm.key("propertyAddress")}
              {...propertyForm.getInputProps("propertyAddress")}
            />
            <InputBase
              label="Número"
              radius="xs"
              size="md"
              placeholder="Número"
              className="mb-[0.75rem]"
              key={propertyForm.key("propertyAddressNumber")}
              {...propertyForm.getInputProps("propertyAddressNumber")}
            />
            <InputBase
              label="Complemento"
              radius="xs"
              size="md"
              placeholder="Complemento"
              className="mb-[0.75rem]"
              key={propertyForm.key("propertyAddressComplement")}
              {...propertyForm.getInputProps("propertyAddressComplement")}
            />
            <InputBase
              label="Bairro"
              radius="xs"
              size="md"
              placeholder="Bairro"
              className="mb-[0.75rem]"
              key={propertyForm.key("propertyAddressDistrict")}
              {...propertyForm.getInputProps("propertyAddressDistrict")}
            />
            <InputBase
              label="Município"
              radius="xs"
              size="md"
              placeholder="Município"
              className="mb-[0.75rem]"
              key={propertyForm.key("propertyAddressCity")}
              {...propertyForm.getInputProps("propertyAddressCity")}
            />
            <Select
              label="Estado"
              radius="xs"
              size="md"
              placeholder="Estado"
              className="mb-[0.75rem]"
              data={countryStates.map((state) => state.uf)}
              key={propertyForm.key("propertyAddressState")}
              {...propertyForm.getInputProps("propertyAddressState")}
            />
          </SimpleGrid>
        </RegisterInput>
      </form>
    </div>
  );
}
