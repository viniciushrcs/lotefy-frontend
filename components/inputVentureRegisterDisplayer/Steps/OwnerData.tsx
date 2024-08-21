import RegisterInput from "../../RegisterInput";
import {
  Group,
  InputBase,
  Radio,
  Select,
  SimpleGrid,
  Text,
} from "@mantine/core";
import * as Icons from "../../../public/icons/index";
import { IMaskInput } from "react-imask";
import { UseFormReturnType } from "@mantine/form";
import { OwnerFormValues } from "../../../helpers/interfaces/forms";
import { Dispatch, SetStateAction } from "react";
import { countryStates } from "../../../helpers/states";

interface Props {
  ownerForm: UseFormReturnType<
    OwnerFormValues,
    (values: OwnerFormValues) => OwnerFormValues
  >;
  nextStep: () => void;
  prevStep: () => void;
  ownerType: string;
  setOwnerType: Dispatch<SetStateAction<string>>;
}

export function OwnerData({
  ownerForm,
  ownerType,
  setOwnerType,
  nextStep,
  prevStep,
}: Props) {
  return (
    <div className="mb-[57%]">
      <form
        onSubmit={ownerForm.onSubmit(() => {
          nextStep();
        })}
      >
        <RegisterInput
          icon={Icons.Id}
          inputHeader={"Dados do proprietário do imóvel"}
          inputDescription={"Preencha alguns dados do proprietário do imóvel"}
          isGrid
          buttonName={"Próximo"}
          backAnchorName={"Voltar"}
          prevStep={prevStep}
        >
          <Group className={"flex items-center justify-center gap-[5px]"}>
            <Text className="text-[#101828] text-base font-medium leading-6">
              Tipo de proprietário
            </Text>
            <Radio.Group value={ownerType} onChange={setOwnerType}>
              <Group mt="xs" style={{ marginBottom: "10px" }}>
                <Radio
                  color="#56D963"
                  value="fisicalPerson"
                  label="Pessoa física"
                />
                <Radio
                  color="#56D963"
                  value="legalPerson"
                  label="Pessoa jurídica"
                />
              </Group>
            </Radio.Group>
          </Group>
          <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 2 }}
            spacing={{ base: 15, sm: "xs" }}
            verticalSpacing={{ base: "xs", sm: "xs" }}
          >
            {ownerType === "fisicalPerson" ? (
              <>
                <InputBase
                  label="CPF do proprietário"
                  radius="xs"
                  size="md"
                  placeholder="000.000.000-00"
                  component={IMaskInput}
                  mask="000.000.000-00"
                  key={ownerForm.key("ownerCpf")}
                  {...ownerForm.getInputProps("ownerCpf")}
                />
                <InputBase
                  label="RG do proprietário"
                  radius="xs"
                  size="md"
                  placeholder="RG do proprietário"
                  key={ownerForm.key("ownerRg")}
                  {...ownerForm.getInputProps("ownerRg")}
                />
              </>
            ) : (
              <>
                <InputBase
                  label="CNPJ do proprietário"
                  radius="xs"
                  size="md"
                  placeholder="00.000.000/0000-00"
                  component={IMaskInput}
                  mask="00.000.000/0000-00"
                  key={ownerForm.key("ownerCnpj")}
                  {...ownerForm.getInputProps("ownerCnpj")}
                />
                <InputBase
                  label="Razão social do proprietário"
                  placeholder="razão social"
                  key={ownerForm.key("ownerSocialReason")}
                  {...ownerForm.getInputProps("ownerSocialReason")}
                  size="md"
                />
                <InputBase
                  label="CNAE principal"
                  placeholder="CNAE"
                  key={ownerForm.key("ownerCnae")}
                  {...ownerForm.getInputProps("ownerCnae")}
                  size="md"
                />
                <InputBase
                  label="Data de abertura"
                  placeholder="00/00/0000"
                  key={ownerForm.key("ownerPjCreatedAt")}
                  {...ownerForm.getInputProps("ownerPjCreatedAt")}
                  size="md"
                  component={IMaskInput}
                  mask="00/00/0000"
                />
              </>
            )}
            <InputBase
              label="CEP"
              radius="xs"
              size="md"
              placeholder="00000-000"
              component={IMaskInput}
              mask="00000-000"
              key={ownerForm.key("ownerZipcode")}
              {...ownerForm.getInputProps("ownerZipcode")}
            />
            <InputBase
              label="Logradouro"
              radius="xs"
              size="md"
              placeholder="Logradouro"
              className="mb-[0.75rem]"
              key={ownerForm.key("ownerAddress")}
              {...ownerForm.getInputProps("ownerAddress")}
            />
            <InputBase
              label="Número"
              radius="xs"
              size="md"
              placeholder="Número"
              className="mb-[0.75rem]"
              key={ownerForm.key("ownerAddressNumber")}
              {...ownerForm.getInputProps("ownerAddressNumber")}
            />
            <InputBase
              label="Complemento"
              radius="xs"
              size="md"
              placeholder="Complemento"
              className="mb-[0.75rem]"
              key={ownerForm.key("ownerAddressComplement")}
              {...ownerForm.getInputProps("ownerAddressComplement")}
            />
            <InputBase
              label="Bairro"
              radius="xs"
              size="md"
              placeholder="Bairro"
              className="mb-[0.75rem]"
              key={ownerForm.key("ownerAddressDistrict")}
              {...ownerForm.getInputProps("ownerAddressDistrict")}
            />
            <InputBase
              label="Município"
              radius="xs"
              size="md"
              placeholder="Município"
              className="mb-[0.75rem]"
              key={ownerForm.key("ownerAddressCity")}
              {...ownerForm.getInputProps("ownerAddressCity")}
            />
            <Select
              label="Estado"
              radius="xs"
              size="md"
              placeholder="Estado"
              className="mb-[0.75rem]"
              data={countryStates.map((state) => state.uf)}
              key={ownerForm.key("ownerAddressState")}
              {...ownerForm.getInputProps("ownerAddressState")}
            />
          </SimpleGrid>
        </RegisterInput>
      </form>
    </div>
  );
}
